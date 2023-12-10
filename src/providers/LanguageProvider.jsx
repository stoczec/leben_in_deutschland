// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

// Создаем контекст для языка
const LanguageContext = createContext({
  language: 'de', // Значение по умолчанию
  changeLanguage: () => {}, // Пустая функция для изменения языка
});

// Компонент-провайдер для предоставления текущего языка всему приложению
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de'); // Начальный язык

  // Функция для изменения языка
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования контекста языка
export const useLanguage = () => useContext(LanguageContext);
