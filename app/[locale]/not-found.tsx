import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="container grid min-h-[60vh] place-items-center py-16">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold">Sahifa topilmadi</h1>
        <p className="mt-3 text-muted-foreground">So&apos;ralgan sahifa mavjud emas yoki boshqa manzilga ko&apos;chirilgan.</p>
        <Button className="mt-6" asChild>
          <Link href="/uz">Bosh sahifaga qaytish</Link>
        </Button>
      </div>
    </div>
  );
}
