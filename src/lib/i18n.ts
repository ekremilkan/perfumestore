import { env as processEnv } from 'node:process';

import de from '../i18n/de.json';
import en from '../i18n/en.json';
import tr from '../i18n/tr.json';

export type Locale = 'en' | 'de' | 'tr';

const rawLocales = (processEnv.SUPPORTED_LANGUAGES ?? 'en,de,tr')
  .split(',')
  .map((locale) => locale.trim().toLowerCase())
  .filter(Boolean);

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en,
  de,
  tr
};

type Dictionaries = typeof dictionaries;
export type TranslationValue = string | number | boolean | null;
type Dictionary = Record<string, unknown>;

type NestedKeyOf<ObjectType extends Dictionary> = {
  [Key in keyof ObjectType & string]:
    ObjectType[Key] extends Dictionary ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}`;
}[keyof ObjectType & string];

export type TranslationKey = NestedKeyOf<typeof en>;

const FALLBACK_LOCALE: Locale = 'en';

function normalizeLocale(locale?: string | null): Locale {
  if (!locale) return FALLBACK_LOCALE;
  const lowered = locale.toLowerCase();
  const exact = Object.keys(dictionaries).find((key) => key === lowered);
  if (exact) {
    return exact as Locale;
  }
  const short = lowered.split('-')[0];
  const supported = Object.keys(dictionaries).find((key) => key === short);
  if (supported) {
    return supported as Locale;
  }
  return FALLBACK_LOCALE;
}

export const SUPPORTED_LOCALES = Array.from(
  new Set<Locale>(
    rawLocales
      .map((locale) => normalizeLocale(locale))
      .concat(Object.keys(dictionaries) as Array<Locale>)
  )
);

function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[FALLBACK_LOCALE];
}

function getNestedValue(record: Dictionary, key: string): unknown {
  return key.split('.').reduce<unknown>((accumulator, part) => {
    if (accumulator && typeof accumulator === 'object' && part in (accumulator as Dictionary)) {
      return (accumulator as Dictionary)[part];
    }
    return undefined;
  }, record);
}

function interpolate(value: string, params?: Record<string, TranslationValue>) {
  if (!params) return value;
  return value.replace(/{{(.*?)}}/g, (_, token) => {
    const trimmed = token.trim();
    const replacement = params[trimmed];
    return replacement !== undefined && replacement !== null ? String(replacement) : '';
  });
}

export function createTranslator(locale: string | null | undefined) {
  const resolved = normalizeLocale(locale);
  const dictionary = getDictionary(resolved);
  const fallbackDictionary = getDictionary(FALLBACK_LOCALE);

  return (key: TranslationKey, params?: Record<string, TranslationValue>): string => {
    const primary = getNestedValue(dictionary as Dictionary, key);
    const fallback = getNestedValue(fallbackDictionary as Dictionary, key);
    const value = primary ?? fallback;
    if (typeof value === 'string') {
      return interpolate(value, params);
    }
    return '';
  };
}

export type Translator = ReturnType<typeof createTranslator>;

export function resolveLocaleFromRequest(request: Request) {
  const url = new URL(request.url);
  const langParam = url.searchParams.get('lang');
  if (langParam) {
    return normalizeLocale(langParam);
  }
  const header = request.headers.get('accept-language');
  if (header) {
    const preferred = header
      .split(',')
      .map((part) => part.split(';')[0]?.trim())
      .find((candidate) => candidate && SUPPORTED_LOCALES.includes(normalizeLocale(candidate)));
    if (preferred) {
      return normalizeLocale(preferred);
    }
  }
  return normalizeLocale(processEnv.DEFAULT_LANGUAGE ?? FALLBACK_LOCALE);
}
