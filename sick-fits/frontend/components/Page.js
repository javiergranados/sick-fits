import { ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import './styles/GlobalStyles';
import theme from './themes/theme';
import PageStyles from './styles/PageStyles';
import InnerStyles from './styles/InnerStyles';

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PageStyles>
        <Meta />
        <Header />
        <InnerStyles>{children}</InnerStyles>
      </PageStyles>
    </ThemeProvider>
  );
};

export default Page;
