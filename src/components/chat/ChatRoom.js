import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "../../scss/chat/chat.scss";
import SendMsg from "./SendMsg";
import { IoClose } from "react-icons/io5";
import ReceiveMsg from "./ReceiveMsg";
import { getCookie } from "utils/cookie";
import { getChatRoom, postCreateChat } from "api/chat/chatapi";

const ChatWrapStyle = styled.div`
  position: relative;
  z-index: 999999;
  margin: 20px;
  width: 360px;
  height: 570px;
  /* height: 770px; */
  overflow: hidden;
  border-radius: 20px;
  /* box-shadow: 0 0 10px; */
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  .chat-header {
    height: 15%;
    background-color: #5f909f;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    span {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
    }
    .close-icon {
      path {
        color: white;
      }
    }
  }
  .chat-field {
    overflow-y: scroll;
    height: 70%;
    padding: 15px;
    background-color: #dee8e9;
    .chat-text-box-wrap {
      display: flex;
      flex-direction: column;
      gap: 30px;
      font-size: 11px;
      .date-separator {
        display: flex;
        justify-content: center;
        p {
          color: #646b8c;
        }
      }
    }
  }
  .chat-input-style {
    height: 15%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 10px;
  }
`;

const ChatRoom = ({ setChatRoomOpen, roomId, sender, teaId, parentId }) => {
  // console.log("teaId : ", teaId);
  // console.log("parentId : ", parentId);
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const [loginUserId, setLoginUserId] = useState(getCookie("userIdPk"));
  // const [myMsg, setMyMsg] = useState("");
  const [sandingMsg, setSendingMsg] = useState("");
  const [receiveMsg, setReceiveMsg] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [receiveTime, setReceiveTime] = useState("");
  // 채팅 목록
  const [chatList, setChatList] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  useEffect(() => {
    console.log("roomId : ", roomId);
  }, [roomId]);

  // 특정 채팅방 내용 get
  const getAllChatList = async () => {
    try {
      const result = await getChatRoom(roomId);
      setChatList(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllChatList();
  }, [roomId]);

  // 날짜 및 시간 포맷 함수
  const formatTime = dateString => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const meridiem = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours > 12 ? hours - 12 : hours;

    return `${meridiem} ${formattedHours}:${minutes}`;
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  // 특정 부모의 이름을 추출하는 함수
  const getParentNameBySender = (parents, sender) => {
    const parent = parents.find(parent => parent.name === sender);
    return parent ? parent.name : "정보 없음";
  };

  // 채팅 보내기
  const sendChat = async () => {
    if (sandingMsg.trim() === "") {
      // 빈 메시지나 공백만 있는 메시지는 전송하지 않음
      return;
    }

    const postChatData = {
      msg: sandingMsg,
      roomId,
    };
    try {
      await postCreateChat(postChatData);
      await getAllChatList();
      setSendingMsg("");
    } catch (error) {
      console.log(error);
    }

    const now = new Date();
    const nowhours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const meridiem = nowhours >= 12 ? "오후" : "오전";
    const hours =
      meridiem === "오후" && nowhours > 12 ? nowhours - 12 : nowhours;
    const formattedTime = `${meridiem} ${hours}:${minutes}`;
    setNowTime(formattedTime);

    // 채팅 리스트에 메시지 추가
    const newMessage = {
      message: sandingMsg,
      time: formattedTime,
      isSender: true, // 보낸 메시지인지 여부
    };

    setChatList(prevChatList => [...prevChatList, newMessage]);
    setSendingMsg(""); // 메시지 입력 후 초기화
  };

  // 첫 번째 항목의 부모님이나 선생님 정보 가져오기
  const chatHeaderInfo = chatList.length > 0 && chatList[0];
  let lastMessageDate = ""; // 이전 메시지의 날짜를 저장

  return (
    // {/* 버튼 클릭하면 채팅창 나오게 */}
    <ChatWrapStyle>
      <div className="chat-header">
        {loginUserType === "ROLE_TEACHER" ? (
          <span>
            {chatHeaderInfo?.parents?.map(parent => parent.name).join(", ") ||
              "정보 없음"}{" "}
            학부모
          </span>
        ) : (
          <span>{chatHeaderInfo?.teaId?.name || "정보 없음"} 선생님</span>
        )}

        <IoClose
          size={30}
          className="close-icon"
          onClick={() => {
            setChatRoomOpen(false);
          }}
        />
      </div>
      <div className="chat-field">
        {Array.isArray(chatList) && chatList.length > 0 ? (
          chatList.map((item, index) =>
            Array.isArray(item.messages) && item.messages.length > 0 ? (
              item.messages.map((message, msgIndex) => {
                const currentMessageDate = formatDate(message.sendTime);
                const isNewDate = currentMessageDate !== lastMessageDate;
                lastMessageDate = currentMessageDate;

                const isSender =
                  loginUserType === "ROLE_TEACHER"
                    ? message.sender === item.teaId?.name // 선생님인 경우
                    : getParentNameBySender(item.parents, message.sender); // 학부모인 경우

                // console.log("로그인한 사용자 ID:", loginUserId);
                // console.log("메시지 발신자:", message.sender);
                // console.log("parentsId:", item.parentsId);

                return (
                  <div
                    className="chat-text-box-wrap"
                    key={`${index}-${msgIndex}`}
                  >
                    {isNewDate && (
                      <div className="date-separator">
                        {/* 날짜가 바뀔 때마다 출력 */}
                        <p>{currentMessageDate}</p>
                      </div>
                    )}
                    {isSender ? (
                      <SendMsg
                        sandingMsg={message.msg}
                        nowTime={formatTime(message.sendTime)}
                      />
                    ) : (
                      <ReceiveMsg
                        receiveMsg={message.msg}
                        receiveTime={formatTime(message.sendTime)}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <p key={index}></p>
            ),
          )
        ) : (
          <p>채팅 내역이 없습니다.</p>
        )}
        <div ref={scrollRef}></div>
      </div>

      <div className="chat-input-style">
        <form
          className="chat-wrap"
          onSubmit={e => {
            e.preventDefault();
            sendChat();
          }}
        >
          <textarea
            className="chat-input"
            value={sandingMsg}
            onChange={e => {
              setSendingMsg(e.target.value);
            }}
          ></textarea>
          <div
            className="chat-sendbtn br5"
            onClick={() => {
              sendChat();
            }}
          >
            전송
          </div>
        </form>
      </div>
    </ChatWrapStyle>
  );
};

export default ChatRoom;
