const DOCUMENTATION_LANGUAGE_MAP = new Map([
  ['en-US', 'en'],
  ['zh-CN', 'zh'],
  ['ja-JP', 'ja'],
  ['ru-RU', 'ru'],
  ['tr-TR', 'tr']
]);

export const isAbsoluteUrl = (path = ''): boolean => /^https?:\/\//i.test(path);

/** Build a bundled URL from a product documentation path. */
export const getDocumentationUrl = (path = '', locale = 'en-US'): string => {
  // An absolute URL is already the caller's whole decision — leave it alone
  // rather than turning it into a broken `/help/https://...` path.
  if (isAbsoluteUrl(path)) {
    return path;
  }
  const language = DOCUMENTATION_LANGUAGE_MAP.get(locale) ?? 'en';
  const prefix = language === 'en' ? '' : `${language}/`;
  return `/help/${prefix}${path}`;
};
