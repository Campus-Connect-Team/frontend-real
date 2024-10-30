// 1차 재수정 코드 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const StyledWrapper = styled.div`
  margin-top: 50px;
  margin-left: 80px;

  .seller-title {
    margin-bottom: 10px;
    color: Gray;
    font-size: 1rem;
    font-weight: medium;
  }

  .seller-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: medium;

    .name {
      font-size: 1rem;
      font-weight: medium;
      margin-bottom: 3px;
    }

    .info {
      font-size: 14px;
      color: #007aff;
    }

    > img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  .created-at {
    font-size: 1rem;
    color: #000;
  }

  .date-title {
    color: Gray
  }
`;

const SellerWrapper = () => {
  const { boardId } = useParams();
  const [sellerInfo, setSellerInfo] = useState({
    department: '',
    name: '',
    profileImage: '',
    createdAt: '',
  });

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log('accessToken:', accessToken);

        const headers = {
          Authorization: accessToken,
        };

        const config = {
          headers: headers, 
        };

        // boardId가 존재하는 경우에만 API 호출
        if (boardId) {
          const response = await axios.get(`http://localhost:8080/boards/${boardId}`, config);
          const { department, name, createdAt, image } = response.data;
          setSellerInfo({
            department,
            name,
            profileImage: image,
            createdAt: formatDateToLocal(createdAt),
          });
          
        } else {
          console.error('Board ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching seller info:', error);
      }
    };

    fetchSellerInfo();
  }, [boardId]);

  const formatDateToLocal = (dateString) => {
    const utcDate = new Date(dateString + 'Z'); // 'Z'를 추가하여 UTC로 인식하게 함
    return utcDate.toLocaleString('ko-KR', { 
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <StyledWrapper>
      <div className="seller-title">판매자 정보</div>
      <div className="seller-info">
        <img src={sellerInfo.profileImage} alt="Seller Profile" />
        <div>
          <div className="department">{sellerInfo.department}</div>
          <div className="name">{sellerInfo.name}</div>
        </div>
      </div>
      <div className="created-at">
        <span className="date-title">게시글 작성일자</span> <br /> {sellerInfo.createdAt}
      </div>
    </StyledWrapper>
  );
};

export default SellerWrapper;

