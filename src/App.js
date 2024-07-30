import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Home from "pages/Home/Home";
import Login from "pages/user/Login";
// import NotFound from "pages/NotFound";
import AdminHome from "pages/admin/AdminHome";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeModify from "pages/notice/NoticeModify";
import Students from "pages/student/StudentsList";
import Signup from "pages/user/Signup";
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
import Grade from "pages/grade/Grade";
import GradeChart from "pages/grade/GradeChart";
import GradeView from "pages/grade/GradeView";
import NoticeItem from "pages/notice/NoticeItem";
import NoticeList from "pages/notice/NoticeList";
import MyChildInfo from "pages/parents/MyChildInfo";
import StudentEdit from "pages/student/StudentEdit";
import TeacherEdit from "pages/teacher/TeacherEdit";
import FindId from "pages/user/login/FindId";
import FindPass from "pages/user/login/FindPass";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "utils/cookie";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import MainPage from "pages/Home/MainPage";
import CreateTest from "pages/online/CreateTest";

// import jwt from "jsonwebtoken";

const ModalStyle = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100vw;
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

const Main = styled.div`
  /* background-color: #f3f9fa;
  width: 1180px; */
  /* min-height: 687px; */
  /* min-height: calc(100vh - 260px);
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 80px; */

  /* background-color: #f3f9fa; */
  /* background-color: ${getCookie("accessToken") ? "#FBFAF9" : "#f3f9fa"}; */
  /* width: 1180px; */
  /* min-height: calc(100vh - 260px); */
  /* height: 100%; */
  /* margin: 0 auto; */
  /* padding: 40px; */
  /* padding-bottom: 0; */
  /* margin-bottom: -40px; */

  /* 내부 스타일 */
  & > div,
  main {
    /* min-height: calc(100vh - 260px); */
    /* padding-bottom: 120px; */
  }
`;

function App() {
  const [notFoundPage, setNotFoundPage] = useState(false);
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const [onHedaer, setOnHeader] = useState(true);
  const accessToken = getCookie("accessToken");
  const studentPk = getCookie("studentPk");

  useEffect(() => {}, [notFoundPage]);

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
      {modalState.isOpen ? (
        <ModalStyle>
          <Modal />
        </ModalStyle>
      ) : null}

      {/* {onHedaer ? <Header /> : null} */}
      {/* <HeaderTop /> */}
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />
      {/* <MainPage /> */}

      <Main>
        <Routes>
          <Route path="/test" element={<Test />}></Route>

          {/* <Route index element={<Home />}></Route> */}
          <Route index element={<MainPage />}></Route>
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

          {/* Admin 계정의 경우 */}
          {loginUserType === "ROLE_ADMIN" ? (
            <>
              <Route
                path="*"
                element={
                  <PrivateRoute
                    component={<AdminHome />}
                    authenticated={accessToken}
                  />
                }
              ></Route>
              <Route path="/admin" element={<AdminHome />}>
                <Route index path="home" element={<AdminHome />}></Route>
              </Route>
            </>
          ) : (
            <Route path="/admin/*" element={<SecureRoute />}></Route>
          )}

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
          <Route path="/students" component={<Students />}></Route>

          {/* 학부모 : 성적 확인 페이지 - grade 페이지 진입시 세션에 중복 저장되는 오류 발생 */}
          {/* {accessToken ? (
            // 교직원 : 성적 등록 페이지
            loginUserType === "ROLE_TEAHCER" ? (
              <Route path="/grade/:studentPk" element={<Grade />}></Route>
            ) : (
              <Route path="/grade/:studentPk" element={<GradeView />}></Route>
            )
          ) : (
            <Route
              path="/grade/:studentPk"
              element={
                <Navigate
                  to="/grade/:studentPk"
                  {...alert("로그인이 필요합니다.")}
                />
              }
            ></Route>
          )} */}

          {/* 성적 확인/입력 페이지 - 세션 확인 바람 */}
          {/* 학부모 : 성적 확인 페이지 */}
          {loginUserType === "ROLE_TEAHCER" ? (
            <Route path="/grade/:studentPk" element={<Grade />}></Route>
          ) : (
            // <Route path="/grade/:studentPk" element={<GradeView />}></Route>
            <Route path="/grade/:studentPk" element={<GradeView />}></Route>
          )}
          <Route
            path="/grade/chart/:studentPk"
            element={<GradeChart />}
          ></Route>

          {/* 교직원 : 학급 학생 정보 수정 */}
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
          <Route
            path="/teacherinfo"
            element={
              <TeacherProtectedRoute
                component={<TeacherEdit />}
                authenticated={accessToken}
              />
            }
          ></Route>
          {/* 학부모 - 학생 : 정보 수정 페이지 */}
          <Route
            path="/studentinfo"
            element={
              <ParentsPrivateRoute
                component={<MyChildInfo />}
                authenticated={accessToken}
              />
            }
          ></Route>

          {/* 3차는 아래로 추가 예정 (추측) */}
          <Route path="/students" element={<Navigate to="*" />}>
            {/* 경로 수정 후 아래로 변경 */}
            {/* <Route path="edit/:userid" element={<StudentEdit />}></Route> */}
            {/* <Route path="grade/:studntid" element={<StudentGrade />}></Route> */}
          </Route>

          {/* 교직원 : 알림장 리스트 */}
          <Route path="/notice">
            <Route
              index
              element={
                <TeacherProtectedRoute
                  component={<NoticeList />}
                  authenticated={accessToken}
                />
              }
            ></Route>
            <Route
              path="list/:userClass"
              element={
                <TeacherProtectedRoute
                  authenticated={accessToken}
                  component={<NoticeList />}
                />
              }
            />
            <Route
              path="item/:userClass"
              element={
                <TeacherProtectedRoute
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

          {/* 온라인 학습 라우터 */}
          <Route path="/online/test/create" element={<CreateTest />}></Route>

          <Route
            path="*"
            element={<NotFound />}
            setNotFoundPage={setNotFoundPage}
          ></Route>
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
