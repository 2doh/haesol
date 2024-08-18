import React, { useState, useEffect } from "react";
import "../../scss/notice/noticeEdit.css";
import { createNotice, getStudentInfo } from "api/student/studentapi";
import { postTeacherSignin } from "api/login/teacherloginapi";
import { getCookie } from "utils/cookie";
import { useNavigate } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import styled from "@emotion/styled";
import Footer from "components/layout/Footer";

const NoticeEditWrapStyle = styled.div`
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
  /* background-color: #f3f9fa; */
  min-height: calc(100vh - 328px);
  padding: 0 30px;
`;

const NoticeEdit = () => {
  const userClass = getCookie("userClass");
  const userGrade = getCookie("userGrade");
  const navigate = useNavigate();
  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  // 상태 설정
  const [state, setState] = useState(2);
  // const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Select 변경 핸들러
  const handleSelectChange = e => {
    const selectedValue = e.target.value;
    if (selectedValue === "준비물") {
      setState(2);
    } else if (selectedValue === "알림") {
      setState(1);
    }
  };

  // Title 변경 핸들러
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  // Content 변경 핸들러
  const handleContentChange = e => {
    setContent(e.target.value);
  };
  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    if (state === null || !title || !content) {
      alert("모든 항목을 채워주세요.");
      return;
    }

    const noticeData = {
      state,
      title,
      content,
    };
    const result = await createNotice(noticeData);
    console.log(result);

    if (state === 1) {
      navigate(`/notice/list/${userClass}`);
    } else if (state === 2) {
      navigate(`/notice/item/${userClass}`);
    }
  };

  /** 취소 기능 */
  const modifyCancel = selectModalType => {
    const data = {
      bodyText: ["알림장 작성을 취소하시겠습니까?"],
      modalRes: [43],
      buttonText: ["확인", "닫기"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 모달 종료 후 갱신 */
  useEffect(() => {
    if (modalState.modalRes[0] === false) {
      // console.log("완료.");
    }
  }, [modalState.modalRes[0]]);

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        <NoticeEditWrapStyle>
          <div className="student-list-title">
            <span>
              {userGrade}학년 {userClass}반
            </span>
            <p>알림장 작성</p>
          </div>
          <div className="write-notice-wrap">
            <div className="select-notice-inner">
              <div className="select-notice-inner-left">
                <select
                  name="select-notice"
                  onChange={e => {
                    handleSelectChange(e);
                  }}
                >
                  <option value="준비물">준비물</option>
                  <option value="알림">알림</option>
                </select>
                {/* <input
              type="date"
              value={date}
              onChange={e => {
                handleDateChange(e);
              }}
            /> */}
              </div>
              <div className="info-button">
                <button
                  onClick={() => {
                    handleSave();
                  }}
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    modifyCancel("BasicModal");
                  }}
                >
                  취소
                </button>
              </div>
            </div>
            <div className="write-notice-section">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={e => {
                  handleTitleChange(e);
                }}
              />
              <textarea
                type="text"
                placeholder="내용을 입력하세요."
                value={content}
                onChange={e => {
                  handleContentChange(e);
                }}
              />
            </div>
          </div>
        </NoticeEditWrapStyle>
      </div>
      <Footer />
    </>
  );
};

export default NoticeEdit;
