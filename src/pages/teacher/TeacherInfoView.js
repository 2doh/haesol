import styled from "@emotion/styled";
import PageTitle from "components/common/style/PageTitle";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import TeacherInfo from "./TeacherInfo";
import HeaderProfile from "components/layout/header/HeaderProfile";

const TeacherInfoViewStyle = styled.div`
  width: 1180px;
  background-color: #f3f9fa;
  /* height: calc(100vh - 135px); */
  margin: 0 auto;
`;

const TeacherInfoView = () => {
  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />

      <TeacherInfoViewStyle>
        <PageTitle>개인 정보 관리</PageTitle>
        <TeacherInfo></TeacherInfo>
      </TeacherInfoViewStyle>
    </>
  );
};

export default TeacherInfoView;
