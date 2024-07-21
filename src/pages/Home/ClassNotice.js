import styled from "@emotion/styled";
import { getChildRecentNoticeInfo } from "api/parents/mychildinfo";
import { getRecentNoticeInfo } from "api/teacher/teacherapi";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";

const ClassNoticeStyle = styled.div`
  /* 추후 삭제 */
  /* width: 100%;
  height: 100%; */
  margin-bottom: 50px;
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
    if (getCookie("userRole") === "ROLE_TEAHCER") {
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

    if (getCookie("userRole") === "ROLE_TEAHCER") {
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
          {loginUserType === "ROLE_TEAHCER" ? (
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
