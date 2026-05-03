import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const dynamic = "force-dynamic";

function FormFallback() {
  return (
    <div className="flex justify-center py-20">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}

export default function LoginPage() {
  const googleAuthEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <Suspense fallback={<FormFallback />}>
      <LoginForm googleAuthEnabled={googleAuthEnabled} />
    </Suspense>
  );
}
