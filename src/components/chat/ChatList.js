import styled from "@emotion/styled";
import { useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import "../../scss/chat/chat.css";

const ChatWrapStyle = styled.div`
  word-break: keep-all;
  position: relative;
  margin: 20px;
  width: 420px;
  height: 660px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  .chat-header {
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 20px;
    gap: 10px;
    span {
      font-size: 22px;
      font-weight: 700;
    }
  }
  .chat-info-wrap {
    display: flex;
    justify-content: center;
    .chat-instructions {
      /* position: absolute;
    bottom: 10px; */
      width: 95%;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      color: #1b4957;
      span {
        font-size: 19px;
        font-weight: 700;
      }
      ul {
        font-size: 17px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        margin-bottom: 5px;
        li {
        }
      }
      p {
        color: #7f85a4;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
    }
  }
  .chat-field {
    height: 320px;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
    align-items: center;
    flex-direction: column;

    /* 스크롤 바 숨기기 */
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 엣지에서 스크롤 바 숨기기 */
    }

    -ms-overflow-style: none; /* IE에서 스크롤 바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤 바 숨기기 */

    .chat-select-field {
      width: 95%;
      min-height: 80px;
      border-radius: 10px;
      background-color: #fbfaf9;
      margin-bottom: 10px;
      padding: 15px;
      display: flex;
      /* justify-content: center; */
      /* align-items: center; */
      flex-direction: column;
      box-shadow:
        0px 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
      .teacher-info {
        display: flex;
        /* flex-direction: column; */
        gap: 5px;
        color: #033d46;
        align-items: center;
        span {
          font-size: 18px;
        }
        p {
          font-size: 15px;
        }
      }
    }
    .chat-select-field:nth-child(1) {
      min-height: 0px;
      height: 1px;
      margin: 10px;
      padding: 0;
      background-color: #fff;
      box-shadow: 0 0 0 0;
    }
    .chat-select-field:last-child {
      height: 20px;
      background-color: #fff;
      box-shadow: 0 0 0 0;
    }
  }

  .chat-field:before {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(139, 167, 32, 0) 10%
    );
  }
  .chat-field:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(139, 167, 32, 0) 70%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

const ChatList = () => {
  const [myMsg, setMyMsg] = useState("");
  const [sandingMsg, setSendingMsg] = useState("");
  const [nowTime, setNowTime] = useState("");

  const teacherData = [
    { studentGrade: 1, studentClass: 2, teacherName: "김누구" },
    { studentGrade: 2, studentClass: 6, teacherName: "곽두팔" },
    { studentGrade: 3, studentClass: 1, teacherName: "이민엽" },
    { studentGrade: 5, studentClass: 6, teacherName: "김곽팔" },
  ];

  const asd = () => {
    setSendingMsg(myMsg);
    const now = new Date();
    const nowhours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const meridiem = nowhours > 12 ? "오후" : "오전";
    // console.log(meridiem);
    if (meridiem === "오후") {
      const hours = nowhours - 12;
      // console.log(hours);
      const formattedTime = `${meridiem} ${hours}:${minutes}`;
      setNowTime(formattedTime);
    }
  };
  return (
    <ChatWrapStyle>
      <div className="chat-header">
        <BsFillChatRightDotsFill size={30} />
        {/* <BsFillChatLeftDotsFill size={30} /> */}
        <span>대화 시작하기</span>
      </div>

      <div className="chat-field">
        {/* 여백용 */}
        <div className="chat-select-wrap">
          <div className="chat-select-field">
            <div className="teacher-info"></div>
          </div>
        </div>

        {teacherData.map((item, index) => (
          <div className="chat-select-wrap" key={index}>
            <span>
              {item.studentGrade}학년 {item.studentClass}반
            </span>
            <div className="chat-select-field">
              <div className="teacher-info">
                <p>{item.teacherName} 선생님</p>
              </div>
            </div>
          </div>
        ))}
        {/* 여백용 */}
        <div className="chat-select-wrap">
          <div className="chat-select-field">
            <div className="teacher-info"></div>
          </div>
        </div>
      </div>
    </ChatWrapStyle>
  );
};

export default ChatList;
