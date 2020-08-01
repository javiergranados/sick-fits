import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.offWhite};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${({ theme }) => theme.offWhite};
    border-right: 1px solid ${({ theme }) => theme.offWhite};
    position: relative;
    padding: 5px;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      display: block;
      padding: 10px 5px;
    }
  }
  tr {
    &:hover {
      background: ${({ theme }) => theme.offWhite};
    }
  }
`;

export { Table };
