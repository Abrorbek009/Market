import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { MobileNav } from "@/components/shared/mobile-nav";
import { Button } from "@/components/ui/button";

export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations("common");

  const navLinks = [
    { href: `/${locale}`, label: "Bosh sahifa" },
    { href: `/${locale}/products`, label: t("catalog") },
    { href: `/${locale}/orders`, label: t("orders") },
    { href: `/${locale}/cart`, label: t("cart") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-background/85 backdrop-blur-xl">
      <div className="container flex min-h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold">{t("brand")}</p>
              <p className="text-xs text-muted-foreground">fullstack marketplace</p>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium hover:bg-white/70">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link href={`/${locale}/login`}>{t("login")}</Link>
            </Button>
            <Button asChild>
              <Link href={`/${locale}/register`}>{t("register")}</Link>
            </Button>
          </div>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
