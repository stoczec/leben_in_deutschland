import { createGlobalStyle } from 'styled-components';
import { shared } from './themes';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: ${shared.fontStack.sans};
    font-style: normal;
    line-height: 1.4;
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 200ms ease, color 200ms ease;
  }

  body {
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol, li {
    list-style: none;
  }

  img {
    vertical-align: top;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: inherit;
    font-size: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.focus};
    outline-offset: 2px;
    border-radius: 2px;
  }

  [lang="ar"] body,
  [dir="rtl"] body {
    font-family: ${shared.fontStack.arabic};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
