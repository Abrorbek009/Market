import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="container py-10">
      <div className="max-w-3xl rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-soft">
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="mt-2 text-muted-foreground">Shaxsiy ma&apos;lumotlar va hisob xavfsizligini boshqaring.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-secondary p-5">
            <p className="text-sm text-muted-foreground">Ism</p>
            <p className="mt-2 text-lg font-semibold">{session?.user?.name ?? "Demo User"}</p>
          </div>
          <div className="rounded-3xl bg-secondary p-5">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-2 text-lg font-semibold">{session?.user?.email ?? "demo@example.com"}</p>
          </div>
          <div className="rounded-3xl bg-secondary p-5">
            <p className="text-sm text-muted-foreground">Telefon</p>
            <p className="mt-2 text-lg font-semibold">{session?.user?.phone ?? "+998 90 000 00 00"}</p>
          </div>
          <div className="rounded-3xl bg-secondary p-5">
            <p className="text-sm text-muted-foreground">Rol</p>
            <p className="mt-2 text-lg font-semibold">{session?.user?.role ?? "BUYER"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
