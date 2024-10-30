import styled from 'styled-components';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import EditPassWordTitle from '../components/editPassword/EditPassWordTitle.jsx';
import EditPasswordForm from '../components/editPassword/EditPasswordForm.jsx';

function EditPassword() {
  return <>
    <NavBar />
    <StyledWrapper>
      <EditPassWordTitle />
      <EditPasswordForm />
    </StyledWrapper>
    <Footer />
  </>;
}

export default EditPassword;

const StyledWrapper = styled.div`
  margin-top: 100px;
  height: 100%;
`;
