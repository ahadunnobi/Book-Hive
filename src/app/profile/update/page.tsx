import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UpdateProfileForm } from "@/components/auth/UpdateProfileForm";

export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <UpdateProfileForm
      initialName={session.user.name ?? ""}
      initialImage={session.user.image ?? null}
    />
  );
}
