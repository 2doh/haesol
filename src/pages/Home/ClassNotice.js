import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const ClassNoticeStyle = styled.div`
  /* 추후 삭제 */
  /* width: 100%;
  height: 100%; */
  margin-bottom: 50px;
`;
const ClassNotice = () => {
  // const [selelctNoticeMenu, setSelelctNoticeMenu] = useState(1);
  // const [suppliesMenu, setSuppliesMenu] = useState("");

  // useEffect(() => {
  //   if (selelctNoticeMenu === 1) {
  //   }

  //   if (selelctNoticeMenu === 2) {
  //   }

  //   console.log("시작");
  // }, [selelctNoticeMenu]);

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

  return (
    <ClassNoticeStyle>
      <div className="class-notice-inner">
        <div className="notice-menu">
          <div
            ref={suppliesMenuClassName}
            className="supplies-menu"
            onClick={e => {
              changeNoticeMenu(e);
            }}
          >
            준비물
          </div>
          <div
            ref={noticeMenuClassName}
            className="notice-list-menu no-select-menu"
            onClick={e => {
              changeNoticeMenu(e);
            }}
          >
            알림
          </div>
          {/* <div className=""></div> */}
        </div>
        <div className="notice-inner">
          <div ref={suppliesTextClassName} className="school-supplies">
            <ul>
              <li>1. 줄넘기</li>
              <li>2. 가위, 풀</li>
              <li>3. 색종이</li>
            </ul>
          </div>
          <div ref={noticeTextClassName} className="notice-text no-display">
            <ul>
              <li>1. 수학 익힘책 15p 숙제가 있습니다.</li>
              <li>2. 내일 받아쓰기 시험이 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </ClassNoticeStyle>
  );
};

export default ClassNotice;
