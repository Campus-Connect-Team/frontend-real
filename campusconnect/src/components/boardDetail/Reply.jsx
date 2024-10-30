import React, { useState } from 'react';
import styled from 'styled-components';


const Reply = ({ reply, updateReply, deleteReply, commentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(reply.text);
  const maxLength = 100;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    updateReply(commentId, reply.id, text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteReply(commentId, reply.id);
  };

  return (
    <ReplyContainer>
      <ReplyHeader>
        <ReplyAuthor>
          <img src="/default.png" alt="profile" />
          <div className="class">국어국문학과</div>
          <div>김 00</div>
        </ReplyAuthor>
        <ReplyInfo>
          {reply.date}
          <ReplyActions>
            <div className="edit-btn" onClick={handleEdit}>수정</div>
            <div className="delete-btn" onClick={handleDelete}>삭제</div>
          </ReplyActions>
        </ReplyInfo>
      </ReplyHeader>
      {isEditing ? (
        <EditTextAreaWrapper>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={maxLength}
          />
          <CharacterCount>{text.length}/{maxLength}</CharacterCount>
          <Button onClick={handleUpdate}>수정</Button>
        </EditTextAreaWrapper>
      ) : (
        <ReplyContent>{reply.text}</ReplyContent>
      )}

    </ReplyContainer>
  );
};

const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  margin-bottom: 10px;
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
  &:hover {
    background-color: #0056b3;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888;
`;

export default Reply;

const ReplyContainer = styled.div`
  padding: 10px 0;
`;

const ReplyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReplyContent = styled.div`
  margin: 10px 0;
`;

const ReplyActions = styled.div`
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

const ReplyInfo = styled.div`
  color: #888;
  font-size: 12px;
`;

const ReplyAuthor = styled.div`
  font-size: 12px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  > img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
  .class {
    margin-right: 5px;
  }
`;

const EditTextAreaWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  > textarea {
    width: 97%;
  }
  button {
    margin-left: 10px;
  }
`;