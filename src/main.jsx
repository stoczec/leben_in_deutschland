import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './assets/styles/GlobalStyle';
import { LanguageProvider } from './providers/LanguageProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyle />
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
