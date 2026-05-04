"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = {
  googleAuthEnabled: boolean;
};

export function RegisterForm({ googleAuthEnabled }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    const { error: apiError } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      image: photoUrl.trim() || undefined,
    });
    setSubmitting(false);
    if (apiError) {
      setError(apiError.message ?? "Registration failed.");
      return;
    }
    router.push("/login?registered=1");
  }

  async function onGoogle() {
    setError(null);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold">Registration</h1>
      <p className="mt-2 text-base-content/70">
        Join BookHive to borrow titles and manage your profile.
      </p>

      {error ? (
        <div role="alert" className="alert alert-error mt-6 shadow-md">
          <span>{error}</span>
        </div>
      ) : null}

      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => void onRegister(e)}>
        <label className="form-control w-full">
          <span className="label-text font-medium">Name</span>
          <input
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>
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
          <span className="label-text font-medium">Photo URL</span>
          <input
            type="url"
            className="input input-bordered w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://…"
            autoComplete="off"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-medium">Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
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
            "Register"
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
        Already have an account?{" "}
        <Link href="/login" className="link link-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
