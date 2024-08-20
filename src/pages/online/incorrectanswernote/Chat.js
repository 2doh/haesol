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
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "api/config";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import { useEffect, useState } from "react";
import botImg from "../../../images/graidentairobot.jpg";

const ChatWrap = styled.div`
  height: 350px;
  width: 300px;
  bottom: 80px;
  right: 110px;
  position: absolute;
  z-index: 99999999999999;

  /* z-index: 1; */
`;

const Chat = () => {
  // AI 이미지
  // const CHAT_BOT_IMAGE
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
        message: "",
        direction: "incoming",
      },
      avatar: {
        src: botImg,
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
        src: botImg,
        name: "bloodstrawberry",
      },
    },
  ];

  const [messages, setMessages] = useState(defaultMessage);

  // 현재 문제 번호에 대해서 저장해두기

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
    getResponseForGivenPrompt(input);

    let newMessage = {
      model: {
        message: input,
        direction: "outgoing",
      },
    };

    setMessages([...messages, newMessage]);
  };

  /** ai가 답변했을 때 */
  const handleBotAnswer = output => {
    let newMessage = {
      model: {
        message: output,
        direction: "incoming",
      },
      avatar: {
        src: botImg,
        name: "bloodstrawberry",
      },
    };

    setMessages([...messages, newMessage]);
  };

  const [outputValue, setOutputValue] = useState("");

  useEffect(() => {
    if (outputValue !== "") {
      handleBotAnswer(outputValue);
    }
  }, [outputValue]);

  // 챗봇 ai 영역 - start //
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // 여기에 당신의 API 키를 넣어주세요
  const genAI = new GoogleGenerativeAI(AI_KEY);

  const handleInputChange = e => {
    setInputValue(e);
  };

  const getResponseForGivenPrompt = async questionText => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // const result = await model.generateContent(
      //   `naver.com 들어가서 지금 뭐가 있는지 확인하고 설명할 수 있니??`,
      // );
      const result = await model.generateContent(questionText);
      setInputValue("");
      const response = result.response;
      const text = await response.text();
      console.log("답변 : ", text);
      setOutputValue(text);
      setPromptResponses([...promptResponses, text]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("문제가 생겼어요");
      setLoading(false);
    }
  };
  // 챗봇 ai 영역 - end //

  return (
    <ChatWrap>
      <MainContainer>
        <ChatContainer>
          <MessageList>{getMessageComponent(messages)}</MessageList>
          <MessageInput
            placeholder="물어보고 싶은 것을 말해주세요"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </ChatWrap>
  );
};

export default Chat;
