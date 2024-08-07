import styled from "@emotion/styled";
import "../../scss/notice/noticeList.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getNoticeList, getStudentInfo } from "api/student/studentapi";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie } from "utils/cookie";
import { RiDeleteBack2Fill } from "react-icons/ri";

const NoticeItem = () => {
  const userClass = getCookie("userClass");
  // 네비게이트
  const navigate = useNavigate();
  const handleListClick = () => {
    navigate(`/notice/list/${userClass}`);
  };
  const handleEditClick = () => {
    navigate(`/notice/edit`);
  };
  // 준비물 state
  const state = 2;

  const [noticeList, setNoticeList] = useState([]);

  // 알림장 데이터 연동
  const noticeListData = async () => {
    try {
      const response = await getNoticeList(state);
      if (Array.isArray(response.data.result.item)) {
        setNoticeList(response.data.result.item);
      } else {
        setNoticeList([response.data.result.item]);
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
  const showModal = (selectModalType, createdAt, title, content, notice_id) => {
    /** (선택) 들어갈 내용 수정 */
    const data = {
      headerText: `준비물 - ${createdAt}`,
      bodyText: [content],
      buttonText: ["전송", "취소"],
      modalRes: [22, { to: "010-3024-9887", message: content }],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    dispatch(openModal(selectModalType));
    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

  const modalState = useSelector(state => state.modalSlice);

  const handleDelete = (e, selectModalType, notice_id) => {
    e.stopPropagation();
    const data = {
      headerText: ["삭제"],
      bodyText: ["해당 내용을 삭제하시겠습니까?"],
      buttonText: ["삭제", "취소"],
      modalRes: [44, notice_id],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    dispatch(openModal(selectModalType));
  };
  useEffect(
    () => {
      // if (modalState.modalRes[0] === false) {
      noticeListData();
      // }
    },
    [modalState.modalRes[0]],
    state,
  );

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
            <div className="notice-frame">
              <div className="text-wrapper">준비물</div>
            </div>
            <div
              className="div-wrapper"
              onClick={() => {
                handleListClick();
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
                  item.notice_id,
                );
              }}
            >
              <div className="grid-inner">
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.createdAt}</div>
                </div>
                <div className="grid-inner-item">
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

export default NoticeItem;
