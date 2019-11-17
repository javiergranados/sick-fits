import { ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import * as S from './styles/Page';

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <S.Page>
        <Meta />
        <Header />
        <S.Inner>{children}</S.Inner>
      </S.Page>
    </ThemeProvider>
  );
};

export default Page;
