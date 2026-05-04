import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getBorrowCount } from "@/lib/book-repository";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = session.user;
  const borrowed = await getBorrowCount(user.id);
  const rawCreated = user.createdAt;
  const joined =
    rawCreated instanceof Date
      ? rawCreated
      : typeof rawCreated === "string" || typeof rawCreated === "number"
        ? new Date(rawCreated)
        : null;
  const joinedLabel = joined
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "long",
      }).format(joined)
    : "—";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="mt-2 text-base-content/70">
        Your reader hub—keep your details up to date anytime.
      </p>

      <div className="mt-10 card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-6 sm:flex-row sm:items-center">
          <div className="avatar">
            <div className="mask mask-squircle w-24 bg-base-300 ring ring-primary ring-offset-2 ring-offset-base-100">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt=""
                  width={96}
                  height={96}
                  className="h-24 w-24 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center bg-primary text-3xl font-bold text-primary-content">
                  {user.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-base-content/70">{user.email}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-base-300 bg-base-200/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Account status
                </p>
                <p className="mt-1 text-lg font-medium text-success">Active</p>
              </div>
              <div className="rounded-xl border border-base-300 bg-base-200/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Joined
                </p>
                <p className="mt-1 text-lg font-medium">{joinedLabel}</p>
              </div>
            </div>
            <div className="stats stats-horizontal shadow-sm">
              <div className="stat place-items-center px-4 py-3">
                <div className="stat-title text-xs">Borrowed</div>
                <div className="stat-value text-2xl text-primary">{borrowed}</div>
                <div className="stat-desc text-xs">books</div>
              </div>
            </div>
            <Link href="/profile/update" className="btn btn-primary btn-sm w-fit">
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
