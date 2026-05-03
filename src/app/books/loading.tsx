export default function BooksLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-8 text-center">
        <div className="mx-auto h-10 w-48 animate-pulse rounded-lg bg-base-300" />
        <div className="mx-auto mt-2 h-4 w-64 animate-pulse rounded-lg bg-base-300" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="mx-auto mb-10 w-full max-w-2xl">
        <div className="mb-2 h-4 w-16 animate-pulse rounded bg-base-300" />
        <div className="h-14 w-full animate-pulse rounded-xl bg-base-300" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar Skeleton */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4 shadow-sm">
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-base-300" />
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-10 w-full animate-pulse rounded-lg bg-base-300" />
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Grid Skeleton */}
        <div className="min-w-0 flex-1">
          <div className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex h-48 w-full animate-pulse flex-col rounded-2xl bg-base-300 sm:flex-row">
                <div className="h-full w-full rounded-t-2xl bg-base-200 sm:w-40 sm:rounded-l-2xl sm:rounded-tr-none" />
                <div className="flex-1 space-y-3 p-5">
                  <div className="h-6 w-3/4 rounded bg-base-200" />
                  <div className="h-4 w-1/4 rounded bg-base-200" />
                  <div className="h-12 w-full rounded bg-base-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
