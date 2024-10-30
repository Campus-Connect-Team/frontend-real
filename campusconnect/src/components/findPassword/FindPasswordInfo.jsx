import React from 'react';
import styled from 'styled-components';

const FindPasswordInfo = () => {
  return (
    <StyledWrapper>
      <div className="first-info">이메일로 임시 비밀번호를 발송하였습니다. <br />
        임시 비밀번호로 로그인을 진행해 주세요.
      </div>
      <div>보안을 위해 로그인 후 마이페이지에서 비밀번호를 수정해 주세요.</div>
    </StyledWrapper>
  );
};

export default FindPasswordInfo;

const StyledWrapper = styled.div`
  background: #e0e0e0;
  padding: 30px 70px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 130px;
  
  .first-info{
    margin-bottom: 20px;
  }
`;
