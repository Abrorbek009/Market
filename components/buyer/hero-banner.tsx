import Link from "next/link";
import { ArrowRight, ShieldCheck, Store, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Store, label: "Seller kabineti" },
  { icon: Truck, label: "Buyurtma kuzatuvi" },
  { icon: ShieldCheck, label: "Admin nazorati" }
];

export async function HeroBanner({ locale }: { locale: string }) {
  const t = await getTranslations("home");

  return (
    <section className="container pt-8">
      <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-mesh bg-primary/90 px-6 py-12 text-primary-foreground shadow-soft md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">Vercel-ready architecture</span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">{t("headline")}</h1>
              <p className="max-w-2xl text-base text-primary-foreground/80 md:text-lg">{t("subheadline")}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" size="lg" asChild>
                <Link href={`/${locale}/products`}>
                  Xaridni boshlash <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href={`/${locale}/seller/dashboard`}>Seller dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {benefits.map((item) => (
              <div key={item.label} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <item.icon className="h-10 w-10" />
                <p className="mt-4 text-xl font-bold">{item.label}</p>
                <p className="mt-2 text-sm text-primary-foreground/80">Mobile-first va role-based tajriba.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
