import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProfileEditBtn from './ProfileEditBtn'; // ProfileEditBtn 컴포넌트 import

const ProfileAfter = () => {
  const [profile, setProfile] = useState({
    college: '',
    department: '',
    studentNumber: '',
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('접근 토큰을 찾을 수 없습니다.');
          return;
        }

        const tokenData = JSON.parse(atob(token.split('.')[1])); // 토큰 디코딩
        const studentNumber = tokenData.studentNumber;
        if (!studentNumber) {
          console.error('토큰에 학번이 없습니다.');
          return;
        }

        // 프로필 정보 요청
        const response = await axios.get('http://localhost:8080/users/my-page', {
          headers: {
            Authorization: token,
          },
          params: {
            studentNumber,
          },
        });

        setProfile(response.data.basicProfileResponses[0]); 
      } catch (error) {
        console.error('프로필을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchProfile(); // fetchProfile 함수 호출
  }, []); 


  const handleCollegeChange = (e) => {
    setProfile({ ...profile, college: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    setProfile({ ...profile, department: e.target.value });
  };

  const handleNameChange = (e) => {
    setProfile({ ...profile, name: e.target.value });
  };

  return (
    <StyledWrapper>
      <div className="content">
        <div className="after-title">수정 후 프로필</div>
        <div className="after-first-section">
          <div className="label-wrapper">
            <div className="title-label">단과대학</div>
            <input
              className="edit-input"
              value={profile.college} // 프로필 정보에서 대학 정보를 가져와서 값 설정
              onChange={handleCollegeChange} // 값이 변경될 때마다 호출되는 핸들러 지정
            />
          </div>
          <div className="label-wrapper">
            <div className="title-label">학번</div>
            <div>{profile.studentNumber}</div> {/* 프로필 정보에서 학번 정보를 가져와서 출력 */}
          </div>
        </div>
        <div className="after-second-section">
          <div className="label-wrapper">
            <div className="title-label">소속 학과(학부)</div>
            <input
              className="edit-input"
              value={profile.department} // 프로필 정보에서 학과 정보를 가져와서 값 설정
              onChange={handleDepartmentChange} // 값이 변경될 때마다 호출되는 핸들러 지정
            />
          </div>
          <div className="label-wrapper">
            <div className="title-label">이름</div>
            <input
              className="edit-input"
              value={profile.name} // 프로필 정보에서 이름 정보를 가져와서 값 설정
              onChange={handleNameChange} // 값이 변경될 때마다 호출되는 핸들러 지정
            />
          </div>
        </div>
      </div>
      <div className="profile-edit-btn">
        <ProfileEditBtn profile={profile} /> {/* ProfileEditBtn 컴포넌트 호출 */}
      </div>
    </StyledWrapper>
  );
};

export default ProfileAfter;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    width: 100%;
    max-width: 600px;
  }

  .after-title {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center; /* 텍스트를 중앙으로 정렬 */
  }

  .after-first-section, .after-second-section {
    width: 80%;

    .label-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      width: 100%;

      .title-label {
        color: #9a9a9a;
        width: 120px;
        padding: 0 15px;
        text-align: end;
      }

      .edit-input {
        flex: 1;
        height: 30px;
        border: 1px solid black;
        border-radius: 6px;
        padding: 0 8px;
      }
    }
  }

  .profile-edit-btn {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px 0;

    > div {
      background-color: #5b7eef;
      padding: 8px 35px;
      color: #fff;
      border-radius: 6px;
    }
  }
`;
