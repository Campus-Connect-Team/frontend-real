import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';  
import Footer from '../components/Footer'
import styled from 'styled-components';

const Content = styled.div`
  flex: 1; /* Content가 컨테이너의 남은 공간을 모두 차지하도록 설정 */
`;

function LoginPage() {
  // 상태 관리 추가
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');

  // useNavigate 훅 사용
  const navigate = useNavigate();

  // 로그인 함수 추가
  const handleLogin = async () => {
    const loginData = {
      studentNumber,
      password
    };

    try {
      const response = await axios.post('http://localhost:8080/users/log-in', loginData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data && response.data.accessToken) {
        const {accessToken, refreshToken, department, name, profileImage } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('department', department);
        localStorage.setItem('name', name);
        localStorage.setItem('profileImage', profileImage);

        alert(response.data.responseCode);
        navigate('/board');
      }
    } catch (error) {
      // 로그인 실패 처리
      if (error.response) {
        const errorMessage = error.response.data ? error.response.data.responseCode : '로그인 실패';
        alert(errorMessage);
      } else {
        alert('로그인 중 오류 발생');
      }
    }
  };

  return (
    <Content>
    <><LoginPageContainer>
      <NavBar />
      <Login>
        {/* Title Wrap */}
        <div className="titleWrap">
          로그인
        </div>

        {/* value Wrap */}
        <div className="valueWrap">
          원활한 서비스 이용을 위해 로그인이 필요해요.
        </div>

        {/* contentWrap - 학번 입력 */}
        <div className="contentWrap">
          <div className="numbertext">
            <div className="inputTitle">학번{" "}
              <input
                type="text"
                placeholder="학번을 입력해주세요."
                maxLength={20}
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)} />
            </div>
          </div>
        </div>

        {/* contentWrap - 비밀번호 입력 */}
        <div className="contentWrap">
          <div className="inputTitle">비밀번호{" "}
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <div>
          <button onClick={handleLogin}>로그인</button>
        </div>
        <p className="join">
          아직 계정이 없으신가요?     <a href="#" onClick={() => { navigate('/signup'); } }>회원가입</a>
        </p>
        <p className="forgot-password">
          비밀번호를 분실했나요? <a href="#" onClick={() => { navigate('/findpassword'); } }>비밀번호 찾기</a>
        </p>
      </Login>
    </LoginPageContainer><Footer /></>
    </Content>
  );
}

export default LoginPage;

const Login = styled.div`
{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #23abeb;
  overflow: hidden;
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
  font-size: 15px;
  font-weight: 700;
  color: #c0c0c0;
}

.contentWrap {
  text-align: center;
  margin-top: 50px;
  flex: 1;
  width: 95%;
}

> div {
  margin-left: 10px;
}

.numbertext {
  padding-left: 25px;
}

input {
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  margin-left: 15px;  
}

button {
  margin: 0 auto;
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

.join {
  text-align: center;
  font-size: 15px;
}

.forgot-password {
  text-align: center;
  font-size: 15px;  
}


`


const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 최소 높이를 화면 높이로 설정하여 Footer가 최하단에 고정되도록 함 */
`;