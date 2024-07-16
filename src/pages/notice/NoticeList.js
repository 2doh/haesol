import styled from "@emotion/styled";
import "../../scss/notice/noticeList.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  deleteNotice,
  getNoticeList,
  getStudentInfo,
} from "api/student/studentapi";
import { getCookie } from "utils/cookie";
import { useDispatch } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { RiDeleteBack2Fill } from "react-icons/ri";

const NoticeList = () => {
  const userClass = getCookie("userClass");
  const userRole = getCookie("userRole");
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

  const [noticeList, setNoticeList] = useState([]);

  // 알림장 데이터 연동
  const noticeListData = async () => {
    try {
      const response = await getNoticeList(state);
      if (Array.isArray(response.data.result)) {
        setNoticeList(response.data.result);
      } else {
        setNoticeList([response.data.result]);
      }
      console.log(noticeList);
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

  const handleDelete = (e, selectModalType, notice_id) => {
    e.stopPropagation();
    console.log("notice_id : ", notice_id);
    const data = {
      headerText: ["삭제"],
      bodyText: ["해당 내용을 삭제하시겠습니까?"],
      buttonText: ["삭제", "취소"],
      modalRes: [44, notice_id],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
  };

  const NoticeListStyle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
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
            <div
              className="item"
              key={index}
              onClick={() => {
                showModal(
                  "BasicModal",
                  item.createdAt,
                  item.title,
                  item.content,
                  item.notice_id,
                );
              }}
            >
              <div className="grid-inner">
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.createdAt}</div>
                </div>
                <div className="grid-inner-item">
                  {/* <div className="grid-inner-item-text">{item.title}</div> */}
                  <div className="grid-inner-item-text">{item.title}</div>
                  <div
                    className="delete-button"
                    onClick={e => {
                      handleDelete(e, "BasicModal", item.notice_id);
                    }}
                  >
                    <RiDeleteBack2Fill size="2.5rem" />
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
