// import React from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// const ProfileEditBtn = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/editmypagecomplete');
//   };

//   return (
//     <StyledWrapper onClick={handleClick}>
//       <div>프로필 수정</div>
//     </StyledWrapper>
//   );
// };

// export default ProfileEditBtn;

// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 40px 0;
//   cursor: pointer;
  
//   > div {
//     background-color: #5b7eef;
//     padding: 8px 35px;
//     color: #fff;
//     border-radius: 6px;
//     display: inline-flex;
//   }
// `;




// 수정 후 코드
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileEditBtn = ({ profile }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (!profile) {
        console.error('프로필 정보가 없습니다.');
        return;
      }
  
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

      const formData = new FormData(); // FormData 객체 생성

      // 프로필 정보를 FormData에 추가
      const editData = {
        college: profile.college,
        department: profile.department,
        name: profile.name,
      };

      formData.append(
        'request',
        new Blob([JSON.stringify(editData)], {
          type: 'application/json',
        }),
      );

      if (profile.image) {
        formData.append('image', profile.image); // 선택적으로 이미지 추가
      }

      // 프로필 정보 수정 요청
      const response = await axios.patch(
        `http://54.198.230.191:8080/users/my-page/basic/${studentNumber}`,
        formData, // 멀티파트 폼 데이터 전송
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data', // 멀티파트 폼 데이터 형식 설정
          },
        }
      );

      console.log('프로필 수정 완료:', response.data);

      // 프로필 수정 완료 페이지로 이동
      localStorage.setItem('department', profile.department);
      localStorage.setItem('name', profile.name );
      navigate('/editmypagecomplete');
    } catch (error) {
      console.error('프로필 수정 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <StyledWrapper onClick={handleClick}>
      <div>프로필 수정</div>
    </StyledWrapper>
  );
};

export default ProfileEditBtn;


const StyledWrapper = styled.div`
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
`;
