import { ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import theme from './styles/Page/theme';
import StyledPage from './styles/Page/StyledPage';
import StyledInner from './styles/Page/StyledInner';

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <StyledInner>{children}</StyledInner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
