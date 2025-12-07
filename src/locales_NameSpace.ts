export const localesNS = [
  'login',
  'home',
  'panel',
  'transaction',
  'status',
  'settlement_status',
  'contract',
  'performance-report',
] as const;
export type LocaleNS = (typeof localesNS)[number];

export const languages = ['en', 'fa'] as const;
export type Language = (typeof languages)[number];
