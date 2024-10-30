import React from 'react';
import styled from 'styled-components';

const ModalChattingDesc = ({ setModalOpen }) => {
  return (
    <StyledWrapper>
      <div className="title">게시글을 작성한 판매자와 채팅을 시작하겠어요?</div>
      <div className="btn-wrapper">
        <div>네</div>
        <div onClick={() => setModalOpen(false)}>아니오</div>
      </div>
      <div className="desc">수락하시면 마이페이지로 이동해요. 마이페이지의 <br />
        진행중인 채팅 내역에서 채팅을 시작할수 있어요.
      </div>
    </StyledWrapper>
  );
};

export default ModalChattingDesc;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .btn-wrapper {
    display: flex;
    margin-bottom: 30px;

    > div {
      background-color: rgb(0, 122, 255);
      width: 70px;
      text-align: center;
      padding: 8px 0;
      border-radius: 8px;
      color: #fff;

      &:first-child {
        margin-right: 20px;
      }
    }

  }
  
  .desc{
    text-align: center;
    font-size: 14px;
    color: #666464;
  }
`;
