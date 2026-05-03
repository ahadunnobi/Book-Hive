const SEGMENTS = [
  "New Arrivals",
  "Top Story Books",
  "Tech Collection",
  "Science Reads",
] as const;

export function Marquee() {
  const text = SEGMENTS.join(" | ");
  return (
    <div className="relative overflow-hidden border-y border-base-300 bg-gradient-to-r from-base-200/90 via-base-100 to-base-200/90 py-3.5">
      <div className="flex w-max animate-marquee">
        <span className="px-10 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {text}
        </span>
        <span
          className="px-10 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          aria-hidden
        >
          {text}
        </span>
      </div>
    </div>
  );
}
