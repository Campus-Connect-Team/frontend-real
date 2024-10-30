import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import styled from 'styled-components';
import ProfileWarningMessage from '../components/profileEdit/ProfileWarningMessage.jsx';
import ProfileImgChange from '../components/profileEdit/ProfileImgChange.jsx';
import ProfileBefore from '../components/profileEdit/ProfileBefore.jsx';
import ProfileAfter from '../components/profileEdit/ProfileAfter.jsx';
import ProfileEditBtn from '../components/profileEdit/ProfileEditBtn.jsx';

function EditMyPage() {
  return (
    <>
      <NavBar />
      <StyledWrapper>
        <div className="title-wrapper">
          기본 프로필 수정
        </div> 
        {/* <ProfileWarningMessage /> */}
        <ProfileImgChange />
        <ProfileBefore />
        <ProfileAfter />
      </StyledWrapper>
      <Footer />
    </>
  );
}

export default EditMyPage;

const StyledWrapper = styled.div`
  margin-top: 100px;
  height: 100%;

  .title-wrapper {
    font-size: 32px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
`;
