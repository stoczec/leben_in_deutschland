import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './assets/styles/GlobalStyle';
import { LanguageProvider } from './providers/LanguageProvider';
import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <GlobalStyle />
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
