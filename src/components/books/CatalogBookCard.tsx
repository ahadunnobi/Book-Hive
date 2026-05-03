import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export function CatalogBookCard({ book }: Props) {
  const stars = Math.round(book.rating || 0);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl sm:flex-row">
      <figure className="relative h-48 w-full shrink-0 overflow-hidden bg-base-300 sm:h-auto sm:w-44">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, 176px"
        />
        <div className="absolute left-2 top-2">
          <span className="badge badge-primary badge-sm font-medium shadow-sm">
            {book.category}
          </span>
        </div>
      </figure>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 text-lg font-bold text-base-content group-hover:text-primary transition-colors">
            {book.title}
          </h2>
        </div>
        <p className="mb-3 text-sm font-medium text-base-content/60">by {book.author}</p>
        
        <div className="mb-4 flex items-center gap-2">
          <div className="rating rating-xs">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                disabled
                className={`mask mask-star-2 ${i < stars ? "bg-orange-400" : "bg-base-300"}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-base-content/50">({book.rating})</span>
        </div>

        <p className="mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-base-content/70">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className={`text-xs font-bold uppercase tracking-wider ${book.available_quantity > 0 ? "text-success" : "text-error"}`}>
              {book.available_quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <span className="text-[10px] text-base-content/50">Qty: {book.available_quantity}</span>
          </div>
          <Link
            href={`/books/${book.id}`}
            className="btn btn-primary btn-sm rounded-lg px-6"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
