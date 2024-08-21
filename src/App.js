import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Home from "pages/Home/Home";

import Login from "pages/user/Login";
// import NotFound from "pages/NotFound";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../src/scss/common.scss";
import "./App.css";
import "./css/reset.css";
import { AuthenticatedRedirect } from "components/common/AuthenticatedRedirect";
import Modal from "components/common/Modal";
import ParentsPrivateRoute from "components/common/ParentsPrivateRoute";
import PrivateRoute from "components/common/PrivateRoute";
import SecureRoute from "components/common/SecureRoute";
import TeacherProtectedRoute from "components/common/TeacherProtectedRoute";
import NotFound from "components/notfound/NotFound";
import MainPage from "pages/Home/MainPage";
import AdminHome from "pages/admin/AdminHome";
import Grade from "pages/grade/Grade";
import GradeChart from "pages/grade/GradeChart";
import GradeView from "pages/grade/GradeView";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeItem from "pages/notice/NoticeItem";
import NoticeList from "pages/notice/NoticeList";
import NoticeModify from "pages/notice/NoticeModify";
import MyChildInfo from "pages/parents/MyChildInfo";
import StudentEdit from "pages/student/StudentEdit";
import Students from "pages/student/StudentsList";
import TeacherEdit from "pages/teacher/TeacherEdit";
import Signup from "pages/user/Signup";
import FindId from "pages/user/login/FindId";
import FindPass from "pages/user/login/FindPass";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "utils/cookie";
import "../src/scss/common.scss";
import "./App.css";
import "./css/reset.css";
import TestPage from "pages/online/TestPage";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import VocaLearn from "pages/learn/VocaLearn";
import CreateTestKo from "pages/online/CreateTestKo";
import CreateTestEn from "pages/online/CreateTestEn";
import Learn from "pages/learn/Learn";
import TeacherInfoView from "pages/teacher/TeacherInfoView";
import ModalView from "components/common/modal/ModalView";
import CreateTestMath from "pages/online/CreateTestMath";
import ChatRoom from "components/chat/ChatRoom";
import SocialSignup from "pages/user/login/SocialSignup";
import OnlineMainPage from "pages/online/onlinemain/OnlineMainPage";
import MyChildList from "pages/parents/MyChildList";
import { TestExPage } from "pages/online/onlinemain/TestExPage";
import TestResultsPage from "pages/online/onlinetest/TestResultsPage";
import IncorrectAnswerNoteMain from "pages/online/incorrectanswernote/IncorrectAnswerNoteMain";
import MyChildInfoView from "pages/parents/MyChildInfoView";
import StudentInfoViewTeacher from "pages/student/StudentInfoViewTeacher";
import useLogout from "hooks/common/useLogout";
import VocaResult from "pages/learn/VocaResult";

const Main = styled.div``;

/** 모달 스타일 */
const ModalStyle = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  /* height: 100vh; */
  /* width: 100vw; */
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    text-shadow: none;
  }

  .not-bg-click-modal {
    position: absolute;
    top: 35%;
    height: 250px;
  }

  .modal-inner {
    height: auto;
  }
`;

function App() {
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const [onHedaer, setOnHeader] = useState(true);
  const accessToken = getCookie("accessToken");
  const studentPk = getCookie("studentPk");

  /** 모달 상태 관리 */
  const modalState = useSelector(state => state.modalSlice);

  // console.log("권한 : ", loginUserType);
  // // 토큰 디코딩
  // const decoded = jwt.decode(token, { complete: true });

  // if (decoded.payload.exp < Date.now() / 1000) {
  //   console.log("토큰이 만료되었습니다.");
  // } else {
  //   console.log("토큰이 유효합니다.");
  // }

  // useEffect(() => {
  //   const token = req.header.authorization.split(" ")[1];
  //   const data = jwt.verify(accessToken, process.env.ACCESS_SECRET);
  //   console.log("토큰 유효시간 : ", data);
  // }, []);

  return (
    <BrowserRouter>
      {/* 모달 */}
      {modalState.isOpen ? (
        <ModalStyle>
          <Modal />
        </ModalStyle>
      ) : null}

      <Main>
        <Routes>
          {/* 메인 화면 - start */}
          {getCookie("userRole") === "ROLE_ADMIN" ? (
            <Route
              index
              element={
                <PrivateRoute
                  component={<AdminHome />}
                  authenticated={accessToken}
                />
              }
            ></Route>
          ) : (
            <Route index element={<MainPage />}></Route>
          )}
          {/* 메인 화면 - end */}
          {/* Admin 계정의 경우 - START */}
          {getCookie("userRole") === "ROLE_ADMIN" ? (
            <>
              <Route path="*" element={<AdminHome />}></Route>
              <Route path="/admin" element={<AdminHome />}>
                <Route index path="home" element={<AdminHome />}></Route>
              </Route>
            </>
          ) : (
            <Route path="/admin/*" element={<SecureRoute />}></Route>
          )}
          {/* Admin 계정의 경우 - END */}
          {/* 로그인 & 회원가입 : 이후 진입시 Home으로 강제 이동 */}
          {accessToken ? (
            <>
              <Route path="/login" element={<AuthenticatedRedirect />}></Route>
              <Route path="/signup" element={<AuthenticatedRedirect />}></Route>
              <Route path="/findid" element={<AuthenticatedRedirect />}></Route>
              <Route
                path="/findpass"
                element={<AuthenticatedRedirect />}
              ></Route>
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={
                  <Login onHedaer={onHedaer} setOnHeader={setOnHeader} />
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  <Signup onHedaer={onHedaer} setOnHeader={setOnHeader} />
                }
              ></Route>
              <Route
                path="/findid"
                element={
                  <FindId onHedaer={onHedaer} setOnHeader={setOnHeader} />
                }
              ></Route>
              <Route
                path="/findpass"
                element={
                  <FindPass onHedaer={onHedaer} setOnHeader={setOnHeader} />
                }
              ></Route>
            </>
          )}
          {/* 로그인 & 회원가입 : end */}

          {/* 영어 테스트 - start */}
          {/* <Route path="/learn" element={<Learn />}></Route> */}
          <Route path="/learn/voca" element={<VocaLearn />}></Route>
          {/* <Route path="/learn/result" element={<VocaResult />}></Route> */}
          <Route path="/signup/social" element={<SocialSignup />}></Route>
          {/* 영어 테스트 - end */}

          <Route path="/chat/teacher/:선생님pk" element={<ChatRoom />}></Route>
          {/* 교직원 : 학생 리스트 */}
          <Route
            path="/students"
            element={
              <TeacherProtectedRoute
                authenticated={accessToken}
                component={<Students />}
              />
            }
          ></Route>
          <Route path="/online">
            {/* 과목 리스트 페이지 */}
            <Route index element={<OnlineMainPage />}></Route>
            {/* 시험 페이지 */}
            <Route path="test" element={<TestPage />}></Route>
            <Route path="test/grad" element={<TestResultsPage />}></Route>
            <Route
              path="test/note"
              element={<IncorrectAnswerNoteMain />}
            ></Route>
            {/* 시험 설명 */}
            <Route path="test/ex" element={<TestExPage />}></Route>
          </Route>
          <Route path="/online/test/create">
            {/* <Route index element={<CreateTest />}></Route> */}
            {/* <Route path="korean" element={<CreateTestKo />}></Route> */}
            <Route
              path="korean"
              element={
                <TeacherProtectedRoute
                  authenticated={accessToken}
                  component={<CreateTestKo />}
                />
              }
            ></Route>
            <Route
              path="math"
              element={
                <TeacherProtectedRoute
                  authenticated={accessToken}
                  component={<CreateTestMath />}
                />
              }
            ></Route>
            <Route
              path="english"
              element={
                <TeacherProtectedRoute
                  authenticated={accessToken}
                  component={<CreateTestEn />}
                />
              }
            ></Route>

            {/* 기존 라우터 */}
            {/* <Route path="korean" element={<Students />}></Route>
            <Route path="math" element={<CreateTestMath />}></Route>
            <Route path="english" element={<CreateTestEn />}></Route> */}
          </Route>
          {/* 온라인 학습 라우터 */}
          {/* <Route path="/online/test/create" element={<CreateTest />}></Route>
          <Route
            path="/online/test/create/english"
            element={<CreateTestEn />}
          ></Route> */}
          {/* 학부모 : 성적 확인 페이지 - grade 페이지 진입시 세션에 중복 저장되는 오류 발생 */}
          {/* 해결한듯 */}
          {accessToken ? (
            // 교직원 : 성적 등록 페이지
            loginUserType === "ROLE_TEACHER" ? (
              <Route path="/grade/edit/:studentPk" element={<Grade />}></Route>
            ) : (
              <Route path="/grade/:studentPk" element={<GradeView />}></Route>
            )
          ) : (
            <Route
              path="/grade/:studentPk"
              element={
                <Navigate
                  to="/grade/:studentPk"
                  // {...alert("로그인이 필요합니다.")}
                />
              }
            ></Route>
          )}
          <Route
            path="/grade/chart/:studentPk"
            element={<GradeChart />}
          ></Route>
          {/* 교직원 : 학급 학생 정보 수정 */}
          <Route
            path="/students/:studentPk"
            element={
              <TeacherProtectedRoute
                authenticated={accessToken}
                component={<StudentInfoViewTeacher />}
              />
            }
          ></Route>
          <Route
            path="/students/edit/:studentPk"
            element={
              <TeacherProtectedRoute
                authenticated={accessToken}
                component={<StudentEdit />}
              />
            }
          ></Route>
          {/* 교직원 : 정보 수정 페이지 */}
          {/* <Route
            path="/teacherinfo"
            element={
              <TeacherProtectedRoute
                component={<TeacherEdit />}
                authenticated={accessToken}
              />
            }
          ></Route> */}
          {/* 학부모 - 학생 : 정보 수정 페이지 */}
          <Route path="/teacher">
            <Route index element={<TeacherInfoView />}></Route>
            {/* <Route path="teacherinfo" element={<TeacherInfoView />}></Route> */}
            <Route path="infoedit" element={<TeacherEdit />}></Route>
          </Route>
          {/* 학부모 - start */}
          <Route path="/parents">
            <Route index element={<MyChildList />}></Route>
            <Route
              path="childlist"
              element={
                <PrivateRoute
                  component={<MyChildList />}
                  authenticated={accessToken}
                />
              }
            ></Route>
            <Route
              path="studentinfo"
              element={
                <PrivateRoute
                  component={<MyChildInfoView />}
                  authenticated={accessToken}
                />
              }
            ></Route>
            <Route
              path="studentinfo/edit"
              element={
                <ParentsPrivateRoute
                  component={<MyChildInfo />}
                  authenticated={accessToken}
                />
              }
            ></Route>
          </Route>
          {/* 학부모 - end */}
          {/* 3차는 아래로 추가 예정 (추측) */}
          <Route path="/students" element={<Navigate to="*" />}>
            {/* 경로 수정 후 아래로 변경 */}
            {/* <Route path="edit/:userid" element={<StudentEdit />}></Route> */}
            {/* <Route path="grade/:studntid" element={<StudentGrade />}></Route> */}
          </Route>
          {/* 알림장 리스트 */}
          <Route path="/notice">
            <Route
              index
              element={
                <PrivateRoute
                  component={<NoticeList />}
                  authenticated={accessToken}
                />
              }
            ></Route>
            <Route
              path="list/:userClass"
              element={
                <PrivateRoute
                  authenticated={accessToken}
                  component={<NoticeList />}
                />
              }
            />
            <Route
              path="item/:userClass"
              element={
                <PrivateRoute
                  authenticated={accessToken}
                  component={<NoticeItem />}
                />
              }
            />
            <Route
              path="edit"
              element={
                <TeacherProtectedRoute
                  authenticated={accessToken}
                  component={<NoticeEdit />}
                />
              }
            />
            <Route
              path="modify/:noticeid"
              element={
                <TeacherProtectedRoute
                  authenticated={accessToken}
                  component={<NoticeModify />}
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
