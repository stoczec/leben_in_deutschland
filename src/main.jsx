import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './assets/styles/GlobalStyle';
import { LanguageProvider } from './providers/LanguageProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ProgressProvider } from './providers/ProgressProvider';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <GlobalStyle />
          <App />
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
