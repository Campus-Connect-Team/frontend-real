// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ProfileImgChange = () => {
//   const [imageSrc, setImageSrc] = useState('/default.png'); // State to store the image source

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImageSrc(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <StyledWrapper>
//       <div className="profile-title">프로필 이미지</div>
//       <div className="profile-img">
//         <img src={imageSrc} alt="Profile" />
//         <div className="profile-img-warning">.jpg 또는 .png 계열 이미지만 업로드해 주세요.</div>
//       </div>
//       <label className="profile-change-btn">
//         사진 변경
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={handleImageChange}
//           style={{ display: 'none' }} // Hide the actual file input element
//         />
//       </label>
//     </StyledWrapper>
//   );
// };

// export default ProfileImgChange;

// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 100px;

//   .profile-title {
//     color: #9a9a9a;
//   }

//   .profile-img {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     > img {
//       width: 80px;
//       height: 80px;
//       border-radius: 100%;
//       margin-bottom: 10px;
//     }

//     .profile-img-warning {
//       font-size: 14px;
//       color: red;
//       font-weight: 600;
//     }
//   }

//   .profile-change-btn {
//     background-color: #5b7eef;
//     padding: 8px 35px;
//     color: #fff;
//     border-radius: 6px;
//     cursor: pointer; 
//     position: relative; 
//   }
// `;


// 수정 후 코드
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// const ProfileImgChange = () => {
//   const [imageSrc, setImageSrc] = useState('/default.png'); // 이미지 소스를 저장하는 상태
//   const [profile, setProfile] = useState({}); // 프로필 정보를 저장하는 상태

//   // 이미지 변경 이벤트 핸들러
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImageSrc(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // 컴포넌트가 마운트될 때 프로필 정보를 가져오는 함수
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (!token) {
//           console.error('접근 토큰을 찾을 수 없습니다.');
//           return;
//         }

//         const tokenData = JSON.parse(atob(token.split('.')[1])); // 토큰 디코딩
//         const studentNumber = tokenData.studentNumber;
//         if (!studentNumber) {
//           console.error('토큰에 학번이 없습니다.');
//           return;
//         }

//         // 프로필 정보 요청
//         const response = await axios.get('http://15.165.91.27:8080/users/my-page', {
//           headers: {
//             Authorization: token,
//           },
//           params: {
//             studentNumber,
//           },
//         });

//         setProfile(response.data.basicProfileResponses[0]); // 받아온 프로필 정보 상태 업데이트
//       } catch (error) {
//         console.error('프로필을 가져오는 중 오류가 발생했습니다:', error);
//       }
//     };

//     fetchProfile(); // fetchProfile 함수 호출
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

//   return (
//     <StyledWrapper>
//       <div className="profile-title">프로필 이미지</div>
//       <div className="profile-img">
//         <img src={imageSrc} alt="Profile" />
//         <div className="profile-img-warning">.jpg 또는 .png 계열 이미지만 업로드해 주세요.</div>
//       </div>
//       <label className="profile-change-btn">
//         사진 변경
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={handleImageChange}
//           style={{ display: 'none' }} // 실제 파일 입력 요소를 숨김
//         />
//       </label>
//     </StyledWrapper>
//   );
// };

// export default ProfileImgChange;

// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 100px;

//   .profile-title {
//     color: #9a9a9a;
//   }

//   .profile-img {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     > img {
//       width: 80px;
//       height: 80px;
//       border-radius: 100%;
//       margin-bottom: 10px;
//     }

//     .profile-img-warning {
//       font-size: 14px;
//       color: red;
//       font-weight: 600;
//     }
//   }

//   .profile-change-btn {
//     background-color: #5b7eef;
//     padding: 8px 35px;
//     color: #fff;
//     border-radius: 6px;
//     cursor: pointer; 
//     position: relative; 
//   }
// `;




// 2차 재수정 코드
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProfileImgChange = () => {
  const [imageSrc, setImageSrc] = useState(); // 이미지 소스를 저장하는 상태
  const [profile, setProfile] = useState({}); // 프로필 정보를 저장하는 상태

  // 이미지 변경 이벤트 핸들러
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profileImage', file);

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

        await axios.patch(`http://54.198.230.191:8080/users/my-page/${studentNumber}/profile-image`, formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        });

        // 프로필 정보 다시 가져오기
        fetchProfile();
      } catch (error) {
        console.error('프로필 이미지를 업데이트하는 중 오류가 발생했습니다:', error);
      }
    }
  };

  // 컴포넌트가 마운트될 때 프로필 정보를 가져오는 함수
  useEffect(() => {
    fetchProfile();
  }, []);

  // 프로필 정보를 가져오는 함수
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('접근 토큰을 찾을 수 없습니다.');
        return;
      }

      const tokenData = JSON.parse(atob(token.split('.')[1])); 
      const studentNumber = tokenData.studentNumber;
      if (!studentNumber) {
        console.error('토큰에 학번이 없습니다.');
        return;
      }

      // 프로필 정보 요청
      const response = await axios.get(`http://54.198.230.191:8080/users/my-page`, {
        headers: {
          Authorization: token,
        },
        params: {
          studentNumber,
        },
      });

      setProfile(response.data.basicProfileResponses[0]); // 받아온 프로필 정보 상태 업데이트
      setImageSrc(response.data.basicProfileResponses[0].userProfileImage || '/default.png'); // 이미지 소스 상태 업데이트
    } catch (error) {
      console.error('프로필을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <StyledWrapper>
      <div className="profile-title">프로필 이미지</div>
      <div className="profile-img">
        <img src={imageSrc} alt="Profile" />
        <div className="profile-img-warning">.jpg 또는 .png 계열 이미지만 업로드해 주세요.</div>
      </div>
      <label className="profile-change-btn">
        사진 변경
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          style={{ display: 'none' }} // 실제 파일 입력 요소를 숨김
        />
      </label>
    </StyledWrapper>
  );
};

export default ProfileImgChange;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;

  .profile-title {
    color: #9a9a9a;
  }

  .profile-img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin-bottom: 10px;
    }

    .profile-img-warning {
      font-size: 14px;
      color: red;
      font-weight: 600;
    }
  }

  .profile-change-btn {
    background-color: #5b7eef;
    padding: 8px 35px;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  }
`;

