import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavigationBar = styled.div`
  width: 100%;
  height: 6.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebe7e7;
`;

const ExplanContainer = styled.div`
  display: flex;
`;

const LogoImg = styled.img`
  height: 2.5rem;
  margin-top: 0.4rem;
  margin-left: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Explan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
`;

const ExplanKor = styled.div`
  font-size: 1rem;
  color: #959494;
`;

const ExplanEng = styled.div`
  font-size: 1rem;
  color: #12348d;
`;

const Category = styled.a`
  font-size: 1rem;
  margin: 0 1.6rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Authentication = styled.a`
  font-size: 1rem;
  margin-right: 1.8rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StyledWrapper = styled.div`
  margin-right: 30px;
  width: 170px;

  .nav-seller-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .name {
      margin-bottom: 3px;
      text-align: end;
      cursor: pointer;
    }

    .info {
      font-size: 14px;
      color: #007aff;
    }

    > img {
      width: 45px;
      height: 45px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
  
  .nav-logout{
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color:blue;
    
    > img{
      width: 20px;
      height: 20px;
    }
  }
`;

function NavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({ department: '', name: '', profileImage: '' });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true); 
      const studentNumber = JSON.parse(atob(accessToken.split('.')[1])).studentNumber; // 토큰에서 학번 추출
      if (!studentNumber) {
        console.error('토큰에 학번이 없습니다.');
        return;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/users/my-page`, {
            headers: {
              Authorization: accessToken,
            },
            params: {
              studentNumber,
            },
          });

          const userData = response.data.basicProfileResponses[0]; 
          setUserInfo({
            department: userData.department || '',
            name: userData.name || '',
            image: userData.image || '',
          });
        } catch (error) {
          console.error('유저 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
      };

      fetchData();
    }
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login');
  };


  const handleProfileClick = () => {
    navigate('/mypage'); 
  };

  const handleBoardClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인 후 서비스 이용이 필요합니다.');
      return;
    }
    navigate('/board');
  };


  return (
    <NavigationBar>
      <ExplanContainer onClick={() => { navigate('/'); }}>
        <LogoImg src={Logo} alt="로고" />
        <Explan>
          <ExplanKor>성결대학교 중고거래 플랫폼</ExplanKor>
          <ExplanEng>CAMPUS CONNECT</ExplanEng>
        </Explan>
      </ExplanContainer>
      <div>
        <Category>서비스 이용 안내</Category>
        <Category>전체 공지사항</Category>
        <Category onClick={isAuthenticated ? handleBoardClick : () => alert('로그인 후 서비스 이용이 필요합니다.')}>거래 게시판</Category>
      </div>
      {isAuthenticated ? (
        <StyledWrapper>
          <div className="nav-seller-info" onClick={handleProfileClick}>
            <img src={userInfo.image || '/default.png'} alt="profile" />
            <div>
              <div className="name">{userInfo.department} <br /> {userInfo.name}</div> 
            </div>
          </div>
          <div className="nav-logout" onClick={handleLogout}>
            <div>
              <div>로그아웃</div>
            </div>
          </div>
        </StyledWrapper>
      ) : (
        <div>
          <Authentication onClick={() => { navigate('/login'); }}>로그인</Authentication>
          <Authentication onClick={() => { navigate('/signup'); }}>회원가입</Authentication>
        </div>
      )}
    </NavigationBar>
  );
}

export default NavBar;
