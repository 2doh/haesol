import styled from "@emotion/styled";
import { useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { getCookie } from "utils/cookie";
import "../../scss/chat/chat.css";

const ChatWrapStyle = styled.div`
  width: 800px;
  height: 660px;
  margin: 20px;
  display: flex;
  align-items: flex-end;
  word-break: keep-all;
  .chat-inner {
    position: relative;
    padding: 20px;
    width: 420px;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
    box-shadow:
      0px 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    .chat-header {
      display: flex;
      align-items: center;
      height: 60px;
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
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .chat-select-field-parents {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 12px;
          border-bottom: solid 1px #dee8e9;
          .parents-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            color: #033d46;
            align-items: flex-start;
            span {
              font-size: 18px;
            }
            p {
              font-size: 13px;
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
          background-color: #f6f7f9;
          /* border: solid 1px #1b4957; */
          /* border-radius: 5px; */
          box-shadow:
            0px 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
          .group-chat {
            display: flex;
            flex-direction: column;
            gap: 20px;
            span {
              font-size: 18px;
              font-weight: 700;
            }
            p {
              font-size: 12px;
              color: #9da2b9;
            }
          }
          &:hover {
            background-color: #c6dbda;
            span {
              color: #fff;
            }
          }
        }
      }
      .chat-select-wrap-parents:nth-child(2) {
        margin-top: 20px;
      }
    }
  }
  .group-chat-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
    .raise {
      color: var(--color);
      transition: 0.25s;
      &:hover,
      &:focus {
        border-color: var(--hover);
        color: #fff;
      }

      .plus-button {
        gap: 10px;
        display: flex;
        align-items: center;
        height: 50px;
        font-size: 18px;
        font-weight: 700;
        color: #5f909f;
        border: solid 2px #5f909f;
        border-radius: 25px;
        padding: 10px;
        background-color: #dee8e9;
        span,
        path {
          color: #5f909f;
        }
      }
      .plus-button:hover {
        color: #fff;
        background-color: #8cc1d3;
        .plus-btn,
        span,
        path {
          color: #fff;
        }
      }
    }
    // Size can also be negative; see how it's smaller than the element
    .raise:hover,
    .raise:focus {
      box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
      transform: translateY(-0.25em);
    }
  }
  .parents-list-wrap {
    width: 300px;
    height: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    /* background-color: #f3f9fa; */
    border-radius: 5px;
    position: relative;
    box-shadow:
      0px 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    .chat-header {
      width: 100%;
      height: 60px;
      background-color: #c6dbda;
      display: flex;
      align-items: center;
      span {
        color: #033d46;
        font-size: 22px;
        font-weight: 700;
        margin-left: 10px;
      }
    }
    .parents-list-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      .chat-select-wrap-parents {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .parents-info {
          display: flex;
          justify-content: space-between;
          padding: 0 10px 0 10px;
          align-items: center;
          span {
            font-size: 15px;
          }
          input,
          progress {
            accent-color: #5f909f;
          }
          input[type="checkbox"] {
            zoom: 1.5;
          }
        }
        &:hover {
          background-color: #add2d8;
          span {
            color: #fff;
          }
        }
      }
    }
    .create-group-chat-btn {
      width: 60%;
      min-height: 35px;
      position: absolute;
      bottom: 20px;
      border-radius: 20px;
      background-color: #8cc1d3;
      display: flex;
      flex-direction: column;
      box-shadow:
        0px 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .create-group-chat-btn:active {
      bottom: 18px;
    }
  }
`;

const ChatList = () => {
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

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = index => {
    setCheckedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <ChatWrapStyle>
      <div className="chat-inner">
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
            {studentData.map((item, index) => (
              <div className="chat-select-wrap-parents" key={index}>
                <div className="chat-select-field-parents">
                  <div className="parents-info">
                    <span>{item.studentName} 학부모</span>
                    <p>내일 어쩌구저쩌구 이거 내용이에요.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="group-chat-button">
        <button className="raise">
          <div className="plus-button">
            <span>초대</span>
            <FaUserPlus size={20} className="plus-btn" />
          </div>
        </button>
      </div>
      <div className="parents-list-wrap">
        <div className="chat-header">
          <span>초대하기</span>
        </div>
        <div className="parents-list-inner">
          {studentData.map((item, index) => (
            <div
              className="chat-select-wrap-parents"
              key={index}
              onClick={() => handleCheckboxChange(index)}
            >
              <div className="parents-info">
                <span>{item.studentName} 학부모</span>
                <input
                  type="checkbox"
                  checked={!!checkedItems[index]}
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>
        <button className="create-group-chat-btn">채팅방 만들기</button>
      </div>
    </ChatWrapStyle>
  );
};

export default ChatList;
