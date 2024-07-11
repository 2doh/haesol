import React, { useState } from "react";
import "../../scss/notice/noticeEdit.css";
import { createNotice } from "api/student/studentapi";

const NoticeEdit = () => {
  // 반 정보
  const gradeClass = "5학년 7반";

  // 상태 설정
  const [state, setState] = useState(null);
  const [date, setDate] = useState("");
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

  // Date 변경 핸들러
  const handleDateChange = e => {
    setDate(e.target.value);
  };
  // Content 변경 핸들러
  const handleContentChange = e => {
    setContent(e.target.value);
  };
  // 저장 버튼 클릭 핸들러
  const handleSave = async e => {
    e.preventDefault();
    if (state === null || !date || !content) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const noticeData = {
      state,
      date,
      content,
    };
    const result = await createNotice(noticeData);
    console.log(result);
  };

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* 제목 위치 */}
        <span>{gradeClass}</span>
        <p>알림장 작성</p>
      </div>
      <div className="write-notice-wrap">
        <div className="select-notice-inner">
          <div className="select-notice-inner-left">
            <select
              name="select-notice"
              onChange={() => {
                handleSelectChange();
              }}
            >
              <option value="none" disabled selected>
                == 항목을 선택하세요 ==
              </option>
              <option value="준비물">준비물</option>
              <option value="알림">알림</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={() => {
                handleDateChange();
              }}
            />
          </div>
          <div className="info-button">
            <button
              onClick={() => {
                handleSave();
              }}
            >
              저장
            </button>
            <button>취소</button>
          </div>
        </div>
        <div className="write-notice-section">
          <textarea
            type="text"
            placeholder="내용을 입력하세요."
            value={content}
            onChange={() => {
              handleContentChange;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeEdit;
