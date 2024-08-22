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

const ChatRoom = ({ setChatRoomOpen, roomId }) => {
  // 전체 채팅방 데이터를 저장
  const [chatRoomData, setChatRoomData] = useState(null);
  // 채팅 목록
  const [chatList, setChatList] = useState([]);
  const [sandingMsg, setSendingMsg] = useState("");
  // const [loginUserName, setLoginUserName] = useState("");
  const loginUserName = decodeURIComponent(getCookie("userName"));
  // const userName = getCookie("userName");

  // 스크롤 아래로
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  // // 웹소켓 연결 설정
  // useEffect(() => {
  //   if (socket) {
  //     // 방에 참가
  //     socket.emit("joinRoom", { roomId, userName: loginUserName });

  //     // 서버에서 새로운 메시지를 수신
  //     socket.on("receiveMessage", messageData => {
  //       setChatList(prevChatList => [...prevChatList, messageData]);
  //     });

  //     return () => {
  //       // 방을 떠날 때
  //       socket.emit("leaveRoom", roomId);
  //       socket.off("receiveMessage"); // 이벤트 리스너 제거
  //     };
  //   }
  // }, [socket, roomId, loginUserName]);

  // 특정 채팅방 내용 get
  const getAllChatList = async () => {
    try {
      const result = await getChatRoom(roomId);
      if (result && result.length > 0) {
        setChatRoomData(result[0]);
        setChatList(result[0].messages || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 채팅 내역을 일정 간격으로 갱신
  useEffect(() => {
    getAllChatList(); // 초기 데이터 로드

    // 3초 간격으로 데이터를 갱신
    const interval = setInterval(() => {
      getAllChatList();
    }, 3000);

    // 컴포넌트 언마운트 시 인터벌 제거
    return () => clearInterval(interval);
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

  const sendChat = async () => {
    // e.preventDefault();
    if (sandingMsg.trim() === "") return;

    const currentTime = new Date();

    const messageData = {
      roomId,
      msg: sandingMsg,
      sender: loginUserName,
      sendTime: currentTime.toISOString(),
    };

    try {
      // Axios로 메시지 전송
      await postCreateChat(messageData);

      setChatList(prevChatList => [...prevChatList, messageData]);
      setSendingMsg(""); // 메시지 입력창 초기화
    } catch (error) {
      console.log(error);
    }
  };

  let lastMessageDate = ""; // 이전 메시지의 날짜를 저장

  const getChatHeaderName = () => {
    if (!chatRoomData) return "";

    // teaId(선생님)와 parents(학부모) 정보를 비교해서 로그인한 유저가 아닌 사람의 이름을 찾음
    const otherParticipants = [];

    if (chatRoomData.teaId.name !== loginUserName) {
      otherParticipants.push(chatRoomData.teaId.name);
    }

    chatRoomData.parents.forEach(parent => {
      if (parent.name !== loginUserName) {
        otherParticipants.push(parent.name);
      }
    });

    return otherParticipants.join(", ");
  };

  return (
    <ChatWrapStyle>
      <div className="chat-header">
        <span>{getChatHeaderName()}</span>
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
                    receiverName={messages.sender}
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
        <div className="chat-wrap">
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
        </div>
      </div>
    </ChatWrapStyle>
  );
};

export default ChatRoom;
