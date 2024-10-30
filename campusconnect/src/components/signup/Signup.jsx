import { useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import UserIcon from '../../assets/UserIcon.png';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Explan = styled.div`
  font-size: 2rem;
  font-weight: 900;
  margin-top: 2%;
`;

const Ex = styled.div`
  font-size: 1rem;
  color: #929292;
  margin-top: 0.5rem;
`;

const Form = styled.form`
  width: 80%;
  margin-top: 3rem;
`;

const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileImg = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 30px;
`;

const FileLabel = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 1rem;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;

const InputFileCuston = styled.input`
  display: none;
`;

const FormWrapper = styled.div`
  width: 25rem;
  height: 2.35rem;
  display: flex;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
`;

const InputName = styled.input`
  width: 100%;
  height: 1.5rem;
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;
  padding: 2%;
`;

const StuNumInput = styled.input`
  width: 65%;
  height: 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 2%;
`;

const InputText = styled.input`
  width: 100%;
  height: 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 2%;
`;

const StudentNum = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  position: relative;
  display: flex;
  algin-items: center;
`;

const StudentNumBtn = styled.button`
  width: 25%;
  height: 80%;
  border-radius: 10px;
  position: absolute;
  right: 0;
  font-size: 0.875rem;
  padding: 1.5%;
  background: #4181ff;
  color: #fff;
  border: none;

  &: hover {
    cursor: pointer;
    background: #3165c9;
  }
`;

const Button = styled.button`
  width: 13rem;
  height: 2.2rem;
  color: #fff;
  background-color: #4181ff;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  margin-left: 0.5rem;

  &: hover {
    cursor: pointer;
    background: #3165c9;
  }
`;

const EmailWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Email = styled.div`
  color: #929292;
  font-size: 0.875rem;
`;

const AuthWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  position: relative;
  display: flex;
  align-items: center;
`;

const AuthBtn = styled.button`
  width: 25%;
  height: 80%;
  border-radius: 10px;
  position: absolute;
  right: 0;
  font-size: 0.875rem;
  padding: 1.5%;
  background: #4181ff;
  color: #fff;
  border: none;

  &: hover {
    cursor: pointer;
    background: #3165c9;
  }
`;

const PasswordWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
`;

const SelectWrapper = styled.div`
  width: 25rem;
  display: flex;
  margin: 2% auto;
  justify-content: space-around;
  align-items: center;
`;

const SelectCustom = styled.select`
  width: 45%;
  height: 2.35rem;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 1.5%;
  font-size: 0.875rem;
  line-height: 1rem;
`;

const SignupBtn = styled.button`
  width: 50%;
  height: 2.2rem;
  border: none;
  border-radius: 10px;
  background-color: #4181ff;
  color: #fff;
  font-size: 1rem;

  &: hover {
    cursor: pointer;
    background: #3165c9;
  }
`;

function Signup() {
  const [error, setError] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const [signup, setSignup] = useState({
    image: null,
    name: '',
    studentNumber: '',
    email: '',
    authenticationNumber: '',
    password: '',
    college: '',
    department: '',
  });

  const navigate = useNavigate();

  // 학과(학부) 변경 핸들러
  const changeDepartmentHandler = (e) => {
    const selectedDepartmentValue = e.target.value;
    setSelectedDepartment(selectedDepartmentValue);
    setSignup({
      ...signup,
      department: selectedDepartmentValue,
    });
  };

  // 단과대학이 변경될 때 호출되는 함수
  const ChangeFacultyHandler = (e) => {
    const selectedCollegeValue = e.target.value;
    setSelectedFaculty(selectedCollegeValue);
    setSelectedDepartment(''); // 단과대학이 변경될 때마다 학과(학부) 초기화
    setSignup({
      ...signup,
      college: selectedCollegeValue,
      department: '',
    });
  };

  // 선택한 단과대학에 따라 학과(학부) 옵션을 반환하는 함수
  const getDepartmentOptions = () => {
    switch (selectedFaculty) {
      case '신학대학':
        return ['학과(학부)', '신학과', '신학부', '기독교교육상담학과', '문화선교학과'];
      case '인문대학':
        return ['학과(학부)', '국어국문학과', '영어영문학과', '중어중문학과'];
      case '사회과학대학':
        return ['학과(학부)', '국제개발협력학과', '사회복지학과', '행정학과'];
      case '글로벌경영기술대학':
        return ['학과(학부)', '관광개발학과', '경엉학과', '글로벌물류학부', '산업경영공학과'];
      case '사범대학':
        return ['학과(학부)', '유아교육과', '체육교육과', '교직부'];
      case 'IT공과대학':
        return [
          '학과(학부)',
          '컴퓨터공학과',
          '정보통신공학과',
          '미디어소프트웨어학과',
          '도시디자인정보공학과',
        ];
      case '예술대학':
        return ['학과(학부)', '음악학부', '연극영화학부', '뷰티디자인학과', '실용음악과'];
      case '융합대학':
        return ['학과(학부)', '융합학부'];
      default:
        return ['학과(학부)'];
    }
  };

  // 이미지 업로드 input의 onChange
  const saveFileHandler = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setSignup({
        ...signup,
        image: imgRef.current.files[0],
      });
    };
  };

  // 입력 값 저장하기
  const inputHandler = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };

  // 학번 중복 체크
  const stuNumCheckHandler = (e) => {
    e.preventDefault();
    console.log(signup.studentNumber);
    axios
      .get('http://54.198.230.191:8080/users/sign-up/studentNumber-duplicate-validation', {
        params: {
          studentNumber: signup.studentNumber,
        },
      })
      .then((res) =>  {
        console.log(res.data.responseCode)
        alert(res.data.responseCode) 

      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.responseCode) 
      });
  };

  // 이메일 중복 체크
  const emailCheckHandler = (e) => {
    e.preventDefault();
    axios
      .get('http://54.198.230.191:8080/users/sign-up/email-duplicate-validation', {
        params: {
          email: signup.email,
        },
      })
      .then((res) =>  {
        console.log(res.data.responseCode)
        alert(res.data.responseCode) 

      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.responseCode) 
      });
  };

  // 이메일 인증 발송
  const sendEmailAuthHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://54.198.230.191:8080/users/sign-up/email-authentication',
        {
          email: signup.email,
        },
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .then(() => alert('이메일이 전송되었습니다'))
      .catch((err) => console.log(err));
  };

  // 이메일 인증 체크
  const emailAuthCheckHandler = (e) => {
    e.preventDefault();

    axios
      .get('http://54.198.230.191:8080/users/sign-up/email-authentication', {
        params: {
          email: signup.email,
          authenticationNumber: signup.authenticationNumber,
        },
      })
      .then((res) => alert(res.data.responseCode))
      .catch((err) => console.log(err));
  };

  // 회원가입 정보 보내기
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // JSON 데이터를 문자열로 변환하여 멀티파트 폼 데이터에 추가
    formData.append('image', signup.image); // 이미지 파일을 멀티파트 폼 데이터에 추가

    // 회원 가입 정보를 객체로 만들어서 멀티파트 폼 데이터에 추가
    const signUpData = {
      image: '',
      name: signup.name,
      studentNumber: signup.studentNumber,
      email: signup.email,
      authenticationNumber: signup.authenticationNumber,
      password: signup.password,
      college: signup.college,
      department: signup.department,
    };

    formData.append(
      'request ',
      new Blob([JSON.stringify(signUpData)], {
        type: 'application/json',
      }),
    );

    axios
      .post('http://54.198.230.191:8080/users/sign-up', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data && err.response.data.responseCode) {
            setError(err.response.data.responseCode); // 서버에서 받은 오류 메시지 설정
            alert(err.response.data.responseCode); // 오류 메시지를 alert으로 표시
          } else {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
            alert(setError);
          }
        } else {
          setError('회원가입 중 오류가 발생했습니다.');
          alert(setError);
        }
      });
  };

  return (
    <SignupContainer>
      <Explan>회원가입</Explan>
      <Ex>필수 정보를 입력해 회원가입을 완료할 수 있습니다.</Ex>

      <Form onSubmit={submitHandler}>
        <FileWrapper>
          <FileImg src={imgFile || UserIcon} alt="프로필 이미지" />
          <FileLabel htmlFor="profileImg">프로필 이미지 선택</FileLabel>
          <InputFileCuston type="file" onChange={saveFileHandler} ref={imgRef} id="profileImg" />
        </FileWrapper>

        <FormWrapper>
          <InputName
            type="text"
            placeholder="이름"
            value={signup.name}
            name="name"
            onChange={inputHandler}
          />
        </FormWrapper>

        <FormWrapper>
          <StudentNum>
            <StuNumInput
              type="text"
              placeholder="학번"
              value={signup.studentNumber}
              name="studentNumber"
              onChange={inputHandler}
            />
            <StudentNumBtn type="button" onClick={stuNumCheckHandler}>
              중복 체크
            </StudentNumBtn>
          </StudentNum>
        </FormWrapper>

        <FormWrapper>
          <EmailWrapper>
            <InputText
              type="text"
              placeholder="이메일"
              value={signup.email}
              name="email"
              onChange={inputHandler}
            />
            <Email>@sungkyul.ac.kr</Email>
            <Button type="button" onClick={emailCheckHandler}>
              중복 체크
            </Button>
            <Button type="button" onClick={sendEmailAuthHandler}>
              인증코드 발송
            </Button>
          </EmailWrapper>
        </FormWrapper>

        <FormWrapper>
          <AuthWrapper>
            <InputText
              type="text"
              placeholder="인증 번호"
              value={signup.authenticationNumber}
              name="authenticationNumber"
              onChange={inputHandler}
            />
            <AuthBtn type="button" onClick={emailAuthCheckHandler}>
              인증 확인
            </AuthBtn>
          </AuthWrapper>
        </FormWrapper>

        <FormWrapper>
          <PasswordWrapper>
            <InputText
              type="password"
              placeholder="비밀번호"
              value={signup.password}
              name="password"
              onChange={inputHandler}
            />
          </PasswordWrapper>
        </FormWrapper>

        <SelectWrapper>
          <SelectCustom value={selectedFaculty} onChange={ChangeFacultyHandler}>
            <option selected disabled hidden>
              단과대학
            </option>
            <option value="신학대학">신학대학</option>
            <option value="인문대학">인문대학</option>
            <option value="사회과학대학">사회과학대학</option>
            <option value="글로벌경영기술대학">글로벌경영기술대학</option>
            <option value="사범대학">사범대학</option>
            <option value="IT공과대학">IT공과대학</option>
            <option value="예술대학">예술대학</option>
            <option value="융합대학">융합대학</option>
          </SelectCustom>

          <SelectCustom value={selectedDepartment} onChange={changeDepartmentHandler}>
            {getDepartmentOptions().map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </SelectCustom>
        </SelectWrapper>

        <FormWrapper>
          <SignupBtn type="submit">회원가입</SignupBtn>
        </FormWrapper>
      </Form>
    </SignupContainer>
  );
}

export default Signup;
