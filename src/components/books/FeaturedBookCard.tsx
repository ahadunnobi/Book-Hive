import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export function FeaturedBookCard({ book }: Props) {
  return (
    <div className="card bg-base-100 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <figure className="relative aspect-[3/4] w-full overflow-hidden bg-base-300">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </figure>
      <div className="card-body gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="badge badge-outline badge-primary badge-sm shrink-0">
            {book.category}
          </span>
          <span className="text-xs font-medium text-base-content/60">
            Qty: {book.available_quantity}
          </span>
        </div>
        <h3 className="card-title line-clamp-2 text-lg leading-snug">
          {book.title}
        </h3>
        <p className="text-sm text-base-content/70">by {book.author}</p>
        <div className="card-actions mt-1 justify-end">
          <Link
            href={`/books/${book.id}`}
            className="btn btn-primary btn-sm sm:btn-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
