import React from "react";
import "../../scss/notice/noticeEdit.css";

const NoticeEdit = () => {
  // 반 정보
  const gradeClass = "5학년 7반";

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
            <select name="select-notice">
              <option value="none" disabled selected>
                == 항목을 선택하세요 ==
              </option>
              <option value="준비물">준비물</option>
              <option value="알림">알림</option>
            </select>
            <input type="date" />
          </div>
          <div className="info-button">
            <button>저장</button>
            <button>취소</button>
          </div>
        </div>
        <div className="write-notice-section">
          <textarea type="text" placeholder="내용을 입력하세요." />
        </div>
      </div>
    </div>
  );
};

export default NoticeEdit;
