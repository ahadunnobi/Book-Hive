import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export function CatalogBookCard({ book }: Props) {
  return (
    <div className="card card-side flex-col bg-base-100 shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:flex-row">
      <figure className="relative h-48 w-full shrink-0 overflow-hidden bg-base-300 sm:h-auto sm:w-40">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 160px"
        />
      </figure>
      <div className="card-body gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="card-title text-base sm:text-lg">{book.title}</h2>
          <span className="badge badge-ghost badge-sm">{book.category}</span>
        </div>
        <p className="text-sm text-base-content/70">by {book.author}</p>
        <p className="line-clamp-3 text-sm leading-relaxed text-base-content/80">
          {book.description}
        </p>
        <div className="card-actions justify-end">
          <Link
            href={`/books/${book.id}`}
            className="btn btn-outline btn-primary btn-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
