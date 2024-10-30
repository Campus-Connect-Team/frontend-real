import React from 'react';
import styled from 'styled-components';

const ModalLikeDesc = ({ setLikeModalOpen, isHeartActive, setIsHeartActive }) => {
  const handleYes = () => {
    setIsHeartActive(!isHeartActive); // isHeartActive 상태 반전
    setLikeModalOpen(false); // 모달 닫기
  };

  const handleNo = () => {
    setLikeModalOpen(false); // 모달 닫기
  };


  return (
    <StyledWrapper>
      <div className="title">
        {!isHeartActive ? '해당 상품이 관심 상품으로 등록되었어요.' : '해당 상품이 관심 상품에서 해제하시겠어요?'}</div>
      <div className="btn-wrapper">
        {!isHeartActive ? <div onClick={handleYes}>확인</div> : <>
          <div onClick={handleYes} className="yes-btn">네</div>
          <div onClick={handleNo}>아니오</div>
        </>}
      </div>
      <div className="desc">
        마이페이지 -{'>'} 관심 상품 내역에서 자신이 등록한 관심 상품 내역을 확인할실 수 있어요.
      </div>
    </StyledWrapper>
  );
};

export default ModalLikeDesc;

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
    }
    
    .yes-btn{
      margin-right: 8px;
    }

  }

  .desc {
    text-align: center;
    font-size: 14px;
    color: #666464;
  }
`;
