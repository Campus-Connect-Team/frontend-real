import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import styled from 'styled-components';

function EditMyPageComplete() {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  return (
    <>  
      <NavBar />
      <StyledWrapper>
        <div className="title-wrapper">
          기본 프로필 수정 완료!
        </div>
        <div className="sub-title">수정된 기본 프로필은 마이 페이지에서 확인할 수 있어요.</div>
        <div className="my-page-btn" onClick={handleMyPageClick}>
          <div>마이 페이지로 이동</div>
        </div>
      </StyledWrapper>
      <Footer />
    </>
  );
}

export default EditMyPageComplete;

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
  
  .sub-title{
    display: flex;
    justify-content: center;
  }
  
  .my-page-btn{
    display: flex;
    justify-content: center;
    margin: 40px 0;
    cursor: pointer;

    > div{
      background-color: #5b7eef;
      padding: 8px 35px;
      color: #fff;
      border-radius: 6px;
      display: inline-flex;
    }
  }
`;
