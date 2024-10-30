import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const EditSoftwareView = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tradeStatus, setTradeStatus] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        fetchBoardData();
    }, []);

    const fetchBoardData = async () => {
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
            const response = await axios.get(`http://54.198.230.191:8080/boards/${boardId}`, {
                headers: {
                    Authorization: token
                }
            });

            const { title, content, tradeStatus, images } = response.data;

            setTitle(title);
            setContent(content);
            setTradeStatus(tradeStatus === '거래 완료');
            setSelectedImages(images.map(image => ({
                url: image,
                file: null
            })));
        } catch (error) {
            console.error('Error fetching board data:', error);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') setTitle(value);
        if (name === 'content') setContent(value);
    };

    const handleTradeStatusChange = (e) => {
        setTradeStatus(e.target.checked);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prevImages => [
            ...prevImages,
            ...files.map(file => ({ file }))
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tradeStatus) {
            const confirmUpdate = window.confirm('거래 완료로 게시글을 수정할 경우 이후부터 게시글을 수정 및 삭제할 수 없습니다. 수정하시겠습니까?');
            if (!confirmUpdate) {
                return;
            }
        }

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
            const formData = new FormData();
            const requestObject = {
                title,
                content,
                tradeStatus: tradeStatus ? '거래 완료' : undefined,
                studentNumber
            };
            formData.append('request', new Blob([JSON.stringify(requestObject)], { type: 'application/json' }));

            selectedImages.forEach(({ file }) => {
                if (file) {
                    formData.append('image', file);
                }
            });

            console.log('폼 데이터:', ...formData.entries());

            const response = await axios.patch(`http://54.198.230.191:8080/boards/${boardId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            });

            if (response.status === 200) {
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate('/board');
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 수정 중 오류 발생:', error);
            if (error.response && error.response.status === 400) {
                alert(error.response.data.responseCode)
            } else {
                alert('게시글 수정 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <>
            <NavBar />
            <StyledWrapper>
                <section className="sub_wrap">
                    <article className="s_cnt mp_pro_li ct1">
                        <div className="li_top">
                            <div className="title">상품 게시글 수정</div>
                        </div>

                        <div className="bo_w re1_wrap re1_wrap_writer">
                            <form onSubmit={handleSubmit}>
                                <div className="input-wrapper">
                                    <label htmlFor="title">제목</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="content">내용</label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={content}
                                        onChange={handleInputChange}
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="tradeStatus">
                                        <input
                                            type="checkbox"
                                            id="tradeStatus"
                                            name="tradeStatus"
                                            checked={tradeStatus}
                                            onChange={handleTradeStatusChange}
                                        />
                                        거래 완료
                                    </label>
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="images">상품 이미지 업로드 (최대 10장까지 업로드 가능)</label>
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                    <div className="image-preview">
                                        {selectedImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.url || URL.createObjectURL(image.file)}
                                                alt="preview"
                                                width="100"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="button-wrapper">
                                    <button type="submit">게시글 수정</button>
                                    <Link to={'/board'} className="cancel-link">
                                        <button type="button">수정 취소</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </article>
                </section>
            </StyledWrapper>
            <Footer />
        </>
    );
};

export default EditSoftwareView;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 100vh;

    .title {
        font-size: 35px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: 30px;
    }

    .input-wrapper {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        
        label {
            padding-bottom: 5px;
            font-weight: bold;
        }

        input,
        textarea {
            width: 500px;
            border-radius: 10px;
            padding: 10px;
            border: 1px solid black;
            margin-bottom: 10px;
        }

        textarea {
            resize: none;
        }
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
        gap: 10px;

        button {
            background-color: #5b7eef;
            padding: 10px 35px;
            color: #fff;
            border-radius: 10px;
            font-size: 12px;
            cursor: pointer;
        }

        .cancel-link {
            text-decoration: none;

            button {
                background-color: #ccc;
                cursor: pointer;
            }
        }
    }

    .footer {
        margin-top: auto;
    }

    .image-preview {
        display: flex;
        gap: 10px;
        img {
            border: 1px solid #ccc;
            padding: 5px;
            border-radius: 5px;
        }
    }
`;
