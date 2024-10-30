import NavBar from '../components/NavBar';
import styled from 'styled-components';
import FindPassWordTitle from '../components/findPassword/FindPassWordTitle.jsx';
import FindPasswordForm from '../components/findPassword/FindPasswordForm.jsx';
import Footer from '../components/Footer.jsx';

function FindPasswordPage() {
  return (
    <>
      <NavBar />
      <StyledWrapper>
        <FindPassWordTitle />
        <FindPasswordForm/>
      </StyledWrapper>
      <Footer/>
    </>
  );
}

export default FindPasswordPage;


const StyledWrapper = styled.div`
  margin-top: 100px;
  height: 100%;
`;
