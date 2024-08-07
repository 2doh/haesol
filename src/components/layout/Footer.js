import styled from "@emotion/styled";
import "../../scss/main/footer.css";

const FooterStyle = styled.div`
  background-color: #dee8e9;
  min-height: 180px;
  width: 100%;

  @media screen and (max-width: 1023px) {
    min-width: 605px;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-wrap">
        <div className="footer-inner">
          <div className="footer-info-nav">
            <div className="nav-text">개인정보 처리 방침</div>
            <div className="nav-text">이용약관</div>
            <div className="nav-text">저작권보호정책</div>
            <div className="nav-text">원격지원 바로가기</div>
            <div className="nav-text">운영지원센터 바로가기</div>
          </div>
          <div className="footer-info-text">
            <div className="footer-address-info">
              <div className="site-address">대구 중구 중앙대로 394</div>
            </div>
            <div className="footer-tel-info">
              <div className="site-tel-num">Tel : 053 - 111 - 2222</div>
              <div className="office-tel-num">Tel : 053 - 111 - 2222</div>
              <div className="fex-num">Fex : 053 - 888 - 5555</div>
            </div>
            <div className="footer-copyright-info">
              <div className="copyright-text">
                Copyright(c) HAESOL. All rights reserved.
              </div>
            </div>
          </div>
        </div>
        <div className="footer-cnt">
          <div className="today-users">
            <p>오늘 방문객</p>
            <p>2명</p>
          </div>
          <div className="total-users">
            <p>전체 방문객</p>
            <p>3,572,658명</p>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
};
export default Footer;
