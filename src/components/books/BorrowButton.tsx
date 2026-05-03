"use client";

import { useCallback, useEffect, useState } from "react";

export function BorrowButton() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(close, 3200);
    return () => window.clearTimeout(t);
  }, [open, close]);

  return (
    <div className="relative">
      <button
        type="button"
        className="btn btn-primary btn-lg w-full sm:w-auto"
        onClick={() => setOpen(true)}
      >
        Borrow This Book
      </button>
      {open ? (
        <div className="toast toast-end toast-top z-50">
          <div className="alert alert-info shadow-lg">
            <span>Login required soon</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
