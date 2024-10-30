import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DeleteBtn = styled.button`
  border: none;
  width: 7rem;
  height: 2.2rem;
  background-color: #ff4141;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 10%;

  &: hover {
    cursor: pointer;
  }
`;

function DeleteAccountBtn() {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    navigate('/userwithdrawal'); // 회원 탈퇴 페이지로 이동
  };

  return (
    <DeleteBtn onClick={handleDeleteAccount}>
      회원 탈퇴
    </DeleteBtn>
  );
}

  


export default DeleteAccountBtn;
