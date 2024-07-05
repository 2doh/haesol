import styled from "@emotion/styled";
import { useState } from "react";

const ClassNoticeStyle = styled.div`
  /* 추후 삭제 */
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
`;
const ClassNotice = () => {
  const [selelctNoticeMenu, setSelelctNoticeMenu] = useState(1);
  // useEffect(() => {
  //   console.log("");
  // }, []);

  // useEffect(() => {
  //   if (selelctNoticeMenu === 1) {
  //   }

  //   if (selelctNoticeMenu === 2) {
  //   }

  //   console.log("시작");
  // }, [selelctNoticeMenu]);

  return (
    <ClassNoticeStyle>
      <div className="class-notice-inner">
        <div className="notice-menu">
          <div className="supplies-menu">준비물</div>
          <div className="notice-list-menu">알림</div>
          {/* <div className=""></div> */}
        </div>
        <div className="notice-inner">
          <div className="school-supplies">
            <ul>
              <li>1. 줄넘기</li>
              <li>2. 가위, 풀</li>
              <li>3. 색종이</li>
            </ul>
          </div>
          <div className="notice-text no-display">
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
