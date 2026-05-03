import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
] as const;

export function Navbar() {
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
          <button
            type="button"
            className="btn btn-outline btn-primary btn-sm sm:btn-md pointer-events-none opacity-80"
            aria-disabled
          >
            Login
          </button>
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
