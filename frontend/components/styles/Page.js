import styled from 'styled-components';

const Page = styled.div`
  background: white;
  color: ${({ theme }) => theme.black};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export { Page, Inner };
