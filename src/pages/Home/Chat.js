import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import styled from "@emotion/styled";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import { useEffect, useState } from "react";

const ChatWrap = styled.div`
  height: 350px;
  width: 300px;
  bottom: 80px;
  right: 110px;
  position: absolute;

  /* z-index: 1; */
`;

const Chat = () => {
  // 임시 이미지
  const AVATAR_IMAGE =
    "https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory3.daumcdn.net%2Ftistory%2F4431109%2Fattach%2F3af65be1d8b64ece859b8f6d07fafadc";

  useEffect(() => {
    /** 모달 생성시 스크롤 금지 */
    const prevScrollY = preventScroll();

    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  /** 디폴트 메세지 */
  const defaultMessage = [
    {
      model: {
        message: "How are you?",
        direction: "incoming",
      },
      avatar: {
        src: AVATAR_IMAGE,
        name: "bloodstrawberry",
      },
    },
    {
      model: {
        message: "I'm fine, thank you, and you?",
        direction: "outgoing",
      },
    },
    {
      model: {
        message: "I'm fine, too. thank you, and you?",
        direction: "incoming",
      },
      avatar: {
        src: AVATAR_IMAGE,
        name: "bloodstrawberry",
      },
    },
  ];

  const [messages, setMessages] = useState(defaultMessage);

  /** Message 컴포넌트 생성 기능 */
  const getMessageComponent = data => {
    return data.map((item, index) => {
      return (
        <Message key={index} model={item.model}>
          {item.avatar ? (
            <Avatar src={item.avatar.src} name={item.avatar.name} />
          ) : null}
        </Message>
      );
    });
  };

  // 전체 채팅 저장

  /** 전송 버튼 클릭시 이벤트, 새 메시지를 추가 */
  const handleSend = input => {
    let newMessage = {
      model: {
        message: input,
        direction: "outgoing",
      },
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <ChatWrap>
      <MainContainer>
        <ChatContainer>
          <MessageList>{getMessageComponent(messages)}</MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </ChatWrap>
  );
};

export default Chat;
