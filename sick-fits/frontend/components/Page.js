import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  red: '#ff0000',
  black: '#393939',
  grey: '#3a3a3a',
  lightgrey: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0,0,0,0.09)',
};

const StyledPage = styled.div`
  color: ${props => props.theme.black};
  background: white;
`;

const Inner = styled.div`
  padding: 2rem;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  background: ${props => props.theme.red};
`;

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
