import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BorrowButton } from "@/components/books/BorrowButton";
import { getAllBooks, getBookById } from "@/lib/books";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllBooks().map((b) => ({ id: b.id }));
}

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/books" className="link link-hover mb-8 inline-flex text-sm">
        ← Back to all books
      </Link>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[3/4] w-full max-w-lg overflow-hidden rounded-3xl border border-base-300 bg-base-300 shadow-xl lg:max-w-none">
          <Image
            src={book.image_url}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-6">
          <div>
            <span className="badge badge-primary badge-outline">{book.category}</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-base-content/70">by {book.author}</p>
          </div>
          <p className="leading-relaxed text-base-content/85">{book.description}</p>
          <div className="rounded-2xl border border-base-300 bg-base-200/50 p-4">
            <p className="text-sm font-medium text-base-content/60">
              Available quantity
            </p>
            <p className="text-2xl font-bold text-primary">
              {book.available_quantity} copies
            </p>
          </div>
          <BorrowButton />
        </div>
      </div>
    </div>
  );
}
