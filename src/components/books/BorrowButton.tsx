"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { borrowBookAction } from "@/actions/borrow-book";
import { authClient } from "@/lib/auth-client";

type Props = {
  bookId: string;
};

export function BorrowButton({ bookId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 4000);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  async function onBorrow() {
    setToast(null);
    const { data: session, error: sessionError } = await authClient.getSession();
    if (sessionError || !session?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/books/${bookId}`)}`);
      setToast({ type: "info", message: "Please sign in to borrow this book." });
      return;
    }
    setLoading(true);
    const result = await borrowBookAction(bookId);
    setLoading(false);
    if (result.ok) {
      setToast({
        type: "success",
        message: `Borrowed! ${result.remaining} cop${result.remaining === 1 ? "y" : "ies"} left.`,
      });
      router.refresh();
    } else {
      setToast({ type: "error", message: result.error });
    }
  }

  const alertClass =
    toast?.type === "success"
      ? "alert-success"
      : toast?.type === "error"
        ? "alert-error"
        : "alert-info";

  return (
    <div className="relative">
      <button
        type="button"
        className="btn btn-primary btn-lg w-full sm:w-auto"
        disabled={loading}
        onClick={() => void onBorrow()}
      >
        {loading ? <span className="loading loading-spinner" /> : "Borrow This Book"}
      </button>
      {toast ? (
        <div className="toast toast-end toast-top z-50">
          <div className={`alert ${alertClass} shadow-lg`}>
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
