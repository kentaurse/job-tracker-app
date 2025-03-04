import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Optionally save to localStorage
    localStorage.setItem('preferred-language', lng);
  };

  const getCurrentLanguage = () => i18n.language;

  return {
    changeLanguage,
    getCurrentLanguage,
  };
}; 