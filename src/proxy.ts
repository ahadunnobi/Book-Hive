import { auth } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/update", "/books/:id"],
};
