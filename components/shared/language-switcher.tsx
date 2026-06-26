"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const strippedPath = pathname.replace(/^\/(uz|ru|en)/, "") || "/";

  return (
    <div className="flex items-center gap-1 rounded-full border bg-white p-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${strippedPath}`}
          className={cn(
            "rounded-full px-3 py-2 text-xs font-semibold uppercase",
            locale === currentLocale ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
