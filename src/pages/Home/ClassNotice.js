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
const ClassNotice = ({ setCreatedAt }) => {
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
      // setContent(res.content);
      // setCreatedAt(moment(res.createdAt).format("YYYY-MM-DD"));
      setContentItem(res.item.content);
      setContentItemCreatedAt(moment(res.item.createdAt).format("YYYY-MM-DD"));
      setContentNotice(res.notice.content);
      setContentNoticeCreatedAt(
        moment(res.notice.createdAt).format("YYYY-MM-DD"),
      );

      console.log("학부모 결과값 : ", res.item);
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

  useEffect(() => {
    if (noticeMenuNum === 2) {
      setCreatedAt(contentItemCreatedAt);
    }
    if (noticeMenuNum === 1) {
      setCreatedAt(contentNoticeCreatedAt);
    }
  }, [noticeMenuNum]);

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
          {/* <div className=""></div> */}
        </div>
        <div className="notice-inner">
          <div
            ref={suppliesTextClassName}
            className="notice-text-div school-supplies"
          >
            수정중
            <div className="notice-text">{contentItem}</div>
            {/* <ul>
              <li>1. 줄넘기</li>
              <li>2. 가위, 풀</li>
              <li>3. 색종이</li>
            </ul> */}
          </div>
          <div ref={noticeTextClassName} className="notice-text-div no-display">
            수정중
            <div className="notice-text">{contentNotice}</div>
            {/* <ul>
              <li>1. 수학 익힘책 15p 숙제가 있습니다.</li>
              <li>2. 내일 받아쓰기 시험이 있습니다.</li>
            </ul> */}
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
