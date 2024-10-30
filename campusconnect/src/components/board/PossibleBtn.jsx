import styled from 'styled-components';

const Button = styled.div`
  width: 7rem;
  height: 1.8rem;
  background-color: #4181ff;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  line-height: 1.8rem;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

function PossibleBtn() {
  return <Button>거래 가능</Button>;
}

export default PossibleBtn;
