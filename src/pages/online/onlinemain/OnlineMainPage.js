import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import OnlineMainTop from "./OnlineMainTop";
import SubjectsListWrap from "./SubjectsListWrap";
import SubSubjectsListWrap from "./SubSubjectsListWrap";
import QuickMenu from "components/common/quickmenu/QuickMenu";
import "../../../scss/online/onlinemainpage.css";

const OnlineMainPageStyle = styled.div`
  /* max-width: 1180px; */
  /* width: 1180px; */
  /* background-color: #f3f9fa; */
  /* margin: 0 auto; */
  background-color: #f3f9fa;
  min-height: calc(100vh - 328px);

  display: flex;
  flex-direction: column;
  gap: 30px;

  .online-main-page-wrap {
    width: 1180px;
    max-width: 1180px;
    margin: 0 auto;

    /* #f3f9fa 0
    #d1e1e3 93
    #dee8e9 100 */
    background: rgb(243, 249, 250);
    background: linear-gradient(
      180deg,
      rgba(243, 249, 250, 1) 0%,
      rgba(209, 225, 227, 1) 93%,
      rgba(222, 232, 233, 1) 100%
    );

    padding-bottom: 80px;

    & > div {
      height: 100%;
    }
  }
`;

const OnlineMainPage = () => {
  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <OnlineMainPageStyle>
        <div className="online-main-page-wrap">
          <OnlineMainTop />
          <SubjectsListWrap />
          <SubSubjectsListWrap />
        </div>
      </OnlineMainPageStyle>
      <Footer />
    </>
  );
};

export default OnlineMainPage;
