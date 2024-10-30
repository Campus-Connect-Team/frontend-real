// 2차 수정 코드 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

class SoftwareView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            selectedImages: [],
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        this.setState({
            selectedImages: files,
        });
    };

    handleSubmit = async (e) => {

        e.preventDefault();
        const { title, content, selectedImages } = this.state;

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('접근 토큰을 찾을 수 없습니다.');
                alert('로그인 후 게시글을 작성할 수 있습니다.');
                return;
            }

            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const studentNumber = tokenData.studentNumber;
            if (!studentNumber) {
                console.error('토큰에 학번이 없습니다.');
                alert('유효하지 않은 접근입니다.');
                return;
            }

            const profile = { studentNumber }; 
            if (!profile) {
                console.error('프로필 정보가 없습니다.');
                return;
            }

            const formData = new FormData();
            const requestObject = {
                title,
                content,
                studentNumber
            };
            formData.append('request', new Blob([JSON.stringify(requestObject)], { type: "application/json" }));

            selectedImages.forEach((image, index) => {
                formData.append('image', image); 
            });

            console.log('폼 데이터:', ...formData.entries());

            const response = await axios.post("http://localhost:8080/boards", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`
                }
            });

            if (response.status === 200) {
                alert('게시글이 성공적으로 작성되었습니다.');
                window.location.href = '/board'; // 리다이렉션
            } else {
                alert('게시글 작성에 실패했습니다.');
            }
        } catch (error) {
            console.error('게시글 작성 중 오류 발생:', error);
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
    };

    render() {
        const { title, content } = this.state;

        return (
            <>
                <NavBar />
                <StyledWrapper>
                    <section className="sub_wrap">
                        <article className="s_cnt mp_pro_li ct1">
                            <div className="li_top">
                                <div className="title">상품 게시글 작성</div>
                            </div>

                            <div className="bo_w re1_wrap re1_wrap_writer">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-wrapper">
                                        <label htmlFor="title">제목</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="content">내용</label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={content}
                                            onChange={this.handleInputChange}
                                            rows="5"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="images">상품 이미지 업로드 (최대 10장까지 업로드 가능)</label>
                                        <input
                                            type="file"
                                            id="images"
                                            name="images"
                                            accept="image/*"
                                            multiple
                                            onChange={this.handleImageChange}
                                            required
                                        />
                                    </div>
                                    <div className="button-wrapper">
                                        <button type="submit">게시글 작성</button> <Link to={'/board'} className="cancel-link">
                                            <button type="button">작성 취소</button>
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
    }
}

export default SoftwareView;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  // 전체 중앙 정렬
    padding: 20px;  // 상하좌우 패딩 적용
    min-height: 100vh; /* 페이지 최소 높이를 브라우저 높이와 같도록 설정 */

    .title {
        font-size: 30px;
        font-weight: bold;
        display: flex;
        justify-content: center;  // 제목을 중앙에 정렬
        margin-bottom: 35px;
        margin-top: 30px;
    }

    .input-wrapper {
        margin-bottom: 30px;  // 각 입력 필드 사이의 간격
        display: flex;
        flex-direction: column;
        align-items: center;  // 입력 필드를 중앙 정렬
        width: 100%;  // 부모 요소의 전체 너비를 사용

        label {
            padding-bottom: 5px;  // 레이블과 입력 필드 사이의 간격
            font-weight: bold;  // 레이블 텍스트 굵게
        }

        input,
        textarea {
            width: 500px;  // 입력 필드의 너비
            border-radius: 10px;
            padding: 10px;
            border: 1px solid black;
            margin-bottom: 10px;  // 각 입력 필드 간격 추가
        }

        textarea {
            resize: none;
        }
    }

    .button-wrapper {
        display: flex;
        justify-content: center;  // 버튼들을 중앙에 정렬
        gap: 10px;  // 버튼들 사이의 간격

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
        margin-top: auto; /* Footer를 항상 페이지의 하단에 고정 */
    }
    `;







