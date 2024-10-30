
// 1차 수정
import { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Profile from '../components/mypage/Profile';
import EvalScore from '../components/mypage/EvalScore';
import InterestItem from '../components/mypage/InterestItem';
import ChatList from '../components/mypage/ChatList';
import PostList from '../components/mypage/PostList';
import DeleteAccountBtn from '../components/mypage/DeleteAccountBtn';
import SellerRating from '../components/mypage/modal/SellerRating';
import BuyerRating from '../components/mypage/modal/BuyerRating';
import BoardDelete from '../components/mypage/modal/BoardDelete';
import InterestListOff from '../components/mypage/modal/InterestListOff';
import Footer from '../components/Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MyPageContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  flex-grow: 1;
`;

function MyPage() {
  const [isSellerRatingOpen, setIsSellerRatingOpen] = useState(false); // 판매자 평가 모달
  const [isBuyerRatingOpen, setIsBuyerRatingOpen] = useState(false); // 구매자 평가 모달
  const [isBorderDeleteOpen, setIsBorderDeleteOpen] = useState(false); // 게시판 삭제 모달
  const [isInterestListOffOpen, setIsInterestListOffOpen] = useState(false); // 관심 목록 삭제 모달

  const openSellerRating = () => {
    setIsSellerRatingOpen(true);
  };

  const closeSellerRating = () => {
    setIsSellerRatingOpen(false);
  };

  const openBuyerRating = () => {
    setIsBuyerRatingOpen(true);
  };

  const closeBuyerRating = () => {
    setIsBuyerRatingOpen(false);
  };

  const openBoardDelete = () => {
    setIsBorderDeleteOpen(true);
  };

  const closeBoardDelete = () => {
    setIsBorderDeleteOpen(false);
  };

  const openInterestListOff = () => {
    setIsInterestListOffOpen(true);
  };

  const closeInterestListOff = () => {
    setIsInterestListOffOpen(false);
  };

  return (
    <>
      {isSellerRatingOpen && <SellerRating onClose={closeSellerRating} />}
      {isBuyerRatingOpen && <BuyerRating onClose={closeBuyerRating} />}
      {isBorderDeleteOpen && <BoardDelete onClose={closeBoardDelete} />}
      {isInterestListOffOpen && <InterestListOff onClose={closeInterestListOff} />}

      <NavBar />
      <AppContainer>
        <MyPageContainer>
          <h1>마이 페이지</h1>
          <Profile />
          {/* <EvalScore openSellerRating={openSellerRating} /> */}
          <InterestItem openInterestListOff={openInterestListOff} />
          {/* <ChatList /> */}
          <PostList openBoardDelete={openBoardDelete} />
          <DeleteAccountBtn />
        </MyPageContainer>
        <Footer />
      </AppContainer>
    </>
  );
}

export default MyPage;
