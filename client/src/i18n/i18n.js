import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Get the stored language from localStorage, default to 'ja' if none exists
const storedLanguage = localStorage.getItem('i18nextLng') || 'ja';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ja',
    supportedLngs: ['en', 'ja', 'zh'],
    lng: storedLanguage, // Use the stored language
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

// Ensure the language is stored in localStorage
if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'ja');
}

export default i18n; 