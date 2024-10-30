import styled from 'styled-components';
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

const ScoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ScoreTitle = styled.span`
  font-weight: 700;
`;

const ScoreNum = styled.span`
  color: #4181ff;
  font-weight: 700;
`;

const List = styled.div`
  width: 95%;
  height: 65%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  font-size: 1rem;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d9d9;
`;

const ListState = styled.span`
  color: #4181ff;
  font-weight: 600;
`;

const ListImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 30px;
`;

const ListTitle = styled.span`
  font-weight: 800;
`;

const ListBtn = styled.button`
  border: none;
  width: 7rem;
  height: 1.8rem;
  background-color: #4181ff;
  border-radius: 5px;
  color: #fff;

  &: hover {
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  font-size: 0.875rem;
  color: #e70303;
  left: 3%;
  bottom: 0;
`;

const ListMock = {
  List: [
    { state: true, img: UserIcon, Title: '1책 판매합니다', Info: '영어영문학과 이OO' },
    { state: true, img: UserIcon, Title: '2책 판매합니다', Info: '국어국문학과 이OO' },
    { state: true, img: UserIcon, Title: '3책 판매합니다', Info: '영어영문학과 이OO' },
    { state: true, img: UserIcon, Title: '4책 판매합니다', Info: '국어국문학과 이OO' },
    { state: true, img: UserIcon, Title: '5책 판매합니다', Info: '영어영문학과 이OO' },
  ],
};

function EvalScore({ openSellerRating }) {
  return (
    <Wrapper>
      <Title>판매 & 구매 점수</Title>

      <BoxContainer>
        <ScoreContainer>
          <div>
            <ScoreTitle>판매 완료: </ScoreTitle>
            <ScoreNum>3건</ScoreNum>
          </div>
          <div>
            <ScoreTitle>점수: </ScoreTitle>
            <ScoreNum>4.2/5</ScoreNum>
          </div>
          <div>
            <ScoreTitle>구매 완료: </ScoreTitle>
            <ScoreNum>2건</ScoreNum>
          </div>
          <div>
            <ScoreTitle>점수: </ScoreTitle>
            <ScoreNum>5/5</ScoreNum>
          </div>
        </ScoreContainer>

        <List>
          {ListMock.List.map((item) => (
            <ListItem>
              <ListState>[거래 완료]</ListState>
              <ListImg src={item.img} alt="프로필" />
              <ListTitle>{item.Title}</ListTitle>
              <span>{item.Info}</span>
              <ListBtn onClick={openSellerRating} type="button">
                평가하기
              </ListBtn>
            </ListItem>
          ))}
        </List>

        <InfoContainer>거래 완료된 1건이 있어요 거래가 어땠는지 평가해주세요!</InfoContainer>
      </BoxContainer>
    </Wrapper>
  );
}

export default EvalScore;
