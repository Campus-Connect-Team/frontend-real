import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

function MainPage() {
  return (
    <div>
      <NavBar />
      <StyledImage src="https://campus-connect-backend.s3.ap-northeast-2.amazonaws.com/mainLogo.png" alt="Main Page Image" />
      <Footer />
    </div>
  );
}

export default MainPage;  