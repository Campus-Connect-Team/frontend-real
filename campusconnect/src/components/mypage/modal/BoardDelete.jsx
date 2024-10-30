import styled from 'styled-components';

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
`;

const Title = styled.div`
  font-size: 1rem;
`;

const BtnContainer = styled.div`
  width: 12rem;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  border: none;
  width: 5rem;
  height: 1.8rem;
  background-color: #4181ff;
  border-radius: 5px;
  color: #fff;
  font-size: 0.875rem;

  &: hover {
    cursor: pointer;
  }
`;

const Explan = styled.div`
  font-size: 0.875rem;
  color: #6e6e6e;
  text-align: center;
`;

function BoardDelete({ onClose }) {
  return (
    <>
      <Backdrop />
      <Modal>
        <Title>게시글을 삭제하시겠어요?</Title>
        <BtnContainer>
          <Btn type="button">네</Btn>
          <Btn onClick={onClose} type="button">
            아니요
          </Btn>
        </BtnContainer>
        <Explan>
          만약 게시글 관련 채팅이 남아있다면 삭제가 불가능해요.
          <br />
          구매자에게 채팅 종료 사실을 알리고, 채팅 종료 후 삭제해주세요.
        </Explan>
      </Modal>
    </>
  );
}

export default BoardDelete;
