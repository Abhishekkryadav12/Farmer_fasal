import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import hiTranslations from './locales/hi/translation.json';
import paTranslations from './locales/pa/translation.json';
import orTranslations from './locales/or/translation.json';

const savedLanguage = localStorage.getItem('smartBharatLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      pa: { translation: paTranslations },
      or: { translation: orTranslations }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
