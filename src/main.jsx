import './fonts';
import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './assets/styles/GlobalStyle';
import { LanguageProvider, readSavedLanguage } from './providers/LanguageProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ProgressProvider } from './providers/ProgressProvider';
import { ExamProvider } from './providers/ExamProvider';
import App from './components/App';
import ReloadPrompt from './components/ReloadPrompt';
import { loadTranslations } from './data/translations';

const root = createRoot(document.getElementById('root'));
// First paint waits for the saved language's chunk so translations do not pop in; German resolves at once.
loadTranslations(readSavedLanguage()).then(() => root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <ExamProvider>
            <GlobalStyle />
            <App />
            <ReloadPrompt />
          </ExamProvider>
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
));
