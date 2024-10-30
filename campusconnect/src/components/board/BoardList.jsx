// 2차 수정 코드
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CompleteBtn from './CompleteBtn';
import PossibleBtn from './PossibleBtn';

const Container = styled.div`
  margin: 3% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 35px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4181ff;
  color: #fff;
  cursor: pointer;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row;
  gap: 40px 10px;
`;

const GridItems = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImg = styled.img`
  width: 12rem;
  height: 11rem;
  border: 1px solid #000;
  border-radius: 5px;
`;

const MainContent = styled.div`
  font-size: 1.1rem;
  font-weight: 900;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const UserContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const UserProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  font-weight: 700;
`;

const LikeContainer = styled.div`
  width: 32%;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #12348d;
  margin-top: 0.5rem;
`;

const BoardList = () => {
  const [boardData, setBoardData] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const [department, setDepartment] = useState('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          Authorization: accessToken,
        };
        const config = {
          headers: headers,
        };
        const response = await axios.get('http://localhost:8080/boards', config);
        setBoardData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBoardData();
  }, []);

  useEffect(() => {
    const filteredBoards = boardData.filter(board => {
      const departmentMatch = board.department.toLowerCase().includes(department.toLowerCase());
      const titleMatch = board.title.toLowerCase().includes(keyword.toLowerCase());
      return departmentMatch && titleMatch;
    });
    setFilteredBoardData(filteredBoards);
  }, [boardData, department, keyword]);

  const handleTitleClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleCreatePost = () => {
    navigate('/assignboard');
  };

  return (
    <Container>
      <SearchContainer>
        <Label>학과(학부)</Label>
        <Input type="text" value={department} onChange={handleDepartmentChange} />
        <Label>키워드</Label>
        <Input type="text" value={keyword} onChange={handleKeywordChange} />
        <Button onClick={handleCreatePost}>게시글 작성</Button>
      </SearchContainer>
      <GridContainer>
        {filteredBoardData.map((board, index) => (
          <GridItems key={index}>
            <MainImg src={board.representativeImage} alt="" />
            <MainContent onClick={() => handleTitleClick(board.boardId)}>{board.title}</MainContent>
            <UserContainer>
              <UserProfileImage src={board.userProfileImage} alt="User Profile" />
              <UserInfo>
                <span>{board.department}</span>
                <span>{board.name}</span>
              </UserInfo>
            </UserContainer>
            <LikeContainer>
              <span>관심 {board.favoriteCount}</span>
              <span>댓글 {board.commentCount}</span>
            </LikeContainer>
            {board.tradeStatus === '거래 완료' ? <CompleteBtn /> : <PossibleBtn />}
          </GridItems>
        ))}
      </GridContainer>
    </Container>
  );
};

export default BoardList;
