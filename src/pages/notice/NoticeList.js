import styled from "@emotion/styled";
import "../../scss/notice/noticeList.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getNoticeList, getStudentInfo } from "api/student/studentapi";

const NoticeList = () => {
  // 네비게이트
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/notice/item/classid`);
  };
  const handleEditClick = () => {
    navigate(`/notice/edit`);
  };

  // 알림장 state
  const state = 1;

  // 임시 데이터
  const class_id = 101;
  const stu_id = 1;

  const [studentClass, setStudentClass] = useState("");
  const [noticeList, setNoticeList] = useState([]);

  // 학생 정보 불러오기
  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(stu_id);
      const result = response.data;
      setStudentClass(result.studentClass);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 학생 데이터 불러오기
    console.log("studentInfoData 확인중 : ", studentInfoData);
    studentInfoData();
  }, []);

  // 알림장 데이터 연동
  const noticeListData = async () => {
    try {
      const response = await getNoticeList(class_id, state);
      if (Array.isArray(response.data.result)) {
        setNoticeList(response.data.result);
      } else {
        setNoticeList([response.data.result]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("noticeListData 확인중 : ", noticeListData);
    noticeListData();
  }, [class_id, state]);

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
        <span>{studentClass}</span>
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
                  <div className="grid-inner-item-text">{item.createdAt}</div>
                </div>
                <div className="grid-inner-item">
                  {/* <div className="grid-inner-item-text">{item.title}</div> */}
                  <div className="grid-inner-item-text">{item.content}</div>
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
