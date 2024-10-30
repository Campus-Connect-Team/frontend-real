// 1차 수정 코드
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import Modal from '../Modal.jsx';
import PossibleBtn from '../board/PossibleBtn.jsx';
import CompleteBtn from '../board/CompleteBtn.jsx';
import ModalChattingDesc from './ModalChattingDesc.jsx';
import ModalLikeDesc from './ModalLikeDesc.jsx';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination as SwiperPagination, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Navigation, SwiperPagination, Scrollbar, A11y]);

const ProductionWrapper = ({ status, comments }) => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLikeModalOpen, setLikeModalOpen] = useState(false);
  const [isHeartActive, setIsHeartActive] = useState(false);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log('accessToken:', accessToken);

        const headers = {
          Authorization: accessToken,
        };

        const config = {
          headers: headers,
        };

        if (boardId) {
          const response = await axios.get(`http://54.198.230.191:8080/boards/${boardId}`, config);

          setBoardData(response.data);
        } else {
          console.error('Board ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBoardData();
  }, [boardId]); 

// 하트 버튼 클릭 핸들러
const toggleHeart = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const url = `http://54.198.230.191:8080/boards/${boardId}/favorite/${isHeartActive ? 'cancel' : 'register'}`;
  try {
    await axios.patch(url, null, {
      headers: {
        Authorization: accessToken
      }
    });

    // 서버에 반영된 데이터를 다시 가져와서 업데이트합니다.
    const response = await axios.get(`http://54.198.230.191:8080/boards/${boardId}`, {
      headers: {
        Authorization: accessToken
      }
    });
    setBoardData(response.data);

    setIsHeartActive(!isHeartActive);
    setLikeModalOpen(false); 

    localStorage.setItem(`heartStatus-${boardId}`, isHeartActive ? 'inactive' : 'active');
  } catch (error) {
    console.error('Error updating favorite status:', error);
  }
};

const handleLogout = () => {
  localStorage.removeItem(`heartStatus-${boardId}`);
};

const logout = () => {
  handleLogout();
};

  useEffect(() => {
    const storedHeartStatus = localStorage.getItem(`heartStatus-${boardId}`);
    if (storedHeartStatus) {
      setIsHeartActive(storedHeartStatus === 'active');
    }
  }, [boardId]);

  return (
    <StyledWrapper>
      {boardData && boardData.boardImages && (
        <Swiper pagination={{ clickable: true }} navigation className="mySwiper">
          {boardData.boardImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="production-info">
        <div className="production-title">{boardData && boardData.title}</div>
        <div className="production-info-box">
          <div className="like-chat-wrapper">
            <div className="like">관심 {boardData && boardData.favoriteCount}</div>
            <div className="chat">댓글 {boardData && boardData.commentCount}</div>
          </div>
          <div className="btn-wrapper">
            <div className="heart-btn"
              style={{ backgroundColor: setBoardData.tradeStatus === '거래 가능' ? '#ff6b00' : '#dedede' }}
              onClick={toggleHeart}>
              <img src={isHeartActive ? '/heart-active.png' : '/heart.png'} alt="Heart" /> {/* 이미지 경로를 동적으로 변경 */}
            </div>
            <div className="production-status"
              style={{
                backgroundColor: boardData && boardData.tradeStatus === '거래 가능' ? '#4181ff' : '#ff6b00',
              }}
            >
              {boardData && boardData.tradeStatus}
            </div>
          </div>
        </div>
        <div className="production-desc">{boardData && boardData.content}</div>
      </div>
      <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
        <ModalChattingDesc setModalOpen={setModalOpen} />
      </Modal>
      <Modal isOpen={isLikeModalOpen} close={() => setLikeModalOpen(false)}>
        <ModalLikeDesc setLikeModalOpen={setLikeModalOpen} isHeartActive={isHeartActive}
          setIsHeartActive={setIsHeartActive} />
      </Modal>
    </StyledWrapper>
  );
};

export default ProductionWrapper;


const StyledWrapper = styled.div`
  width: 400px;

  .swiper {
    width: 400px;
    height: 400px;
    margin-top: 50px;
    border: 2px solid gainsboro;
    border-radius: 10px;
  }

  .swiper-slide {
    width: 400px;
    height: 400px;
    text-align: center;
    font-size: 18px;
    background: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .production-info {
    margin-top: 10px;

    .btn-wrapper {
      display: flex;
      .heart-btn {
        background-color: #dedede;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        margin-right: 10px;

        >img{
          width: 20px;
          height: 20px;
        }
      }
    }

    .production-title {
      font-weight: bold;
      font-size: 20px;
    }

    .production-info-box {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      align-items: center;

      .like-chat-wrapper {
        display: flex;

        .like {
          margin-right: 30px;
          color: #1a1afa;
        }

        .chat {
          color: #1a1afa;
        }
      }

      .production-status {
        background-color: orange;
        padding: 6px 28px;
        border-radius: 8px;
        color: #fff;
      }
    }

    .production-desc {
      margin-top: 20px;
    }

    .kakao-id {
      margin-top: 10px;
    }

    .option-btn {
      display: flex;
      justify-content: space;
    }
  }
`;