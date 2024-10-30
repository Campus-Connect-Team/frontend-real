import React from 'react';
import styled from 'styled-components';

const ProfileWarningMessage = () => {
  return (
    <StyledWrapper>
      <div className="waring-message">
        <img src="/default2.png" />
        프로필 이미지를 제외한 모든 프로필 정보는 <br />변경 후 3개월 이후에 재변경이 가능하니 유의해 주세요!
      </div>
    </StyledWrapper>
  );
};

export default ProfileWarningMessage;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .waring-message {

    padding: 10px 100px;
    background: rgb(232, 232, 232);
    display: inline-flex;
    justify-content: center;
    text-align: center;
    border-radius: 6px;
    align-items: center;

    > img {
      width: 20px;
      height: 20px;
      margin-right: 50px;
    }
  }
`;