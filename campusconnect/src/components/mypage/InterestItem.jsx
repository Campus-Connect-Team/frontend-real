// 2차 수정
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserIcon from '../../assets/UserIcon.png';

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

const NoInterestItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: red;
  font-weight: bold;
`;

const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 30px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d9d9;
`;

const ListTitle = styled.span`
  font-weight: 800;
  color: #007aff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TransBtn = styled.div`
  color: ${props => (props.status === '거래 가능' ? '#4181ff' : '#ff6b00')};
  font-weight: 600;
`;

const DeleteBtn = styled.button`
  border: none;
  width: 7rem;
  height: 1.8rem;
  background-color: #ff5e8e;
  border-radius: 5px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

function InterestItem({ openInterestListOff }) {
  const [interestItems, setInterestItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterestItems = async () => {
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

      try {
        const response = await axios.get(`http://54.198.230.191:8080/users/my-page`, {
          headers: {
            Authorization: token
          },
          params: {
            studentNumber,
          },
        });
        console.log('Fetched interest items:', response.data); 
        console.log(interestItems);
        setInterestItems(response.data.myFavoriteListResponses);
      } catch (error) {
        console.error('Error fetching interest items:', error);
      }
    };

    fetchInterestItems();
  }, []); 

  const handleDelete = async (boardId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token is not available');
      return;
    }

    try {
      await axios.patch(`http://54.198.230.191:8080/boards/${boardId}/favorite/cancel`, null, {
        headers: {
          Authorization: token
        }
      });

      // 관심상품 목록에서 해당 아이템 제거
      setInterestItems(prevItems => prevItems.filter(item => item.boardId !== boardId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleItemClick = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <Wrapper>
      <Title>관심 상품</Title>

      <BoxContainer>
        <List>
          {interestItems.length > 0 ? (
            interestItems.map(item => (
              <ListItem key={item.boardId}>
                <TransBtn status={item.tradeStatus}>[{item.tradeStatus}]</TransBtn>
                <UserImg src={item.sellerImage || UserIcon} alt="프로필 사진" />
                <ListTitle onClick={() => navigate(`/boards/${item.boardId}`)}>{item.boardTitle}</ListTitle>
                <div>{`${item.sellerDepartment} / ${item.sellerName}`}</div>
              </ListItem>
            ))
          ) : (
            <NoInterestItems>관심 상품이 없습니다.</NoInterestItems>
          )}
        </List>
      </BoxContainer>
    </Wrapper>
  );
}

export default InterestItem;
