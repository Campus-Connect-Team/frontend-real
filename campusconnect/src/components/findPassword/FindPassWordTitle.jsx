import React from 'react';
import styled from 'styled-components';

const FindPassWordTitle = () => {
  return (
    <StyledWrapper>
      <div className="title">비밀번호 찾기</div>
      <div className="description">가입한 학번에 매칭된 학교 이메일을 입력하면 임시 비밀번호를 보내드려요. <br />
        보안을 위해 임시 비밀번호로 로그인 후 <span>마이페이지에서 비밀번호를 변경</span>해 주세요.
      </div>
    </StyledWrapper>
  );
};

export default FindPassWordTitle;

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

    > span {
      color: #5b7eef;
    }
  }

`;
