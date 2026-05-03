"use server";

import { auth } from "@/lib/auth";
import { borrowBook } from "@/lib/book-repository";
import { headers } from "next/headers";

export async function borrowBookAction(bookId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return { ok: false as const, error: "You must be signed in to borrow." };
  }
  return borrowBook(bookId, session.user.id);
}
