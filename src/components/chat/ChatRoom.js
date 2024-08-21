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

const ChatRoom = ({ setChatRoomOpen, roomId, socket }) => {
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  const [sandingMsg, setSendingMsg] = useState("");
  // 채팅 목록
  const [chatList, setChatList] = useState([]);
  const [loginUserName, setLoginUserName] = useState("");

  // 스크롤 아래로
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  // 채팅방 아이디
  useEffect(() => {
    console.log("roomId : ", roomId);
  }, [roomId]);

  // 웹소켓 연결 설정
  useEffect(() => {
    if (socket) {
      // 방에 참가
      socket.emit("joinRoom", { roomId, userName: loginUserName });

      // 서버에서 새로운 메시지를 수신
      socket.on("receiveMessage", messageData => {
        setChatList(prevChatList => [...prevChatList, messageData]);
      });

      return () => {
        // 방을 떠날 때
        socket.emit("leaveRoom", roomId);
        socket.off("receiveMessage"); // 이벤트 리스너 제거
      };
    }
  }, [socket, roomId, loginUserName]);

  // 특정 채팅방 내용 get
  const getAllChatList = async () => {
    try {
      const result = await getChatRoom(roomId);
      // setChatList(result || []);
      if (result && result.length > 0) {
        setChatList(result[0].messages || []);
        setLoginUserName(result[0].loginUserName);
      }
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

  // 채팅 보내기
  // const sendChat = async () => {
  //   if (sandingMsg.trim() === "") {
  //     // 빈 메시지나 공백만 있는 메시지는 전송하지 않음
  //     return;
  //   }

  //   const postChatData = {
  //     msg: sandingMsg,
  //     roomId,
  //   };
  //   try {
  //     await postCreateChat(postChatData);
  //     await getAllChatList();
  //     setSendingMsg("");
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const now = new Date();
  //   const nowhours = String(now.getHours()).padStart(2, "0");
  //   const minutes = String(now.getMinutes()).padStart(2, "0");
  //   const meridiem = nowhours >= 12 ? "오후" : "오전";
  //   const hours =
  //     meridiem === "오후" && nowhours > 12 ? nowhours - 12 : nowhours;
  //   const formattedTime = `${meridiem} ${hours}:${minutes}`;
  //   setNowTime(formattedTime);

  //   // 채팅 리스트에 메시지 추가
  //   const newMessage = {
  //     message: sandingMsg,
  //     time: formattedTime,
  //     isSender: true, // 보낸 메시지인지 여부
  //   };

  //   setChatList(prevChatList => [...prevChatList, newMessage]);
  //   setSendingMsg(""); // 메시지 입력 후 초기화
  // };

  // console.log("teaId:", teaId);
  // console.log("parentId:", parentId);

  const sendChat = async () => {
    if (sandingMsg.trim() === "") return;

    const messageData = {
      roomId,
      msg: sandingMsg,
    };

    try {
      // Axios로 메시지 전송
      await postCreateChat(messageData);

      // 전송이 완료되면 로컬 채팅 목록에 메시지 추가
      setChatList(prevChatList => [...prevChatList, messageData]);
      setSendingMsg(""); // 메시지 입력창 초기화
    } catch (error) {
      console.log(error);
    }

    // 메시지를 서버로 전송
    socket.emit("sendMessage", messageData);

    // 메시지를 채팅 리스트에 추가
    setChatList(prevChatList => [...prevChatList, messageData]);
    setSendingMsg(""); // 메시지 입력창 초기화
  };

  let lastMessageDate = ""; // 이전 메시지의 날짜를 저장

  return (
    <ChatWrapStyle>
      <div className="chat-header">
        <span>
          {/* 조건부 렌더링을 통해 안전하게 데이터에 접근 */}
          {loginUserName !== chatList[0]?.sender
            ? // 상대방이 선생님일 경우
              `${chatList[0]?.teaId?.name || ""} 선생님`
            : // 상대방이 학부모일 경우
              `${chatList[0]?.parents?.map(parent => parent.name).join(", ") || ""} 학부모`}
        </span>
        <IoClose
          size={30}
          className="close-icon"
          onClick={() => setChatRoomOpen(false)}
        />
      </div>

      <div className="chat-field">
        {Array.isArray(chatList) && chatList.length > 0 ? (
          chatList.map((messages, msgIndex) => {
            const currentMessageDate = formatDate(messages.sendTime);
            const isNewDate = currentMessageDate !== lastMessageDate;
            lastMessageDate = currentMessageDate;

            const isSender = loginUserName === messages.sender;

            return (
              <div className="chat-text-box-wrap" key={msgIndex}>
                {isNewDate && (
                  <div className="date-separator">
                    <p>{currentMessageDate}</p>
                  </div>
                )}
                {isSender ? (
                  <SendMsg
                    sandingMsg={messages.msg}
                    nowTime={formatTime(messages.sendTime)}
                  />
                ) : (
                  <ReceiveMsg
                    receiveMsg={messages.msg}
                    receiveTime={formatTime(messages.sendTime)}
                  />
                )}
              </div>
            );
          })
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
