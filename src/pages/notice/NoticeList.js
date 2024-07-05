import styled from "@emotion/styled";
import "../../scss/notice/noticeList.css";

import React from "react";
import { useNavigate } from "react-router";

const NoticeList = () => {
  // 네비게이트
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/notice/item/classid`);
  };
  const handleEditClick = () => {
    navigate(`/notice/edit`);
  };
  // 반 정보
  const gradeClass = "5학년 7반";

  // 알림장 더미 데이터
  const noticeList = [
    {
      noticeDate: "2024.07.05",
      noticeContent: "오늘 준비물은여 야호!",
    },
    {
      noticeDate: "2024.07.05",
      noticeContent: "오늘 준비물은여 야호!",
    },
    {
      noticeDate: "2024.07.05",
      noticeContent: "오늘 준비물은여 야호!",
    },
  ];

  const NoticeListStyle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* 제목 위치 */}
        <span>{gradeClass}</span>
        <p>알림장 목록</p>
      </div>
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div
              className="div-wrapper"
              onClick={() => {
                handleClick();
              }}
            >
              <div className="info-subtitle">준비물</div>
            </div>
            <div className="notice-frame">
              <div className="text-wrapper">알림장</div>
            </div>
          </div>

          <div
            className="alart-button"
            onClick={() => {
              handleEditClick();
            }}
          >
            <button>알림 작성</button>
          </div>
        </div>
      </div>
      <div className="notice-select">
        <div className="notice-select-inner">날짜</div>
        <div className="notice-select-inner">내용</div>
      </div>
      <NoticeListStyle>
        <div className="notice-frame">
          {noticeList.map((item, index) => (
            <div className="item" key={index}>
              <div className="grid-inner">
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.noticeDate}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {item.noticeContent}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NoticeListStyle>
    </div>
  );
};

export default NoticeList;
