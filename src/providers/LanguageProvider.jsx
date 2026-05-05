import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext({
  language: 'de',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
