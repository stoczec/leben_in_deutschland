import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, serif;
  font-style: normal;
  line-height: 1;
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.clr_black};
  background-color: ${theme.colors.clr_white};
  scroll-behavior: smooth;
}

  body {
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
  color: ${theme.colors.clr_black};

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
`;

export default GlobalStyle;
