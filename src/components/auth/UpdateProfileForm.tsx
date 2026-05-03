"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = {
  initialName: string;
  initialImage: string | null;
};

export function UpdateProfileForm({ initialName, initialImage }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setSubmitting(true);
    const { error: apiError } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim() || undefined,
    });
    setSubmitting(false);
    if (apiError) {
      setError(apiError.message ?? "Could not update profile.");
      return;
    }
    setToast("Profile updated.");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <h1 className="text-3xl font-bold">Update profile</h1>
      <p className="mt-2 text-base-content/70">
        Changes apply to your BookHive account.
      </p>

      {error ? (
        <div role="alert" className="alert alert-error mt-6 shadow-md">
          <span>{error}</span>
        </div>
      ) : null}

      {toast ? (
        <div className="toast toast-end toast-top z-50">
          <div className="alert alert-success shadow-lg">
            <span>{toast}</span>
          </div>
        </div>
      ) : null}

      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => void onSubmit(e)}>
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
          <span className="label-text font-medium">Image URL</span>
          <input
            type="url"
            className="input input-bordered w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://…"
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
            "Save changes"
          )}
        </button>
      </form>
    </div>
  );
}
