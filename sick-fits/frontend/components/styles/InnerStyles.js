import styled from 'styled-components';

const InnerStyles = styled.div`
  padding: 2rem;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export default InnerStyles;
