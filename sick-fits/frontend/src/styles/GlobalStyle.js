import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import { fontFaces } from './fonts';

const GlobalStyle = createGlobalStyle`
  ${fontFaces}
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

export default GlobalStyle;
