import "./css/reset.css";
import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import Login from "pages/Login";
import Header from "components/layout/Header";
import Home from "pages/Home/Home";
import NotFound from "pages/NotFound";
import Signup from "pages/Signup";
import AdminHome from "pages/admin/AdminHome";
import AdminLogin from "pages/admin/AdminLogin";
import Grade from "pages/grade/Grade";
import GradeStatistics from "pages/grade/GradeStatistics";
import Notice from "pages/notice/Notice";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeModify from "pages/notice/NoticeModify";
import StudentEdit from "pages/student/StudentEdit";
import StudentGrade from "pages/student/StudentGrade";
import StudentInfoView from "pages/student/StudentInfoView";
import Students from "pages/student/StudentsList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../src/scss/common.scss";
import "./App.css";
import "./css/reset.css";
import { useEffect, useState } from "react";
import GradeView from "pages/grade/GradeView";
import TeacherEdit from "pages/teacher/TeacherEdit";
import NoticeItem from "pages/notice/NoticeItem";
import NoticeList from "pages/notice/NoticeList";


const Main = styled.div`
  /* & > .name { */
  background-color: #f3f9fa;
  width: 1180px;
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 80px;
  min-height: 687px;

  /* } */
`;

function App() {
  const [notFoundPage, setNotFoundPage] = useState(false);
  useEffect(() => {}, [notFoundPage]);

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

          <Route path="/admin">
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
          {/* 성적 확인 페이지 임시 경로 */}
          <Route path="/grade/2" element={<GradeView />}></Route>

          {/* 임시 경로 */}
          <Route path="/students/edit" element={<StudentEdit />}></Route>
          {/* 학생 본인 정보 수정 페이지 임시 경로 */}

          {/* 선생님 본인 정보 수정 페이지 */}
          <Route path="/teacher/edit" element={<TeacherEdit />}></Route>
          <Route
            path="/students/studntinfo"
            element={<StudentInfoView />}
          ></Route>

          <Route path="/students" element={<Navigate to="*" />}>
            {/* 경로 수정 후 아래로 변경 */}
            {/* <Route path="edit/:userid" element={<StudentEdit />}></Route> */}
            <Route path="grade/:studentid" element={<StudentGrade />}></Route>
          </Route>

          {/* 임시 경로 */}
          <Route path="/notice/list/classid" element={<NoticeList />}></Route>
          <Route path="/notice/item/classid" element={<NoticeItem />}></Route>
          <Route path="/notice/edit" element={<NoticeEdit />}></Route>
          <Route path="/notice" element={<Notice />}>
            {/* <Route path="list/classid" element={<NoticeList />}></Route>
            <Route path="item/classid" element={<NoticeItem />}></Route> */}
            {/* <Route path="edit" element={<NoticeEdit />}></Route> */}
            <Route path="modify/:noticeid" element={<NoticeModify />}></Route>
          </Route>

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
