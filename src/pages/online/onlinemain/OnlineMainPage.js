import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import OnlineMainTop from "./OnlineMainTop";
import SubjectsListWrap from "./SubjectsListWrap";
import SubSubjectsListWrap from "./SubSubjectsListWrap";

const OnlineMainPageStyle = styled.div`
  max-width: 1180px;
  width: 1180px;
  background-color: #f3f9fa;
  margin: 0 auto;
  min-height: calc(100vh - 328px);

  display: flex;
  flex-direction: column;
  gap: 30px;

  & > div {
    height: 100%;
  }
`;

const OnlineMainPage = () => {
  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <OnlineMainPageStyle>
        <OnlineMainTop />
        <SubjectsListWrap />
        <SubSubjectsListWrap />
      </OnlineMainPageStyle>
      <Footer />
    </>
  );
};

export default OnlineMainPage;
