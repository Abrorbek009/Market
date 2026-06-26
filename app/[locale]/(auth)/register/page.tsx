import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage({
  params
}: {
  params: { locale: string };
}) {
  return (
    <div className="container grid min-h-[calc(100vh-12rem)] place-items-center py-12">
      <RegisterForm locale={params.locale} />
    </div>
  );
}
