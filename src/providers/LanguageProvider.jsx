import { createContext, useEffect, useState, useContext } from 'react';
import { cachedTranslations, loadTranslations } from '../data/translations';

const LANG_KEY = 'language';

const LanguageContext = createContext({
  language: 'de',
  translations: null,
  changeLanguage: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const readSavedLanguage = () => {
  const saved = localStorage.getItem(LANG_KEY);
  return ['de', 'en', 'ua', 'ru'].includes(saved) ? saved : 'de';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(readSavedLanguage);
  const [loaded, setLoaded] = useState(() => ({ lang: language, byId: cachedTranslations(language) }));

  useEffect(() => {
    let alive = true;
    loadTranslations(language).then((byId) => {
      if (!alive) return;
      setLoaded((prev) => (prev.lang === language && prev.byId === byId ? prev : { lang: language, byId }));
    });
    return () => {
      alive = false;
    };
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem(LANG_KEY, lang);
  };

  const translations = loaded.lang === language ? loaded.byId : null;

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
