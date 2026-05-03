import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="mt-2 text-base-content/70">
        A preview of your reader hub—sign-in arrives in a later release.
      </p>

      <div className="mt-10 card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-6 sm:flex-row sm:items-center">
          <div className="avatar">
            <div className="mask mask-squircle w-24 bg-base-300 ring ring-primary ring-offset-2 ring-offset-base-100">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                alt="Profile avatar placeholder"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-semibold">Alex Reader</h2>
            <p className="text-sm text-base-content/70">alex.reader@example.com</p>
            <div className="stats stats-horizontal shadow-sm">
              <div className="stat place-items-center px-4 py-3">
                <div className="stat-title text-xs">Borrowed</div>
                <div className="stat-value text-2xl text-primary">0</div>
                <div className="stat-desc text-xs">books</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div role="alert" className="alert alert-warning mt-8 shadow-md">
        <span>Authentication coming soon.</span>
      </div>
    </div>
  );
}
