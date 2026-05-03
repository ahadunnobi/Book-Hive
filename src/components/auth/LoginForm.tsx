"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = {
  googleAuthEnabled: boolean;
};

export function LoginForm({ googleAuthEnabled }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      setToast("Registration successful. Sign in with your email and password.");
    }
  }, [searchParams]);

  function safeCallbackUrl(): string {
    const raw = searchParams.get("callbackUrl");
    if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
    return "/";
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    setSubmitting(true);
    const { error: apiError } = await authClient.signIn.email({
      email: email.trim(),
      password,
      callbackURL: safeCallbackUrl(),
    });
    setSubmitting(false);
    if (apiError) {
      setError(apiError.message ?? "Sign-in failed.");
      return;
    }
    setToast("Welcome back!");
    router.push(safeCallbackUrl());
    router.refresh();
  }

  async function onGoogle() {
    setError(null);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: safeCallbackUrl(),
    });
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="mt-2 text-base-content/70">
        Access your borrows and profile.
      </p>

      {error ? (
        <div role="alert" className="alert alert-error mt-6 shadow-md">
          <span>{error}</span>
        </div>
      ) : null}

      {toast ? (
        <div className="toast toast-center toast-top z-50">
          <div className="alert alert-success shadow-lg">
            <span>{toast}</span>
          </div>
        </div>
      ) : null}

      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => void onLogin(e)}>
        <label className="form-control w-full">
          <span className="label-text font-medium">Email</span>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-medium">Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting}
        >
          {submitting ? (
            <span className="loading loading-spinner" />
          ) : (
            "Login"
          )}
        </button>
      </form>

      {googleAuthEnabled ? (
        <>
          <div className="divider">or</div>
          <button
            type="button"
            className="btn btn-outline w-full gap-2"
            onClick={() => void onGoogle()}
          >
            Continue with Google
          </button>
        </>
      ) : null}

      <p className="mt-8 text-center text-sm text-base-content/70">
        New here?{" "}
        <Link href="/register" className="link link-primary font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
}
