import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { defaultLocale, isValidLocale, locales } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;

  return {
    title: locale === "uz" ? "MarketHub" : locale === "ru" ? "MarketHub RU" : "MarketHub EN",
    description:
      locale === "uz"
        ? "Marketplace, buyurtma, sotuvchi va admin boshqaruvi"
        : locale === "ru"
          ? "Маркетплейс с ролями покупателя, продавца и администратора"
          : "Marketplace with buyer, seller, and admin experiences"
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <AppProviders>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader locale={params.locale} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </AppProviders>
    </NextIntlClientProvider>
  );
}
