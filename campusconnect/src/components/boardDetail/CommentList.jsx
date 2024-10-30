// 5차 수정 코드
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommentList = ({ updateComment, deleteComment }) => {
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const maxLength = 100;
  const { boardId } = useParams();
  const token = localStorage.getItem('accessToken');
  const name = localStorage.getItem('name');
  const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const studentNumber = tokenData ? tokenData.studentNumber : null;

  useEffect(() => {
    fetchComments();
  }, [boardId, studentNumber]);

  const fetchComments = async () => {
    if (!token) {
      console.error('Access token is not available');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/boards/${boardId}/comments`, {
        headers: {
          Authorization: token
        }
      });
      const fetchedComments = Array.isArray(response.data.boardCommentResponses) ? response.data.boardCommentResponses.map(comment => ({
        ...comment,
        isAuthor: comment.commenterName === name // 작성자의 학번과 토큰의 학번 비교
      })) : [];
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const addComment = async (text) => {
    if (!token) {
      console.error('Access token is not available');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/boards/${boardId}/comments`,
        { commentContent: text },
        {
          headers: {
            Authorization: token
          }
        }
      );
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  const handleUpdate = async (id) => {
    if (!token) {
      console.error('Access token is not available');
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8080/boards/${boardId}/comments/${id}`,
        { commentUpdateContent: text },
        {
          headers: {
            Authorization: token
          }
        }
      );
      fetchComments();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      console.error('Access token is not available');
      return;
    }

    try {
      if (window.confirm('선택한 댓글을 삭제하시겠습니까?')) {
        await axios.delete(`http://localhost:8080/boards/${boardId}/comments/${id}`, {
          headers: {
            Authorization: token
          }
        });
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDateToLocal = (dateString) => {
    const utcDate = new Date(dateString + 'Z');
    return utcDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };

  return (
    <CommentContainer>
      <Header>댓글 {comments.length} </Header>
      <CommentForm onSubmit={addComment} />
      <CommentsList>
        {comments.map((comment, index) => (
          <div key={index}>
            <CommentHeader>
              <CommentAuthor>
                <img src={comment.commenterProfileImage} alt="profile" />
                <div className="class">{comment.commenterDepartment}</div>
                <div>{comment.commenterName}</div>
              </CommentAuthor>
              <CommentInfo>
                {/* {new Date(comment.modifiedAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} */}
                {formatDateToLocal(comment.modifiedAt)}
                {comment.isAuthor && (
                  <CommentActions>
                    <div className="edit-btn" onClick={() => handleEdit(comment.commentId)}>수정</div>
                    <div className="delete-btn" onClick={() => handleDelete(comment.commentId)}>삭제</div>
                  </CommentActions>
                )}
              </CommentInfo>
            </CommentHeader>
            {isEditing === comment.commentId ? (
              <EditTextAreaWrapper>
                <TextArea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={maxLength}
                />
                <CharacterCount>{text.length}/{maxLength}</CharacterCount>
                <Button onClick={() => handleUpdate(comment.commentId)}>수정</Button>
              </EditTextAreaWrapper>
            ) : (
              <CommentContent>{comment.commentContent}</CommentContent>
            )}
          </div>
        ))}
      </CommentsList>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border-top: 1px solid #ccc;
  margin-top: 30px;
  padding: 20px 20px 100px;
`;

const Header = styled.h1`
  text-align: left;
  font-size: 20px;
`;

const CommentsList = styled.div`
  margin-top: 40px;
  > div:not(:last-child) {
    margin-bottom: 70px; 
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    background-color: #0056b3;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888;
`;

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const maxLength = 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows="4"
        maxLength={maxLength}
      />
      <CharacterCount>{text.length}/{maxLength}</CharacterCount>
      <Button type="submit">등록</Button>
    </Form>
  );
};

const CommentHeader = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;

const CommentContent = styled.div`
        margin: 10px 0;
      `;

const CommentActions = styled.div`
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        .edit-btn {
          font-size: 14px;
          color: #1a1afa;
          cursor: pointer;
        }
        .delete-btn {
          font-size: 14px;
          color: red;
          cursor: pointer;
        }
      `;

const CommentInfo = styled.div`
        color: #888;
        font-size: 12px;
      `;

const CommentAuthor = styled.div`
      font-size: 12px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      
      > img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 50%;
      }
    
      .class {
        margin-right: 5px;
      }

   > .department-name {
    margin-right: 5px;
  }
    `;

const EditTextAreaWrapper = styled.div`
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        > textarea {
          width: 97%;
        }
      `;

export default CommentList;

