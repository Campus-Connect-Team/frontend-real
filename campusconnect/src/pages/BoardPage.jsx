import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Search from '../components/board/Search';
import BoardList from '../components/board/BoardList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 최소 높이를 화면 높이로 설정하여 Footer가 최하단에 고정되도록 함 */
`;

const Content = styled.div`
  flex: 1; /* Content가 컨테이너의 남은 공간을 모두 차지하도록 설정 */
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  font-size: 30px;
  font-weight: 900;
`;

function BoardPage() {
  return (
    <Container>
      <NavBar />
      <Title>거래 게시판</Title>
      <Content>
      {/* <Search /> */}
      <BoardList />
      </Content>
      <Footer />
    </Container> 
  );
}

export default BoardPage; 
