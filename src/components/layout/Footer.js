import styled from "@emotion/styled";
import "../../scss/main/footer.css";
const FooterStyle = styled.div`
  background-color: #dee8e9;
  height: 180px;
  width: 100%;
`;
const Footer = () => {
  return (
    <FooterStyle>
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
    </FooterStyle>
  );
};
export default Footer;
