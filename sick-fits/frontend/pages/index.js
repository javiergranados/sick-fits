import styled from 'styled-components';

const MyButton = styled.button`
  background: ${props => props.background || '#ff6600'};
  div {
    font-size: 20px;
  }
`;

const BlueButton = styled(MyButton)`
  background: #1700e6;
`;

const Home = () => {
  return (
    <>
      <p>You're in home page</p>
      <MyButton>
        <div>Default button</div>
      </MyButton>
      <MyButton background="#ffc600">
        <div>Yellow button</div>
      </MyButton>
      <BlueButton>
        <div>Blue button</div>
      </BlueButton>
    </>
  );
};

export default Home;
