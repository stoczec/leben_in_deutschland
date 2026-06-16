import { createContext, useEffect, useState, useContext } from 'react';
import { loadArabicFonts } from '../fonts';

const LANG_KEY = 'language';

const LanguageContext = createContext({
  language: 'de',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANG_KEY) || 'de'
  );

  useEffect(() => {
    if (language === 'ar') loadArabicFonts();
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
