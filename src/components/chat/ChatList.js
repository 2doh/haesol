import styled from "@emotion/styled";
import { useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import "../../scss/chat/chat.css";
import { getCookie } from "utils/cookie";

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

  .chat-field {
    height: 620px;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    /* 스크롤 바 숨기기 */
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 엣지에서 스크롤 바 숨기기 */
    }

    -ms-overflow-style: none; /* IE에서 스크롤 바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤 바 숨기기 */

    .chat-select-wrap {
      width: 95%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      span {
        color: #1b6a78;
        font-size: 16px;
        font-weight: 600;
      }
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
          flex-direction: column;
          gap: 20px;
          color: #033d46;
          align-items: flex-start;
          span {
            font-size: 18px;
          }
          p {
            font-size: 15px;
          }
          p:last-child {
            color: #9da2b9;
          }
        }
      }
    }
    .chat-select-wrap:nth-child(1) {
      margin-top: 30px;
    }
    .chat-select-wrap:last-child {
      margin-bottom: 60px;
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
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(139, 167, 32, 0) 70%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .chat-field-parents {
    height: 620px;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
    align-items: center;
    /* gap: 5px; */
    flex-direction: column;
    /* 스크롤 바 숨기기 */
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 엣지에서 스크롤 바 숨기기 */
    }

    -ms-overflow-style: none; /* IE에서 스크롤 바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤 바 숨기기 */

    .chat-select-wrap-parents {
      width: 95%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .chat-select-field-parents {
        display: flex;
        justify-content: space-between;
        width: 95%;
        padding: 10px;
        .parents-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: #033d46;
          align-items: flex-start;
          span {
            font-size: 18px;
          }
          p {
            font-size: 15px;
          }
          p:last-child {
            color: #9da2b9;
          }
        }
        &:hover {
          background-color: #f3f9fa;
        }
      }
      .chat-select-field-group {
        width: 95%;
        padding: 20px;
        background-color: #f3f9fa;
        /* border: solid 1px #1b4957; */
        border-radius: 10px;
        box-shadow:
          0px 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23);
        .group-chat {
          display: flex;
          flex-direction: column;
          gap: 20px;
          span {
            font-size: 20px;
          }
          p {
            font-size: 12px;
          }
        }
      }
    }
    .chat-select-wrap-parents:nth-child(2) {
      margin-top: 20px;
    }
  }
`;

const ChatList = () => {
  const [myMsg, setMyMsg] = useState("");
  const [sandingMsg, setSendingMsg] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  const teacherData = [
    { studentGrade: 1, studentClass: 2, teacherName: "김누구" },
    { studentGrade: 2, studentClass: 6, teacherName: "곽두팔" },
    { studentGrade: 3, studentClass: 1, teacherName: "이민엽" },
    { studentGrade: 5, studentClass: 6, teacherName: "김곽팔" },
  ];

  const studentData = [
    { studentName: "김누구" },
    { studentName: "이누구" },
    { studentName: "강누구" },
    { studentName: "박누구" },
    { studentName: "정누구" },
    { studentName: "최누구" },
  ];

  return (
    <ChatWrapStyle>
      <div className="chat-header">
        <BsFillChatRightDotsFill size={30} />
        <span>대화 시작하기</span>
      </div>

      {loginUserType === "ROLE_PARENTS" ? (
        <div className="chat-field">
          {teacherData.map((item, index) => (
            <div className="chat-select-wrap" key={index}>
              <span>
                {item.studentGrade}학년 {item.studentClass}반
              </span>
              <div className="chat-select-field">
                <div className="teacher-info">
                  <p>{item.teacherName} 선생님</p>
                  <p>아직 대화내용이 없습니다.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-field-parents">
          <div className="chat-select-wrap-parents">
            <div className="chat-select-field-group">
              <div className="group-chat">
                <span>1학년 5반 단체 채팅방</span>
                <p>아직 대화내용이 없습니다.</p>
              </div>
            </div>
          </div>
          <div>
            <button></button>
          </div>
          {studentData.map((item, index) => (
            <div className="chat-select-wrap-parents" key={index}>
              <div className="chat-select-field-parents">
                <div className="parents-info">
                  <span>{item.studentName} 학부모</span>
                  <p>아직 대화내용이 없습니다.</p>
                </div>
                <input type="checkbox" />
              </div>
            </div>
          ))}
        </div>
      )}
    </ChatWrapStyle>
  );
};

export default ChatList;
