import { useState } from 'react';
import styled from 'styled-components';
import UserIcon from '../../../assets/UserIcon.png';
import CloseIcon from '../../../assets/CloseIcon.png';

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
  background-color: #fff;
  width: 48rem;
  height: 33rem;
  padding: 1% 3%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StuInfo = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  font-size: 1rem;
`;

const StuState = styled.div`
  color: #4181ff;
  font-weight: 600;
`;

const StuImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 30px;
`;
const StuTitle = styled.div`
  font-weight: 800;
`;

const CloseImg = styled.img`
  position: absolute;
  right: 3%;

  &: hover {
    cursor: pointer;
  }
`;

const FormContainer = styled.form`
  width: 85%;
  margin: 20px auto 0 auto;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const QuesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BtnContainer = styled.div`
  width: 12rem;
  display: flex;
  justify-content: space-between;
`;

// 버튼 스타일 - 선택 여부에 따라 동적 스타일 적용
const StyledButton = styled.button`
  width: 5rem;
  height: 1.8rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ isSelected }) => (isSelected ? '#4181ff' : '#535353')}; // 선택된 버튼 색상
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
  }
`;

const SubmitBtn = styled.button`
  width: 8rem;
  height: 2rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #4181ff;
  font-size: 1rem;
  margin-top: 1.5rem;

  &: hover {
    cursor: pointer;
  }
`;

function SellerRating({ onClose }) {
  // 각 질문에 대한 상태
  const [answers, setAnswers] = useState({
    punctuality: null,
    communication: null,
    friendliness: null,
    chatResponse: null,
    futureTransaction: null,
  });

  // 버튼 클릭 시 상태 업데이트
  const handleButtonClick = (question, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  return (
    <>
      <Backdrop />
      <Modal>
        <StuInfo>
          <StuState>[판매자]</StuState>
          <StuImg src={UserIcon} alt="프로필 이미지" />
          <StuTitle>~~~ 책 판매합니다.</StuTitle>
          <div>영어영문학과 / 이OO</div>

          <CloseImg onClick={onClose} src={CloseIcon} alt="닫기" />
        </StuInfo>
        <FormContainer>
          <QuesContainer>
            <div>판매자는 협의된 장소 / 약속 시간을 준수했나요?</div>
            <BtnContainer>
              <StyledButton
                type="button"
                isSelected={answers.punctuality === 'yes'}
                onClick={() => handleButtonClick('punctuality', 'yes')}
              >
                네
              </StyledButton>
              <StyledButton
                type="button"
                isSelected={answers.punctuality === 'no'}
                onClick={() => handleButtonClick('punctuality', 'no')}
              >
                아니요
              </StyledButton>
            </BtnContainer>
          </QuesContainer>

          <QuesContainer>
            <div>실제 거래 전까지 연락 및 협의가 잘 된 편인가요?</div>
            <BtnContainer>
              <StyledButton
                type="button"
                isSelected={answers.communication === 'yes'}
                onClick={() => handleButtonClick('communication', 'yes')}
              >
                네
              </StyledButton>
              <StyledButton
                type="button"
                isSelected={answers.communication === 'no'}
                onClick={() => handleButtonClick('communication', 'no')}
              >
                아니요
              </StyledButton>
            </BtnContainer>
          </QuesContainer>

          <QuesContainer>
            <div>상품의 상태는 게시글과 동일했나요?</div>
            <BtnContainer>
              <StyledButton
                type="button"
                isSelected={answers.friendliness === 'yes'}
                onClick={() => handleButtonClick('friendliness', 'yes')}
              >
                네
              </StyledButton>
              <StyledButton
                type="button"
                isSelected={answers.friendliness === 'no'}
                onClick={() => handleButtonClick('friendliness', 'no')}
              >
                아니요
              </StyledButton>
            </BtnContainer>
          </QuesContainer>

          <QuesContainer>
            <div>상황에 맞지 않는 부당한 가격이나 조건을 제시하지 않았나요? </div>
            <BtnContainer>
              <StyledButton
                type="button"
                isSelected={answers.chatResponse === 'yes'}
                onClick={() => handleButtonClick('chatResponse', 'yes')}
              >
                네
              </StyledButton>
              <StyledButton
                type="button"
                isSelected={answers.chatResponse === 'no'}
                onClick={() => handleButtonClick('chatResponse', 'no')}
              >
                아니요
              </StyledButton>
            </BtnContainer>
          </QuesContainer>

          <QuesContainer>
            <div>다음에도 기회가 된다면 이 판매자분과 거래하고 싶으신가요?</div>
            <BtnContainer>
              <StyledButton
                type="button"
                isSelected={answers.futureTransaction === 'yes'}
                onClick={() => handleButtonClick('futureTransaction', 'yes')}
              >
                네
              </StyledButton>
              <StyledButton
                type="button"
                isSelected={answers.futureTransaction === 'no'}
                onClick={() => handleButtonClick('futureTransaction', 'no')}
              >
                아니요
              </StyledButton>
            </BtnContainer>
          </QuesContainer>

          <SubmitBtn type="button">평가 완료하기</SubmitBtn>
        </FormContainer>
      </Modal>
    </>
  );
}

export default SellerRating;
