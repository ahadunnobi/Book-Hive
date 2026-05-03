import { RegisterForm } from "@/components/auth/RegisterForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const googleAuthEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return <RegisterForm googleAuthEnabled={googleAuthEnabled} />;
}
