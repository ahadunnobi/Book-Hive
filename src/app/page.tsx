import Link from "next/link";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedBookCard } from "@/components/books/FeaturedBookCard";
import { getFeaturedBooks } from "@/lib/books";

export const dynamic = "force-dynamic";

const CATEGORY_CARDS = [
  {
    title: "Story",
    blurb: "Novels, sagas, and heartfelt fiction.",
    href: "/books?category=Story",
    emoji: "📖",
  },
  {
    title: "Tech",
    blurb: "Build skills with modern engineering reads.",
    href: "/books?category=Tech",
    emoji: "💻",
  },
  {
    title: "Science",
    blurb: "Explore how the world works.",
    href: "/books?category=Science",
    emoji: "🔭",
  },
  {
    title: "Programming",
    blurb: "Code, craft, and software excellence.",
    href: "/books?category=Programming",
    emoji: "⚡",
  },
  {
    title: "Business",
    blurb: "Strategy, leadership, and growth.",
    href: "/books?category=Business",
    emoji: "📈",
  },
  {
    title: "Self Help",
    blurb: "Habits, focus, and personal momentum.",
    href: "/books?category=Self%20Help",
    emoji: "🌱",
  },
] as const;

const WHY = [
  { title: "Huge Collection", text: "2,000 titles across twenty curated categories." },
  { title: "Easy Borrow", text: "Reserve in seconds with your BookHive account." },
  { title: "Fast Search", text: "Find the right book by title without friction." },
  { title: "Responsive Design", text: "Read, browse, and borrow on any screen." },
] as const;

export default async function HomePage() {
  const featured = await getFeaturedBooks(4);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              BookHive
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find Your Next Read
            </h1>
            <p className="max-w-xl text-lg text-base-content/75">
              Discover and borrow books easily.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/books" className="btn btn-primary btn-lg shadow-lg">
                Browse Now
              </Link>
              <Link
                href="/books"
                className="btn btn-outline btn-primary btn-lg"
              >
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative rounded-3xl border border-base-300 bg-base-200/50 p-8 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary/20 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">2,000+</p>
                  <p className="text-xs text-base-content/70">Curated titles</p>
                </div>
                <div className="rounded-2xl bg-secondary/20 p-4 text-center">
                  <p className="text-3xl font-bold text-secondary">20</p>
                  <p className="text-xs text-base-content/70">Categories</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-accent/15 p-4 text-center">
                  <p className="text-sm font-medium text-accent">
                    Sign in to borrow—inventory stays in sync with MongoDB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <p className="mt-2 text-base-content/70">
              Top picks by availability—grab them while copies last.
            </p>
          </div>
          <Link href="/books" className="btn btn-ghost btn-primary">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((book) => (
            <FeaturedBookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="border-y border-base-300 bg-base-200/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">Book Categories</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-base-content/70">
            Jump straight into the shelf that fits your mood.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_CARDS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group card border border-base-300 bg-base-100 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="card-body">
                  <span className="text-4xl" aria-hidden>
                    {c.emoji}
                  </span>
                  <h3 className="card-title mt-2 group-hover:text-primary">
                    {c.title}
                  </h3>
                  <p className="text-sm text-base-content/70">{c.blurb}</p>
                  <span className="link link-primary text-sm font-semibold">
                    Browse {c.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Why Choose Us</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-base-content/70">
          Built for readers who want a calm, premium borrowing experience.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/75">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
