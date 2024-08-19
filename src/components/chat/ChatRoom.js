import styled from "@emotion/styled";
import { useEffect, useState } from "react";
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
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  // const [myMsg, setMyMsg] = useState("");
  const [sandingMsg, setSendingMsg] = useState("");
  const [receiveMsg, setReceiveMsg] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [receiveTime, setReceiveTime] = useState("");
  // 채팅 목록
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    console.log("roomId : ", roomId);
  }, [roomId]);

  // 키값 변경해서 넣기

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

  // const sendTime = () => {
  //   const now = new Date();
  //   const nowhours = String(now.getHours()).padStart(2, "0");
  //   const minutes = String(now.getMinutes()).padStart(2, "0");
  //   const meridiem = nowhours > 12 ? "오후" : "오전";
  //   // console.log(meridiem);
  //   if (meridiem === "오후") {
  //     const hours = nowhours - 12;
  //     // console.log(hours);
  //     const formattedTime = `${meridiem} ${hours}:${minutes}`;
  //     setNowTime(formattedTime);
  //   }
  // };

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
    await postCreateChat(postChatData);

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

  return (
    <>
      {/* 버튼 클릭하면 채팅창 나오게 */}
      <ChatWrapStyle>
        <div className="chat-header">
          {loginUserType === "ROLE_TEACHER" ? (
            <span>{parentId.name} 학부모</span>
          ) : (
            <span>{teaId.name} 선생님</span>
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
              item.isSender ? (
                <SendMsg
                  sender={sender}
                  sandingMsg={item.msg}
                  nowTime={item.sendTime}
                  key={index}
                />
              ) : (
                <ReceiveMsg
                  receiveMsg={item.message}
                  receiveTime={item.time}
                  key={index}
                />
              ),
            )
          ) : (
            <p>채팅 내역이 없습니다.</p>
          )}
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
    </>
  );
};

export default ChatRoom;
