import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams?: { callbackUrl?: string };
}) {
  return (
    <div className="container grid min-h-[calc(100vh-12rem)] place-items-center py-12">
      <LoginForm locale={params.locale} callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
}
