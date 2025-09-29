import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, SupportedLanguage } from './resources';

type InitLanguage = SupportedLanguage | 'en';

const defaultLanguage: InitLanguage = 'en';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      compatibilityJSON: 'v4',
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      interpolation: {
        escapeValue: false,
      },
      defaultNS: 'translation',
      ns: ['translation'],
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('i18n initialization failed', error);
    });
}

export { i18n };
