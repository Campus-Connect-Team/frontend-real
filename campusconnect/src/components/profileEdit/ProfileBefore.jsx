// import React from 'react';
// import styled from 'styled-components';

// const ProfileBefore = () => {
//   return (
//     <StyledWrapper>
//       <div className="before-title">수정 전 프로필</div>
//       <div className="before-first-section">
//         <div className="label-wrapper">
//           <div className="title-label">단과대학</div>
//           <div className="title-info">IT공과대학</div>
//         </div>
//         <div className="label-wrapper">
//           <div className="title-label">학번</div>
//           <div className="title-info">20210901</div>
//         </div>
//       </div>
//       <div className="before-second-section">
//         <div className="label-wrapper">
//           <div className="title-label">소속 학과(학부)</div>
//           <div className="title-info">정보통신공학과</div>
//         </div>
//         <div className="label-wrapper">
//           <div className="title-label">이름</div>
//           <div className="title-info">김OO</div>
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// };

// export default ProfileBefore;

// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 50px;
//   height: 120px;

//   .before-first-section {
//     padding: 0 115px 0 55px;
//   }

//   .before-first-section, .before-second-section {

//     .label-wrapper {
//       display: flex;
//       justify-content: flex-start;
//       align-items: center;
//       margin-bottom: 20px;
//       //width: 100%;
//       width: 320px;

//       .title-label {
//         color: #9a9a9a;
//         width: 120px;
//         padding: 0 20px;
//         text-align: end;
//       }

//       .title-info {
//         width: 150px;
//       }
//     }
//   }
// `;



// 수정 후 코드 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileBefore = () => {
  const [profile, setProfile] = useState({
    college: '',
    department: '',
    studentNumber: '',
    name: '',
    image: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token is not available');
          return;
        }

        // 토큰 디코딩
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const studentNumber = tokenData.studentNumber;
        if (!studentNumber) {
          console.error('Student number is not available in token');
          return;
        }

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
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <StyledWrapper>
      <div className="before-title">수정 전 프로필</div>
      <div className="before-first-section">
        <div className="label-wrapper">
          <div className="title-label">단과대학</div>
          <div className="title-info">{profile.college}</div>
        </div>
        <div className="label-wrapper">
          <div className="title-label">학번</div>
          <div className="title-info">{profile.studentNumber}</div>
        </div>
      </div>
      <div className="before-second-section">
        <div className="label-wrapper">
          <div className="title-label">소속 학과(학부)</div>
          <div className="title-info">{profile.department}</div>
        </div>
        <div className="label-wrapper">
          <div className="title-label">이름</div>
          <div className="title-info">{profile.name}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ProfileBefore;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  height: 120px;

  .before-first-section {
    padding: 0 115px 0 55px;
  }

  .before-first-section,
  .before-second-section {
    .label-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      //width: 100%;
      width: 320px;

      .title-label {
        color: #9a9a9a;
        width: 120px;
        padding: 0 20px;
        text-align: end;
      }

      .title-info {
        width: 150px;
      }
    }
  }
`;
