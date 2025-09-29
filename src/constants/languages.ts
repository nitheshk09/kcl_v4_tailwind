import { SupportedLanguage } from '../i18n/resources';

type LanguageOption = {
  id: string;
  code: SupportedLanguage;
  nameKey: `common.languageNames.${SupportedLanguage}`;
  flag: string;
};

export const languageOptions: LanguageOption[] = [
  { id: 'en', code: 'en', nameKey: 'common.languageNames.en', flag: '🇺🇸' },
  { id: 'hi', code: 'hi', nameKey: 'common.languageNames.hi', flag: '🇮🇳' },
  { id: 'te', code: 'te', nameKey: 'common.languageNames.te', flag: '🇮🇳' },
  { id: 'ta', code: 'ta', nameKey: 'common.languageNames.ta', flag: '🇮🇳' },
  { id: 'ml', code: 'ml', nameKey: 'common.languageNames.ml', flag: '🇮🇳' },
];

export type { LanguageOption };
