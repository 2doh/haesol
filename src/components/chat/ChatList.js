import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { getCookie } from "utils/cookie";
import "../../scss/chat/chat.css";
import { IoClose } from "react-icons/io5";
import ChatRoom from "./ChatRoom";
import { getChatParentsList, getChatTeacherList } from "api/chat/chatapi";
import { getParentsListInfo } from "api/parents/parentsapi";

const ChatWrapStyle = styled.div`
  z-index: 100000;
  position: fixed;
  bottom: 0;
  right: 70px;
  margin: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  word-break: keep-all;
  .chat-inner {
    background-color: #fff;
    position: relative;
    padding: 20px;
    width: 360px;
    height: 570px;
    overflow: hidden;
    border-radius: 20px;
    box-shadow:
      0px 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    .chat-alpha {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background-color: transparent; /* 기본적으로 투명 */
      transition: background-color 0.1s ease-in-out;
      pointer-events: none; /* 이 요소를 클릭할 수 없도록 설정 */

      ${({ chatMiniList }) =>
        chatMiniList &&
        `background-color: rgba(0, 0, 0, 0.4);`}/* chatMiniList가 true일 때 반투명 */
    }

    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;

      .chat-header-inn {
        display: flex;
        align-items: center;
        gap: 10px;
        span {
          font-size: 22px;
          font-weight: 700;
        }
      }
    }

    .chat-field {
      height: 90%;
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
        max-height: 90%;
        width: 95%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        span {
          color: #1b6a78;
          font-size: 16px;
          font-weight: 600;
        }
        .chat-select-field {
          width: 95%;
          /* min-height: 80%; */
          /* border-radius: 10px; */
          background-color: #fbfaf9;
          padding: 15px;
          display: flex;
          /* gap: 10px; */
          flex-direction: column;
          box-shadow:
            0px 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
          .teacher-info {
            display: flex;
            flex-direction: column;
            gap: 5px;
            /* color: #033d46; */
            align-items: flex-start;
            span {
              font-size: 18px;
            }
            p {
              font-size: 15px;
              color: #033d46;
            }
          }
          .teacher-chat-contain {
            width: 100%;
            height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            text-overflow: ellipsis;
            display: flex;
            justify-content: flex-end;
            p {
              font-size: 12px;
              color: #9da2b9;
              display: block;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .chat-null {
            width: 90%;
            span {
              font-size: 12px;
              font-weight: 300;
              color: #9da2b9;
            }
          }
        }
      }
      /* 호버 시 배경색 변경 */
      .chat-select-wrap:hover {
        & > .chat-select-field {
          background-color: #dee8e9;
        }
      }
      .chat-select-wrap:nth-of-type(1) {
        margin-top: 30px;
      }
      .chat-select-wrap:last-child {
        margin-bottom: 30px;
      }
    }
    .chat-field::before {
      pointer-events: none;

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
    .chat-field::after {
      pointer-events: none;

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
      max-height: 90%;
      display: flex;
      position: relative;
      justify-content: flex-start;
      overflow-y: auto;
      align-items: center;
      margin-top: 5px;
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
          .parents-info {
          }
        }
        .chat-select-field-group {
          margin-bottom: 10px;
          width: 100%;
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
            background-color: #d1ecff;
            span {
              /* color: #fff; */
            }
          }
        }
      }
      .chat-select-wrap-parents:nth-of-type(2) {
        /* margin-top: 20px; */
      }
      .chat-select-wrap-parents {
        .chat-null {
          span {
            font-size: 15px;
            font-weight: 300;
          }
        }
      }
    }
  }
  .group-chat-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 10;
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
    position: absolute;
    z-index: 100000;
    bottom: 60px;
    left: 350px;
    background-color: #f3f9fa;
    width: 240px;
    max-height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    overflow-y: auto;
    border-radius: 20px;
    position: relative;
    box-shadow:
      0px 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);

    /* 스크롤 바 숨기기 */
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 엣지에서 스크롤 바 숨기기 */
    }

    -ms-overflow-style: none; /* IE에서 스크롤 바 숨기기 */
    scrollbar-width: none; /* Firefox에서 스크롤 바 숨기기 */
    .chat-header {
      border-bottom: solid 1px #dee8e9;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      span {
        /* color: #fff; */
        font-size: 18px;
        font-weight: 700;
      }
      button {
        cursor: pointer;
        margin-right: -10px;
        &:hover {
          path {
            color: #add2d8;
          }
        }
      }
    }
    .parents-list-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      .chat-select-wrap-parents {
        padding: 10px;
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

    .create-group-chat-btn:active {
      bottom: 18px;
    }
  }
  .create-group-chat-btn {
    z-index: 10000000;
    width: 25%;
    min-height: 35px;
    position: absolute;
    bottom: 10px;
    right: 50px;
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
`;

const ChatList = ({ chatStartOpen, setChatOpen }) => {
  const [chatData, setChatData] = useState([]);
  const [parentsList, setParentsList] = useState([]);
  const [chatMiniList, setChatMiniList] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);

  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  const [checkedItems, setCheckedItems] = useState({});

  const [roomId, setRoomId] = useState(null);
  const [teaId, setTeaId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [sender, setSender] = useState("");
  const [sendTime, setSendTime] = useState("");

  const fetchChatData = async () => {
    console.log("loginUserType:", loginUserType);
    try {
      if (loginUserType === "ROLE_TEACHER") {
        const response = await getChatTeacherList();
        setChatData(response || []);
      } else if (loginUserType === "ROLE_PARENTS") {
        const response = await getChatParentsList();
        setChatData(response || []);
      } else {
        console.error("Unknown user role:", loginUserType);
      }
    } catch (error) {
      console.error("채팅 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // 선생님 -> 담당 학급 학부모 리스트 불러오기
  const getParentsList = async () => {
    try {
      const response = await getParentsListInfo();
      console.log(response);
      setParentsList(response || []);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, [loginUserType]);

  const handleOpenChatRoom = (
    selectedRoomId,
    selectedTeaId,
    selectedParentId,
  ) => {
    setRoomId(selectedRoomId);
    setTeaId(selectedTeaId); // 객체 전체를 전달
    setParentId(selectedParentId); // 객체 전체를 전달
    setChatRoomOpen(true);
  };

  const handleCheckboxChange = index => {
    setCheckedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      {chatStartOpen ? (
        <ChatWrapStyle chatMiniList={chatMiniList}>
          <div className="chat-inner">
            <div className="chat-alpha"></div>
            <div className="chat-header">
              <div className="chat-header-inn">
                <BsFillChatRightDotsFill size={30} />
                <span>대화 시작하기</span>
              </div>
              <button
                onClick={() => {
                  // callStartChat(false);
                  setChatOpen(false);
                }}
              >
                <IoClose size={30} />
              </button>
            </div>

            {loginUserType === "ROLE_PARENTS" ? (
              <div className="chat-field">
                {chatData.map((item, index) => (
                  <div className="chat-select-wrap" key={index}>
                    <div
                      className="chat-select-field"
                      onClick={() =>
                        handleOpenChatRoom(
                          item.roomId,
                          item.teaId?.name || "정보 없음",
                          item.parents || [],
                        )
                      }
                    >
                      <div className="teacher-info">
                        <span>
                          {item.studentGrade}학년 {item.studentClass}반
                        </span>
                        <p>{item.teaId?.name || "선생님 정보 없음"} 선생님</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="chat-field-parents">
                {chatData.length > 0 ? (
                  chatData.map((item, index) => (
                    <div
                      className="chat-select-wrap-parents"
                      key={index}
                      onClick={() =>
                        handleOpenChatRoom(
                          item.roomId,
                          item.teaId?.name || "정보 없음",
                          item.parents || [],
                        )
                      }
                    >
                      <div className="chat-select-field-parents">
                        <div className="parents-info">
                          {/* 학부모 목록 출력 */}
                          {item.parents?.length > 0 ? (
                            item.parents.map((parent, parentIndex) => (
                              <span key={parentIndex}>
                                {parent.name} 학부모
                              </span>
                            ))
                          ) : (
                            <span>학부모 정보 없음</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="chat-select-wrap-parents">
                    <div className="chat-null">
                      <span>
                        아직 대화내용이 없습니다. <br />
                        초대를 눌러 대화를 시작하세요.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loginUserType === "ROLE_TEACHER" ? (
              <div className="group-chat-button">
                <button
                  className="raise"
                  onClick={() => {
                    setChatMiniList(true);
                    getParentsList();
                  }}
                >
                  <div className="plus-button">
                    <span>초대</span>
                    <FaUserPlus size={20} className="plus-btn" />
                  </div>
                </button>
              </div>
            ) : null}
          </div>

          {chatMiniList ? (
            <>
              <div className="parents-list-wrap">
                <div className="chat-header">
                  <span>초대하기</span>
                  <button
                    onClick={() => {
                      setChatMiniList(false);
                    }}
                  >
                    <IoClose size={30} />
                  </button>
                </div>
                <div className="parents-list-inner">
                  {parentsList.map((item, index) => (
                    <div
                      className="chat-select-wrap-parents"
                      key={index}
                      onClick={() => handleCheckboxChange(index)}
                    >
                      <div className="parents-info">
                        <span>{item.name} 학부모</span>
                        <input
                          type="checkbox"
                          checked={!!checkedItems[index]}
                          readOnly
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="create-group-chat-btn">채팅방 만들기</button>
            </>
          ) : null}
        </ChatWrapStyle>
      ) : null}
      {chatRoomOpen ? (
        <ChatRoom
          setChatRoomOpen={setChatRoomOpen}
          roomId={roomId}
          teaId={teaId}
          parentId={parentId}
          sender={sender}
          sendTime={sendTime}
        />
      ) : null}
    </>
  );
};

export default ChatList;
