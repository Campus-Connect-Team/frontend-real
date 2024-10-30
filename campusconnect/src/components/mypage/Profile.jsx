// 수정 코드
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../assets/UserIcon.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2.5rem;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 30px;
  margin-right: 1rem;
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
`;

const InfoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoDetailTitle = styled.span`
  font-size: 1.2rem;
  margin: 6px 0;
  color: #959494;
`;

const InfoDetailText = styled.span`
  font-size: 1.2rem;
  margin: 6px 0;
`;

const Button = styled.button`
  width: 8rem;
  height: 1.8rem;
  background-color: #4181ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.7rem;

  &:hover {
    cursor: pointer;
  }
`;

function Profile() {
  const [profile, setProfile] = useState({
    college: '',
    department: '',
    studentNumber: '',
    name: '',
    email: '',
    image: '',
  });
  const navigate = useNavigate();

  console.log(profile.image);

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

        const response = await axios.get('http://54.198.230.191:8080/users/my-page', {
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

  const handleProfileEdit = () => {
    navigate('/editmypage'); // 프로필 수정 페이지로 이동
  };

  const handlePasswordChange = () => {
    navigate('/editpassword'); // 비밀번호 변경 페이지로 이동
  };

  return (
    <Wrapper>
      <ImgContainer>
        <ProfileImg src={profile.image || UserIcon} alt="프로필 이미지" />
      </ImgContainer>
      <InfoContainer>
        <InfoDetailContainer>
          <InfoDetailTitle>단과대학</InfoDetailTitle>
          <InfoDetailTitle>학번</InfoDetailTitle>
          <InfoDetailTitle>이메일</InfoDetailTitle>
        </InfoDetailContainer>
        <InfoDetailContainer>
          <InfoDetailText>{profile.college}</InfoDetailText>
          <InfoDetailText>{profile.studentNumber}</InfoDetailText>
          <InfoDetailText>{profile.email}</InfoDetailText>
        </InfoDetailContainer>
      </InfoContainer>
      <InfoContainer>
        <InfoDetailContainer>
          <InfoDetailTitle>소속 학과(학부)</InfoDetailTitle>
          <InfoDetailTitle>이름</InfoDetailTitle>
        </InfoDetailContainer>
        <InfoDetailContainer>
          <InfoDetailText>{profile.department}</InfoDetailText>
          <InfoDetailText>{profile.name}</InfoDetailText>
        </InfoDetailContainer>
      </InfoContainer>
      <InfoDetailContainer>
        <Button type="button" onClick={handleProfileEdit}>프로필 수정</Button>
        <Button type="button" onClick={handlePasswordChange}>비밀번호 변경</Button>
      </InfoDetailContainer>
    </Wrapper>
  );
}

export default Profile;





