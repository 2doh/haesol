import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "../../scss/chat/chat.scss";
import SendMsg from "./SendMsg";
import { IoClose } from "react-icons/io5";
import ReceiveMsg from "./ReceiveMsg";

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

const ChatParents = ({ setChatRoomOpen }) => {
  // const [myMsg, setMyMsg] = useState("");
  const [sandingMsg, setSendingMsg] = useState("");
  const [receiveMsg, setReceiveMsg] = useState("");
  const [nowTime, setNowTime] = useState("");
  const [receiveTime, setReceiveTime] = useState("");

  // 채팅 목록
  const [chatList, setChatList] = useState([]);
  // 키값 변경해서 넣기

  // 전체 채팅 목록 부르기
  // const 전체대화내역 = async () => {
  //   const result = await 채팅getapi();
  //   setChatList(result.data.resultData)
  // }
  // useEffect(() => {
  //   전체대화내역();
  // }, []);

  // 채팅 추가 함수
  // const addChat = async () => {
  //   const sendChatData = {
  //     키값 : 키명,
  //     키값 : 키명,
  //   }
  //   const result = await post채팅추가api();
  //   전체대화내역();
  // };

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

  const sendTime = () => {
    if (sandingMsg.trim() === "") {
      // 빈 메시지나 공백만 있는 메시지는 전송하지 않음
      return;
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

  return (
    <>
      {/* 버튼 클릭하면 채팅창 나오게 */}
      <ChatWrapStyle>
        <div className="chat-header">
          <span>몇 반 김누구 선생님</span>
          <IoClose
            size={30}
            className="close-icon"
            onClick={() => {
              setChatRoomOpen(false);
            }}
          />
        </div>
        <div className="chat-field">
          {chatList.map((item, index) =>
            item.isSender ? (
              <SendMsg
                sandingMsg={item.message}
                nowTime={item.time}
                key={index} // 채팅 하나하나 구분하는 pk 값 넣기
              />
            ) : (
              <ReceiveMsg
                receiveMsg={item.message}
                receiveTime={item.time}
                key={index} // 채팅 하나하나 구분하는 pk 값 넣기
              />
            ),
          )}
        </div>

        <div className="chat-input-style">
          <form
            className="chat-wrap"
            onSubmit={e => {
              e.preventDefault();
              sendTime();
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
                sendTime();
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

export default ChatParents;
