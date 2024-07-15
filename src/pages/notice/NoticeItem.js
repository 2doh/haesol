import styled from "@emotion/styled";
import "../../scss/notice/noticeList.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getNoticeList, getStudentInfo } from "api/student/studentapi";
import { useDispatch } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie } from "utils/cookie";

const NoticeItem = () => {
  const userClass = getCookie("userClass");
  // 네비게이트
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/notice/list/classid`);
  };
  const handleEditClick = () => {
    navigate(`/notice/edit`);
  };
  // 준비물 state
  const state = 2;

  const [noticeList, setNoticeList] = useState([]);
  const [createdAt, setCreatedAt] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 알림장 데이터 연동
  const noticeListData = async () => {
    try {
      const response = await getNoticeList(state);
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
    noticeListData();
  }, [state]);

  const dispatch = useDispatch();
  /** 모달 호출 */
  const showModal = (selectModalType, createdAt, title, content) => {
    /** (선택) 들어갈 내용 수정 */
    console.log("huh", title);
    const data = {
      headerText: `준비물 - ${createdAt}`,
      // bodyTextLabel: [title],
      bodyText: [content],
      buttonText: ["전송", "취소"],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
    console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

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
        <span>{userClass}</span>
        <p>알림장 목록</p>
      </div>
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div className="notice-frame">
              <div className="text-wrapper">준비물</div>
            </div>
            <div
              className="div-wrapper"
              onClick={() => {
                handleClick();
              }}
            >
              <div className="info-subtitle">알림장</div>
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
            <div
              className="item"
              key={index}
              onClick={() => {
                showModal(
                  "BasicModal",
                  item.createdAt,
                  item.title,
                  item.content,
                );
              }}
            >
              <div className="grid-inner">
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.createdAt}</div>
                </div>
                <div className="grid-inner-item">
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

export default NoticeItem;
