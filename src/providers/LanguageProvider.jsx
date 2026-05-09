import { createContext, useState, useContext } from 'react';

const LANG_KEY = 'language';

const LanguageContext = createContext({
  language: 'de',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANG_KEY) || 'de'
  );

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
