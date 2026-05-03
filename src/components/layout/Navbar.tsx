"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
] as const;

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function onLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/");
        },
      },
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/80 bg-base-100/85 backdrop-blur-md">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary transition hover:opacity-90 sm:text-2xl"
          >
            BookHive
          </Link>
        </div>
        <div className="hidden flex-none md:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-lg font-medium hover:bg-base-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-none items-center gap-2">
          <Link
            href="/books"
            className="btn btn-ghost btn-sm md:hidden"
            aria-label="All Books"
          >
            Books
          </Link>
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <div className="hidden flex-col items-end sm:flex">
                <span className="max-w-[10rem] truncate text-sm font-medium leading-tight">
                  {session.user.name}
                </span>
              </div>
              <div className="avatar">
                <div className="w-9 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                      {session.user.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => void onLogout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm sm:btn-md">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="border-t border-base-200 px-4 pb-2 md:hidden">
        <ul className="menu menu-horizontal flex w-full justify-center gap-1 p-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-sm">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
