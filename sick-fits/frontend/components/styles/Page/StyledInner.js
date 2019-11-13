import styled from 'styled-components';

const StyledInner = styled.div`
  padding: 2rem;
  margin: 0 auto;
  background: ${props => props.theme.red};
  max-width: ${props => props.theme.maxWidth};
`;

export default StyledInner;
