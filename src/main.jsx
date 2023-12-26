import React from 'react';
import { createRoot } from 'react-dom/client';
// import { createGlobalStyle } from 'styled-components';
import GlobalStyle from './assets/styles/GlobalStyle';
import { LanguageProvider } from './providers/LanguageProvider';
import { Flex } from 'antd';
import App from './components/App';

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Afacad', sans-serif;
//     font-weight: 700

//   }

//   body {
//   }

// `;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Flex vertical justify="center" align="center"> */}
    <LanguageProvider>
      <GlobalStyle />
      <App />
    </LanguageProvider>
    {/* </Flex> */}
  </React.StrictMode>
);
