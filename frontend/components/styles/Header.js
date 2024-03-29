import styled from 'styled-components';

const Header = styled.header`
  .bar {
    border-bottom: 10px solid ${({ theme }) => theme.back};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: ${({ theme }) => theme.maxWidthHeader}) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  }
`;

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: ${({ theme }) => theme.maxWidthHeader}) {
    margin: 0;
    text-align: center;
  }
`;

export { Header, Logo };
