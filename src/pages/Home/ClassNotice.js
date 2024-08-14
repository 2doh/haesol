import styled from "@emotion/styled";
import { getChildRecentNoticeInfo } from "api/parents/mychildinfo";
import { getRecentNoticeInfo } from "api/teacher/teacherapi";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";

const ClassNoticeStyle = styled.div`
  .class-notice-inner {
    .notice-menu {
      width: 100%;
      display: flex;
      font-size: 20px;
      flex-direction: row;
      justify-content: space-around;
      gap: 3px;

      & > div {
        background-color: #dee8e9;
        width: 100%;
        height: 50px;

        border-radius: 30px 30px 0 0;
        color: #031929;
        border: #886348 1px solid;
        border-bottom: 0px;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0px 10px;
      }

      // 비활성화된 알림장 메뉴
      .no-select-menu {
        background-color: #92adb6;
        color: #ffffff;
      }
    }

    .notice-inner {
      border-radius: 10px 10px 0px 0px;
      position: relative;

      width: 100%;
      background-color: #dee8e9;
      height: 200px;
      border: #886348 1px solid;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20px;

      & > div * {
        display: flex;
        flex-direction: column;
        color: #031929;
        gap: 8px;
      }

      .school-supplies {
      }
      .notice-text-div {
        position: absolute;
        // width: 91%;
        // height: 75%;
        width: 100%;
        height: 100%;
        padding: 20px 30px;
        // overflow: hidden;

        // overflow: hidden;
        .notice-text-flex {
          display: flex;
          flex-direction: column;
          // position: absolute;
          width: 100%;
          height: 100%;
          gap: 15px;
          .notice-text {
            text-overflow: ellipsis;
          }

          .notice-main-contents {
            display: flex;
            width: 100%;
            height: 100%;

            align-items: center;
            justify-content: center;
            overflow: auto;
          }

          .notice-main-contents {
            width: 100%; /* 원하는 너비 설정 */
            height: 125px; /* 원하는 높이 설정 */
            position: relative;
            overflow-y: auto;

            .content-item-style {
              position: absolute;
              width: 100%;
              max-height: 125px;
              padding-right: 10px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
            }
            // display: inline-block;
            // overflow-y: scroll;
            // box-sizing: border-box;
          }

          /* 스크롤바 설정*/
          .notice-main-contents::-webkit-scrollbar {
            width: 10px;
          }

          /* 스크롤바 막대 설정*/
          .notice-main-contents::-webkit-scrollbar-thumb {
            background-color: #92adb6;
            /* 스크롤바 둥글게 설정    */
            border-radius: 10px;
            border: 1px solid #dee8e9;
          }

          /* 스크롤바 뒷 배경 설정*/
          .notice-main-contents::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0);
          }
        }
      }

      .notice-write-icon * {
        position: absolute;
        bottom: 20px;
        right: 25px;
        color: #1b4957;
        cursor: pointer;
      }
    }
  }
`;
const ClassNotice = () => {
  const navigate = useNavigate();
  const [noticeMenuNum, setNoticeMenuNum] = useState(2);

  // 준비물
  const [contentItem, setContentItem] = useState("");
  const [contentItemCreatedAt, setContentItemCreatedAt] = useState("");
  // 알림
  const [contentNotice, setContentNotice] = useState("");
  const [contentNoticeCreatedAt, setContentNoticeCreatedAt] = useState("");

  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  /** (교직원) 우리 학급 알림장 리스트 페이지로 이동 */
  const moveMyPage = () => {
    navigate("/notice/list/classid");
  };

  const suppliesMenuClassName = useRef();
  const noticeMenuClassName = useRef();
  const suppliesTextClassName = useRef();
  const noticeTextClassName = useRef();

  const changeNoticeMenu = e => {
    if (e.target.innerText === "준비물") {
      suppliesMenuClassName.current.classList.remove("no-select-menu");
      suppliesTextClassName.current.classList.remove("no-display");
      noticeTextClassName.current.classList.add("no-display");
      noticeMenuClassName.current.classList.add("no-select-menu");
    }
    if (e.target.innerText === "알림") {
      suppliesMenuClassName.current.classList.add("no-select-menu");
      suppliesTextClassName.current.classList.add("no-display");
      noticeTextClassName.current.classList.remove("no-display");
      noticeMenuClassName.current.classList.remove("no-select-menu");
    }
  };

  const getNotice = async noticeMenuNum => {
    // 알림 : 1, 준비물 : 2
    // 작성일 : createdAt, 내용 : content

    // console.log(getCookie("userRole"));
    if (getCookie("userRole") === "ROLE_TEACHER") {
      const res = await getRecentNoticeInfo(noticeMenuNum);
      setContentItem(res.item.content);
      setContentItemCreatedAt(moment(res.item.createdAt).format("YYYY-MM-DD"));
      setContentNotice(res.notice.content);
      setContentNoticeCreatedAt(
        moment(res.notice.createdAt).format("YYYY-MM-DD"),
      );
    }

    if (getCookie("userRole") === "ROLE_PARENTS") {
      const res = await getChildRecentNoticeInfo();
      setContentItem(res.item.content);
      setContentItemCreatedAt(moment(res.item.createdAt).format("YYYY-MM-DD"));
      setContentNotice(res.notice.content);
      setContentNoticeCreatedAt(
        moment(res.notice.createdAt).format("YYYY-MM-DD"),
      );
    }
  };

  /** 최초 랜더링 : 알림장 불러오기 */
  useEffect(() => {
    if (getCookie("studentPk")) {
      getNotice(noticeMenuNum);
    }

    if (getCookie("userRole") === "ROLE_TEACHER") {
      getNotice(noticeMenuNum);
    }
  }, []);

  return (
    <ClassNoticeStyle>
      <div className="class-notice-inner">
        <div className="notice-menu">
          <div
            ref={suppliesMenuClassName}
            className="supplies-menu"
            onClick={e => {
              changeNoticeMenu(e);
              setNoticeMenuNum(2);
            }}
          >
            준비물
          </div>
          <div
            ref={noticeMenuClassName}
            className="notice-list-menu no-select-menu"
            onClick={e => {
              changeNoticeMenu(e);
              setNoticeMenuNum(1);
            }}
          >
            알림
          </div>
        </div>
        <div className="notice-inner">
          <div
            ref={suppliesTextClassName}
            className="notice-text-div school-supplies"
          >
            <div className="notice-text-flex">
              <div className="notice-text notice-main-contents">
                <div className="content-item-style">{contentItem}</div>
              </div>
              <div className="notice-text">작성일 : {contentItemCreatedAt}</div>
            </div>
          </div>
          <div ref={noticeTextClassName} className="notice-text-div no-display">
            <div className="notice-text-flex">
              <div className="notice-text  notice-main-contents">
                <div className="content-item-style">{contentNotice}</div>
              </div>
              <div className="notice-text">
                작성일 : {contentNoticeCreatedAt}
              </div>
            </div>
          </div>
          {loginUserType === "ROLE_TEACHER" ? (
            <div
              className="notice-write-icon"
              onClick={() => {
                moveMyPage();
              }}
            >
              <BsPencilFill />
            </div>
          ) : null}
        </div>
      </div>
    </ClassNoticeStyle>
  );
};

export default ClassNotice;
