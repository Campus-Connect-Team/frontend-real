import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import AssignBoardPage from './pages/AssignBoardPage';
import BoardList from './components/board/BoardList';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardPage from './pages/BoardPage';
import EditMyPage from './pages/EditMyPage';
import EditMyPageComplete from './pages/EditMyPageComplete';
import FindPasswordPage from './pages/FindPasswordPage';
import MyPage from './pages/MyPage';
import EditPassword from './pages/EditPassword';
import EditPasswordComplete from './pages/EditPasswordComplete';
import UserWithdrawal from './pages/UserWithdrawal';
import UserWithdrawalComplete from './pages/UserWithdrawalComplete';
import Search from './components/board/Search';
import InterestItem from './components/mypage/InterestItem.jsx';
import EditBoardPage from './pages/EditBoardPage.jsx';
import { SearchProvider } from './components/board/SearchContext.jsx';
// import CommentList from './components/boardDetail/CommentList.jsx';
import Test from './components/boardDetail/CommentList.jsx';
import SellerWrapper from './components/boardDetail/SellerWrapper.jsx';

import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';

function App() {
  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/assignboard" element={<AssignBoardPage />} />
        <Route path="/boarddetail" element={<BoardDetailPage />} />
        <Route path="/boarddetail/:id" element={<BoardDetailPage />} />
        <Route path="/boards/:boardId" element={<BoardDetailPage/>} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/interest" element={<InterestItem />} />
        <Route path="/editmypage" element={<EditMyPage />} />
        <Route path="/board/:boardId/edit" element={<EditBoardPage/>} />
        <Route path="/editmypagecomplete" element={<EditMyPageComplete />} />
        <Route path="/findpassword" element={<FindPasswordPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/editpassword" element={<EditPassword />} />
        <Route path="/editpasswordcomplete" element={<EditPasswordComplete />} />
        <Route path="/userwithdrawal" element={<UserWithdrawal />} />
        <Route path="/userwithdrawalcomplete" element={<UserWithdrawalComplete />} />
        <Route path="/search" element={<Search onSearch={setFilteredPosts} />} />
        <Route path="/boardlist" element={<BoardList boardData={filteredPosts} />} />
        <Route path="/board/:boardId" element={<BoardDetailPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/boardlist" element={<BoardList />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
