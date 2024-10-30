import styled from 'styled-components';
import UserIcon from '../../../assets/UserIcon.png';

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 3;
  background: rgba(0, 0, 0, 0.45);
`;

const Modal = styled.div`
  position: fixed;
  border: 1px solid #f6d9d9;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  width: 28rem;
  height: 11rem;
  padding: 1% 3%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ProfileImg = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 30px;
`;

const ProfileTitle = styled.div`
  font-weight: 900;
`;

const BtnContainer = styled.div`
  width: 12rem;
  display: flex;
  justify-content: space-between;
`;

const OffBtn = styled.button`
  border: none;
  width: 5rem;
  height: 1.8rem;
  background-color: #ff4141;
  border-radius: 5px;
  color: #fff;

  &: hover {
    cursor: pointer;
  }
`;

const CloseBtn = styled.button`
  border: none;
  width: 5rem;
  height: 1.8rem;
  background-color: #4181ff;
  border-radius: 5px;
  color: #fff;

  &: hover {
    cursor: pointer;
  }
`;

function InterestListOff({ onClose }) {
  return (
    <>
      <Backdrop />
      <Modal>
        <Profile>
          <ProfileImg src={UserIcon} alt="프로필 사진" />
          <ProfileTitle>컴퓨터구조 전공교재</ProfileTitle>
          <div>정보통신공학과 / 이OO</div>
        </Profile>
        <div>관심상품에서 해제하시겠어요?</div>
        <BtnContainer>
          <OffBtn type="button">해제</OffBtn>
          <CloseBtn onClick={onClose} type="button">
            취소
          </CloseBtn>
        </BtnContainer>
      </Modal>
    </>
  );
}

export default InterestListOff;
