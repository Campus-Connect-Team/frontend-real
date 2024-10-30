// 3차 수정 코드
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 900;
`;

const BoxContainer = styled.div`
  width: 100%;
  height: 13rem;
  border: 1px solid #504e4e;
  border-radius: 5px;
  padding: 5px;
  font-size: 1rem;
  position: relative;
`;

const List = styled.div`
  width: 95%;
  height: 80%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  font-size: 1rem;
`;

const NoPostsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: red;
  font-weight: bold;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d9d9;
`;

const PosibleText = styled.div`
  color: ${props => props.isTradeCompleted ? '#ff6b00' : '#4181FF'};
  font-weight: 600;
`;

const BtnWrapper = styled.div`
  width: 16rem;
  display: flex;
  justify-content: space-between;
`;

const EditBtn = styled.button`
  border: none;
  width: 7rem;
  height: 1.8rem;
  background-color: #4181ff;
  border-radius: 5px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const DeleteBtn = styled.button`
  border: none;
  width: 7rem;
  height: 1.8rem;
  background-color: red;
  border-radius: 5px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

function PostList() {
  const [createdBoardList, setCreatedBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token is not available');
      return;
    }

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const studentNumber = tokenData.studentNumber;
    if (!studentNumber) {
      console.error('Student number is not available in token');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/my-page`, {
          headers: {
            Authorization: token,
          },
          params: {
            studentNumber,
          },
        });

        const createdBoardList = response.data.createdBoardListResponses;
        setCreatedBoardList(createdBoardList);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (boardId) => {
    const confirmDelete = window.confirm('한 번 삭제된 게시글은 복구할 수 없습니다. 해당 게시글을 삭제하시겠습니까?'); 

    const boardToEdit = createdBoardList.find(board => board.boardId === boardId);
    if (boardToEdit.tradeStatus === '거래 완료') {
      window.alert('거래 완료된 게시글은 삭제할 수 없습니다.');
    } 

    if (confirmDelete) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token is not available');
          return;
        }

        await axios.delete(`http://localhost:8080/boards/${boardId}`, {
          headers: {
            Authorization: token,
          },
        });

        // 삭제 후 목록에서 제거
        setCreatedBoardList((prevList) =>
          prevList.filter((board) => board.boardId !== boardId)
        );
        window.alert('선택한 게시글이 정상적으로 삭제되었습니다.');
      } catch (error) {
        console.error('Error occurred while deleting the board:', error);
      }
    }
  };

  const handleTitleClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handleEdit = (boardId) => {
    const boardToEdit = createdBoardList.find(board => board.boardId === boardId);
    if (boardToEdit.tradeStatus === '거래 완료') {
      window.alert('거래 완료된 게시글은 수정할 수 없습니다.');
    } else {
      navigate(`/board/${boardId}/edit`);
    }
  };

  return (
    <Wrapper>
      <Title>작성한 게시글</Title>
      <BoxContainer>
        <List>
          {createdBoardList.length > 0 ? (
            createdBoardList.map((board, index) => (
              <ListItem key={index}>
                <PosibleText isTradeCompleted={board.tradeStatus === '거래 완료'}>{board.tradeStatus === '거래 가능' ? '[거래 가능]' : '[거래 완료]'}</PosibleText>
                <div onClick={() => handleTitleClick(board.boardId)}>{board.boardTitle}</div>
                <BtnWrapper>
                  <EditBtn type="button" onClick={() => handleEdit(board.boardId)}>수정하기</EditBtn>
                  <DeleteBtn onClick={() => handleDelete(board.boardId)} type="button">삭제하기</DeleteBtn>
                </BtnWrapper>
              </ListItem>
            ))
          ) : (
            <NoPostsMessage>작성된 게시글이 없습니다.</NoPostsMessage>
          )}
        </List>
      </BoxContainer>
    </Wrapper>
  );
}

export default PostList;
