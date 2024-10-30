import React from 'react';
import styled from 'styled-components';

const EditPassWordTitle = () => {
  return (
    <StyledWrapper>
      <div className="title">비밀번호 변경</div>
      <div className="description">비밀번호 변경 시 세션이 종료되어 재로그인이 필요합니다.</div>
    </StyledWrapper>
  );
};

export default EditPassWordTitle;

const StyledWrapper = styled.div`
  .title {
    font-size: 35px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .description {
    text-align: center;
    color: #aeaeae;
    margin-bottom: 50px;
  }
`;

