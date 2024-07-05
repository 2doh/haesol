import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Home from "pages/Home/Home";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Students from "pages/student/StudentsList";
import AdminHome from "pages/admin/AdminHome";
import AdminLogin from "pages/admin/AdminLogin";
import Grade from "pages/grade/Grade";
import GradeStatistics from "pages/grade/GradeStatistics";
import Notice from "pages/notice/Notice";
import NoticeClass from "pages/notice/NoticeClass";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeModify from "pages/notice/NoticeModify";
import StudentEdit from "pages/student/StudentEdit";
import StudentGrade from "pages/student/StudentGrade";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./css/reset.css";
import "../src/scss/common.scss";
import "./App.css";
// import Main from "components/layout/Main";
import styled from "@emotion/styled";
import Signup from "pages/Signup";
import StudentInfoView from "pages/student/StudentInfoView";
import NotBgClickModal from "components/modal/NotBgClickModal";

// import Modal from "components/layout/Modal";

const Main = styled.div`
  background-color: #f3f9fa;
  width: 1180px;
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 80px;
  min-height: 687px;
`;

function App() {
  return (
    <BrowserRouter>
      {/* <Modal></Modal> */}

      <Header />
      <Main>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          {/* 임의 추가 */}
          {/* <Route path="/admin/home" element={<AdminHome to="/admin/login" />} /> */}

          {/* <Route path="/admin" element={<Navigate to="/admin/login" />}> */}
          <Route path="/admin">
            {/* 추가됨 */}
            <Route index element={<AdminLogin />}></Route>
            <Route path="home" index element={<AdminHome />}></Route>
            <Route path="login" element={<AdminLogin />}></Route>
          </Route>

          <Route path="/grade" element={<Navigate to="*" />}>
            <Route
              path="statistics/:userid"
              element={<GradeStatistics />}
            ></Route>
            <Route path=":userid" element={<Grade />}></Route>
          </Route>
          {/* 성적 입력 페이지 임시 경로 */}
          <Route path="/grade/1" element={<Grade />}></Route>

          {/* 임시 경로 */}
          <Route path="/students/edit" element={<StudentEdit />}></Route>
          {/* 학생 본인 정보 수정 페이지 임시 경로 */}
          <Route
            path="/students/studntinfo"
            element={<StudentInfoView />}
          ></Route>

          <Route path="/students" element={<Navigate to="*" />}>
            {/* 경로 수정 후 아래로 변경 */}
            {/* <Route path="edit/:userid" element={<StudentEdit />}></Route> */}
            <Route path="grade/:studentid" element={<StudentGrade />}></Route>
          </Route>

          <Route path="/notice" element={<Notice />}>
            <Route path=":classid" element={<NoticeClass />}></Route>
            <Route path="edit" element={<NoticeEdit />}></Route>
            <Route path="modify/:noticeid" element={<NoticeModify />}></Route>
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
