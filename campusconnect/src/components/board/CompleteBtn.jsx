import styled from 'styled-components';

const Button = styled.div`
  width: 7rem;
  height: 1.8rem;
  background-color: #ff6b00;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  line-height: 1.8rem;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

function ComplateBtn() {
  return <Button>거래 완료</Button>;
}

export default ComplateBtn;
