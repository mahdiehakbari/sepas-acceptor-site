export const localesNS = [
  'login',
  'home',
  'panel',
  'transaction',
  'status',
  'settlement_status',
  'contract',
  'performance-report',
  'dental-society',
  'faq',
] as const;
export type LocaleNS = (typeof localesNS)[number];

export const languages = ['en', 'fa'] as const;
export type Language = (typeof languages)[number];
