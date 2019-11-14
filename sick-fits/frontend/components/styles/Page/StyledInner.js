import styled from 'styled-components';

const StyledInner = styled.div`
  padding: 2rem;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export default StyledInner;
