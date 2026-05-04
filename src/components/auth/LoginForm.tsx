"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

  const showRegisteredBanner = searchParams.get("registered") === "1";

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
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2 text-base-content/70">
        Access your borrows and profile.
      </p>

      {showRegisteredBanner ? (
        <div role="status" className="alert alert-success mt-6 shadow-md">
          <span>
            Registration successful. Sign in with your email and password.
          </span>
        </div>
      ) : null}

      {error ? (
        <div role="alert" className="alert alert-error mt-6 shadow-md">
          <span>{error}</span>
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
