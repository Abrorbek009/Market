import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { defaultLocale, isValidLocale } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const currentLocale = requested ?? defaultLocale;

  if (!isValidLocale(currentLocale)) {
    notFound();
  }

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});
