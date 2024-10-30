import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledWrapper>
      <div className="service-info">
        <div>
          캠퍼스 커넥트(Campus Connect) - 대학교 교내 중고거래 서비스 플랫폼
        </div>
        <div>경기도 안양시 만안구 성결대학로 53 성결대학교</div>
      </div>
      <div className="service-email">
        <div>서비스 이용 관련 문의 불편사항 건의하기</div>
        <div>E-mail : twojunspace@naver.com</div>
      </div>
    </StyledWrapper>
  );
};

export default Footer;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #504e4e;
  width: 100%;
  color: #fff;
  padding: 10px 0;
  font-size: 13px;

  .service-info {
    padding-left: 20px;

    > div {
      margin-bottom: 3px;
    }
  }

  .service-email {
    padding-right: 20px;

    > div {
      margin-bottom: 3px;
    }
  }
`;
