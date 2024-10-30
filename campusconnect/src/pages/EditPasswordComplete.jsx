import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import styled from 'styled-components';

function EditPasswordComplete() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login'); // 로그인 페이지의 경로를 '/login'으로 가정
  };

  return (
    <>
      <NavBar />
      <StyledWrapper>
        <div className="title-wrapper">
          비밀번호 변경 완료 !
        </div>
        <div className="sub-title">비밀번호가 변경되어 자동으로 로그아웃되었어요. <br />
          변경하신 비밀번호로 재로그인 부탁드려요
        </div>
        <div className="my-page-btn" onClick={handleRedirect}>
          <div>로그인 페이지로 이동</div>
        </div>
      </StyledWrapper>
      <Footer />
    </>
  );
}

export default EditPasswordComplete;

const StyledWrapper = styled.div`
  margin-top: 250px;
  height: 100%;

  .title-wrapper {
    font-size: 32px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }

  .sub-title {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .my-page-btn {
    display: flex;
    justify-content: center;
    margin: 40px 0;
    cursor: pointer;

    > div {
      background-color: #5b7eef;
      padding: 8px 35px;
      color: #fff;
      border-radius: 6px;
      display: inline-flex;
    }
  }
`;
