import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, shared } from '../assets/styles/themes';

const THEME_KEY = 'theme';

const ThemeContext = createContext({
  mode: 'dark',
  toggle: () => {},
  theme: themes.product.dark,
});

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialMode);
  const palette = themes.product[mode];
  const theme = { ...palette, ...shared, mode };

  const toggle = () => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle, theme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => useContext(ThemeContext);
