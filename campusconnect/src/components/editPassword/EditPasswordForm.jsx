import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPasswordForm = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const validatePassword = (password) => {
    const containsSpecialChar = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return containsSpecialChar.test(password) && password.length >= 8 && password.length <= 20;
  };

  const handleCurrentPasswordChange = (event) => {
    const value = event.target.value;
    setCurrentPassword(value);
    // setIsCurrentPasswordValid(value === '1111aaaa!'); // 임시로 현재 비밀번호가 '1111aaaa!'인지 확인
  };

  const handleNewPasswordChange = (event) => {
    const value = event.target.value;
    setNewPassword(value);
    setIsNewPasswordValid(validatePassword(value));
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setIsConfirmPasswordValid(value === newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
    const studentNumber = tokenData.studentNumber;
    if (!studentNumber) {
        console.error('토큰에 학번이 없습니다.');
        alert('유효하지 않은 접근입니다.');
        return;
    }

    if (!validatePassword(newPassword)) {
      alert('변경할 비밀번호는 영문 소문자, 숫자, 특수 문자를 포함하여 8~20글자로 입력해 주세요.');
      return;
    }

    try {
      const response = await axios.patch(
        `http://54.198.230.191host:8080/users/my-page/password/${studentNumber}`,
        {
          currentPassword,
          editPassword: newPassword,
          checkEditPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('studentNumber');
        localStorage.removeItem('department');
        localStorage.removeItem('name');
        localStorage.removeItem('userProfileImage');
        navigate('/EditPasswordComplete');
      }
    } catch (error) {
      alert(error.response.data.responseCode);
    }
  };

  return (
    <StyledWrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-wrapper">
          <div className="label">현재 비밀번호</div>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        {/* {currentPassword && (isCurrentPasswordValid ? (
          <div className="collect">현재 비밀번호와 일치합니다.</div>
        ) : (
          <div className="warning">현재 비밀번호가 일치하지 않습니다.</div>
        ))} */}
        <div className="input-wrapper">
          <div className="label">변경할 비밀번호</div>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div className="pw-warning">영문 소문자, 숫자, 특수 문자를 포함하여 8~20글자로 입력해 주세요.</div>
        </div>
        <div className="input-wrapper">
          <div className="label">변경 비밀번호 재확인</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {confirmPassword && (isConfirmPasswordValid ? (
          <div className="message collect">변경 비밀번호와 일치합니다.</div>
        ) : (
          <div className="message warning">변경 비밀번호와 일치하지 않습니다.</div>
        ))}
      </form>
      <div className="change-btn" onClick={handleSubmit}>
        <span>변경하기</span>
      </div>
    </StyledWrapper>
  );
};

export default EditPasswordForm;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 150px;

  .input-wrapper {
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    width: 100%;

    > input {
      height: 30px;
      width: 200px;
      border-radius: 10px;
      padding: 0 10px;
      border: 1px solid black;
    }

    .label {
      text-align: end;
      width: 160px;
      margin-right: 20px;
    }

    > div {
      margin-left: 35px;
    }

    .pw-warning {
      color: #007aff;
      font-size: 13px;
    }
  }

  .message {
    padding-left: 220px;
    font-size: 12px;
    margin-bottom: 20px;
    margin-top: -20px;
  }

  .collect {
    color: green;
  }

  .warning {
    color: red;
  }

  .change-btn {
    margin-top: 12px;
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    background-color: #5b7eef;
    padding: 10px 35px;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 90px;
  }
`;
