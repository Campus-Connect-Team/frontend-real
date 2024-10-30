import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletePage() {
  const navigate = useNavigate();

  // 회원 탈퇴 요청 함수
  const handleWithdrawal = async (studentNumber, token, passwordData) => {
    try {
      const response = await axios.delete(`http://54.198.230.191:8080/users/my-page/withdrawal/${studentNumber}`, {
        headers: {
          Authorization: token
        },
        data: passwordData // 요청 바디에 비밀번호 데이터 추가
      });
  
      console.log('회원 탈퇴 성공:', response.data);
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/userwithdrawalcomplete'); // 회원 탈퇴 완료 페이지로 이동
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };
  
  const confirmWithdrawal = () => {
    const result = window.confirm('회원 탈퇴 후 회원 정보는 복구할 수 없습니다. 회원 탈퇴를 진행하시겠습니까?');
    if (result) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token is not available');
        return;
      }
  
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const studentNumber = tokenData.studentNumber;
      if (!studentNumber) {
        console.error('Student number is not available in token');
        return;
      }
  
      // 비밀번호 데이터 구성
      const passwordData = {
        currentPassword: document.getElementById('currentPassword').value,
        checkCurrentPassword: document.getElementById('checkCurrentPassword').value
      };
  
      handleWithdrawal(studentNumber, token, passwordData);
    }
  };
  


  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Delete>
          {/* Title Wrap */}
          <div className="titleWrap">회원 탈퇴</div>

          {/* value Wrap */}
          <div className="valueWrap">
            회원탈퇴 이후에는 모든 서비스를 복구할 수 없어요. 신중하게 선택해주세요.
          </div>

          {/* contentWrap - 현재 비밀번호 입력 */}
          <div className="contentWrap">
            <div className="numbertext">
              <div className="inputTitle">
                현재 비밀번호{" "}
                <input id="currentPassword" type="password" placeholder="비밀번호를 입력해주세요." maxLength={20} />
              </div>
            </div>
          </div>

          {/* contentWrap - 비밀번호 재확인 */}
          <div className="contentWrap">
            <div className="inputTitle">
              비밀번호 재확인{" "}
              <input id="checkCurrentPassword" type="password" placeholder="비밀번호를 입력해주세요." maxLength={20} />
            </div>
          </div>
          
          <div>
            <button onClick={confirmWithdrawal}>회원 탈퇴</button>
          </div>
        </Delete>
      </Content>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageContainer>
  );
}

const FooterWrapper = styled.div`
  // position: fixed;
  // bottom: 0;
  // width: 100%;
`;


export default DeletePage;

// footer 최하단 고정
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;
///


const Delete = styled.div`

{
    position : absolute ;
    top:0;
    bottom : 0;
    width: 100% ;
    max-width : 500px;
    padding: 20px;
    left:50%;
    transform : translate(-50%,0);
    background-color: #23abeb;
    overflow : hidden;
    display: flex;
    flex-direction: column;
}

.titleWrap {
    margin-top: 87px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: #262626;

}

.valueWrap {
    white-space: pre-line;
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #FF0000
}

.contentWrap{
    text-align: center;
    margin-top: 50px;
    flex: 1;
    width:99%;
    }


  .numbertext{
    padding-left: 10px;
  }

  input{
    padding: 10px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
  }
  
  canvas {
    height: 100vh;
    pointer-events: none;
    position: fixed;
    width: 100%;
    z-index: 2;
  }
  
  button {
    margin : 0 auto;
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
    padding-left: 180px;
    background-color: #5b7eef;
    padding: 10px 50px;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
  }
  `
