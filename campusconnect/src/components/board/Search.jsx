// 1차 수정 코드 
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react'; // useState를 임포트합니다.
import axios from 'axios';
import { SearchContext } from './SearchContext';

const Wrapper = styled.div`
  width: 55%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchTitle = styled.p`
  font-size: 1rem;
`;

const Input = styled.input`
  width: 14rem;
  height: 1rem;
  padding: 0.5rem;
  margin-left: 0.3rem;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 8rem;
  height: 2.2rem;
  color: #fff;
  background-color: #4181ff;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;

  &: hover {
    cursor: pointer;
    background: #3165c9;
  }
`;

function Search() {
  const navigate = useNavigate();  
  const [department, setDepartment] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);

  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // 실제 인증 토큰으로 교체
      const response = await axios.get('http://localhost:8080/boards/search', {
        headers: {
          Authorization: token, // 토큰을 헤더에 추가
        },
        params: {
          department,
          title: keyword,
          size: 9,
          sort: 'createdDate,DESC',
        },
      });
      console.log('Response:', response.data); // 응답 데이터 확인을 위한 로그
      if (Array.isArray(response.data)) {
        setFilteredPosts(response.data);
      } else {
        console.error('Expected array but got:', response.data);
        setFilteredPosts([]);
      }
      setError(null);
    } catch (error) {
      console.error('Error:', error); // 오류 로그 출력
      if (error.response) {
        console.error('Error response:', error.response); // 응답 오류 로그 출력
      }
      if (error.response && error.response.status === 404) {
        setError('검색 결과가 없습니다.');
        setFilteredPosts([]);
      } else {
        setError('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <Wrapper>
      <Form>
        <InputWrapper>
          <SearchTitle>학과(학부)</SearchTitle>
          <Input type="text" value={department} onChange={handleDepartmentChange} />
          {/* <Input type="text" /> */}
        </InputWrapper>
        <InputWrapper>
          <SearchTitle>키워드</SearchTitle>
          <Input type="text" value={keyword} onChange={handleKeywordChange} />
          {/* <Input type="text" /> */}
        </InputWrapper>
        <Button type="button" onClick={handleSearch}>검색</Button>
        {/* <Button type="button">검색</Button> */}
      </Form>
      <Button type="button" onClick ={() => {navigate('/assignboard')}}>게시글 작성</Button>
       {/* Display filtered posts */}
       <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {filteredPosts.map(post => (
              <li key={post.id}>{post.department}: {post.title}</li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
}

export default Search;


