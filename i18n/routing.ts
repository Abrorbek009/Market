export const locales = ["uz", "ru", "en"] as const;
export const defaultLocale = "uz";

export type AppLocale = (typeof locales)[number];

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
