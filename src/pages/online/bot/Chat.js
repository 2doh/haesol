import {
  AttachmentButton,
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import ChatBot from "react-simple-chatbot";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import styled from "@emotion/styled";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "api/config";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import { useEffect, useState } from "react";
import botImg from "../../../images/graidentairobot.jpg";
import "../../../scss/bot/bot.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { useLocation, useNavigate } from "react-router";
import { getCookie, setCookie } from "utils/cookie";

const ChatOuter = styled.div`
  .chat-wrap-left {
    & > div {
      left: 0;
    }

    .chatbox {
      margin: 0 0 0 20px;
    }
  }
`;

const ChatWrap = styled.div`
  /* height: 350px; */
  /* width: 300px; */
  /* bottom: 80px; */
  /* right: 110px; */
  /* position: absolute; */
  z-index: 99999999999999;

  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  height: 0;

  .chatbox {
    width: 400px;
    height: 400px;
    margin: 0 20px 0 0;
    position: relative;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-flow: column;
    border-radius: 10px 10px 0 0;
    background: white;
    bottom: 0;
    /* transition: 0.1s ease-out; */
    transition: 0.3s ease-out;

    .chatbox-top {
      cursor: pointer;
      position: relative;
      display: flex;
      padding: 10px 10px;
      border-radius: 10px 10px 0 0;
      background: rgba(0, 0, 0, 0.05);
      max-height: 40px;

      .chatbox-avatar {
        img {
          border-radius: 50px;
          width: 125px;
          /* height: 20px; */
          position: relative;
          top: -105px;
          left: 25px;
        }
      }

      .chat-partner-name {
        flex: 1;
        padding-left: 40px;
        font-size: 15px;
        font-weight: bold;
        color: #30649c;
        text-shadow: 1px 1px 0 white;
        transition: 0.1s ease-out;
        a {
          font-size: 20px;
        }
      }
      .chatbox-icons {
        & * {
          font-size: 14px;
        }
        a {
          color: white;
        }

        .fa {
          background: rgba(220, 0, 0, 0.6);
          padding: 3px 5px;
          margin: 0 0 0 3px;
          color: white;
          border-radius: 0 5px 0 5px;
          transition: 0.3s;
        }
        .fa:hover {
          border-radius: 5px 0 5px 0;
          background: rgba(220, 0, 0, 1);
        }
        .fa:before {
          content: "\f068";
        }
      }
    }

    .chatbox-top-right {
      flex-direction: row-reverse;
    }

    .chat-messages {
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding: 10px;
      overflow: auto;
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      flex: 1;

      .cs-main-container {
        width: 100%;
        border: 0;
      }

      /* (공통) 말풍선 */
      .cs-message {
        width: 100% !important;
        margin: 0 0 15px;
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        overflow: revert;

        .cs-message__content {
          padding: 6px 10px;
          border-radius: 6px 0 6px 0;
          position: relative;
          background: rgba(100, 170, 0, 0.1);
          border: 2px solid rgba(100, 170, 0, 0.1);
          color: #6c6c6c;
          font-size: 12px;
        }
        .cs-message__content::after {
          content: "";
          position: absolute;
          border: 10px solid transparent;
          border-top: 10px solid rgba(100, 170, 0, 0.2);
          border-right: none;
          bottom: -22px;
          right: 10px;
        }

        .cs-message__content-wrapper {
          max-width: 85% !important;
        }

        .cs-message-input__content-editor-wrapper {
          font-size: 14px;
        }

        .cs-message__html-content {
          font-size: 15px;
        }
      }
      /* (이용자) 말풍선 */
      .cs-message--outgoing {
        align-items: flex-end;
        position: relative;
        right: -40px;

        .cs-message__content {
        }
      }
      /* (ai) 말풍선 */
      .cs-message--incoming {
        padding-top: 10px;
        align-items: flex-start;
        .cs-message__content {
          background: rgba(0, 114, 135, 0.1);
          border: 2px solid rgba(0, 114, 135, 0.1);
          align-self: flex-start;
        }
        .cs-message__content::after {
          right: auto;
          bottom: auto;
          top: -22px;
          left: 9px;
          border: 10px solid transparent;
          border-bottom: 10px solid rgba(0, 114, 135, 0.2);
          border-left: none;
        }
      }
      .cs-message-input__tools {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: center;
        .cs-button--attachment {
          display: none;
        }
      }
      .cs-message-input {
        border: 0;
      }
    }
  }

  /* 아래로 내리기 */
  .chatbox-min {
    margin-bottom: -362px;
  }
`;

const FirstChatWrap = styled.div`
  pointer-events: none;
  overflow: hidden;
  width: 100vw;
  height: calc(100vh + 70px);
  position: absolute;
  top: -70px;
  z-index: 1000000;

  .first-wrap-img {
    position: absolute;
    width: 100%;
    height: 100%;

    img {
      position: absolute;
      right: 280px;
      bottom: 215px;
    }
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modalSlice);
  /** 디폴트 메세지 */
  const defaultMessage = [
    {
      model: {
        message: "안녕하세요! 궁금한 내용을 입력해주세요.",
        direction: "incoming",
      },
      // avatar: {
      //   src: botImg,
      //   name: "chatbot",
      // },
    },
    // {
    //   model: {
    //     message: "I'm fine, thank you, and you?",
    //     direction: "outgoing",
    //   },
    // },
    // {
    //   model: {
    //     message: "I'm fine, too. thank you, and you?",
    //     direction: "incoming",
    //   },
    //   avatar: {
    //     src: botImg,
    //     name: "bloodstrawberry",
    //   },
    // },
  ];
  const [messages, setMessages] = useState(defaultMessage);

  console.log("messages : ", messages);

  // 현재 문제 번호에 대해서 저장해두기
  // 전체 채팅 저장

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

  const [messageAll, setMessageAll] = useState(
    "",
    // "[대답]은 너가 했던 대답이다. [질문]는 너에게 했던 질문이다. (여기서부터 대화 기록) [대답]안녕하세요! 궁금한 내용을 입력해주세요.",
  );
  // const [messageAll, setMessageAll] = useState(
  //   "대화 내용에 대한 설명 1 : 아래의 내용은 이때까지 대화이 저장된 것이다. 대화 내용에 대한 설명 2 : [대답]은 너가 했던 대답이다. 대화 내용에 대한 설명 3 : [질문]는 너에게 했던 질문이다. (여기서부터 대화 기록) [대답]안녕하세요! 궁금한 내용을 입력해주세요.",
  // );

  /** 전송 버튼 클릭시 이벤트, 새 메시지를 추가 */
  const handleSend = input => {
    setMessageAll([...messageAll, `${input}`]);
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
      // avatar: {
      //   src: botImg,
      //   name: "bloodstrawberry",
      // },
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

  /** 실제 ai : 메세지 전송 및 답변 */
  const getResponseForGivenPrompt = async questionText => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // const result = await model.generateContent(
      //   `naver.com 들어가서 지금 뭐가 있는지 확인하고 설명할 수 있니??`,
      // );
      const result = await model.generateContent(messageAll);
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

  // 채팅방 열려있는지 닫혀있는지 확인
  const [isOpen, setIsOpen] = useState(false);
  /** 오답노트 : 챗봇 여닫기 */
  // const openChatBot = () => {
  //   setIsOpen();
  // };

  // 첫 설명

  useEffect(() => {
    if (!getCookie("incorrectAnswerNoteGuide")) {
      const data = {
        headerText: "확인",
        bodyText: [
          `오답노트를 확인하고\n\n 모르는 부분에 대해서\n\n오른쪽 아래 챗봇을 클릭하여 질문해봅시다.`,
        ],
        buttonCnt: 1,
        buttonText: ["확인"],
        modalRes: [3],
      };

      dispatch(updateModalDate(data));
      dispatch(openModal("BasicModal"));
    }
  }, []);

  const [chatBotBtn, setChatBotBtn] = useState("right");
  /** 왼쪽으로 가기 버튼 */
  const chatBotLeftBtn = e => {
    // 부모 이벤트 막기
    e.stopPropagation();
    setChatBotBtn("left");
    onOff();
  };
  /** 오른쪽으로 가기 버튼 */
  const chatBotRightBtn = e => {
    // 부모 이벤트 막기
    e.stopPropagation();
    setChatBotBtn("right");
    onOff();
  };

  const onOff = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatOuter>
      {getCookie("incorrectAnswerNoteGuide") ? null : (
        <FirstChatWrap>
          <div className="first-wrap-img">
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Backhand%20Index%20Pointing%20Down%20Medium-Light%20Skin%20Tone.png"
              alt="Backhand Index Pointing Down Medium-Light Skin Tone"
              width="180"
              height="180"
            />
          </div>
        </FirstChatWrap>
      )}

      <div
        className={
          chatBotBtn === "right" ? "chat-wrap-right" : "chat-wrap-left"
        }
      >
        <ChatWrap>
          {/* <div className="chatbox chatbox-min"> */}
          <div className={isOpen ? "chatbox" : "chatbox chatbox-min"}>
            {/* header 영역 - start */}
            <div
              className={
                chatBotBtn === "right"
                  ? "chatbox-top chatbox-top-right"
                  : "chatbox-top chatbox-top-left"
              }
              onClick={() => {
                onOff();
              }}
            >
              <div className="chatbox-avatar">
                <img src={botImg} />
              </div>
              <div className="chat-partner-name">
                <span className="status donot-disturb"></span>
                <a target="_blank">질문하기</a>
              </div>

              <div
                className="chatbox-icons"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {chatBotBtn === "right" ? (
                  <a
                    href="javascript:void(0);"
                    onClick={e => {
                      chatBotLeftBtn(e);
                    }}
                  >
                    <i className="fa fa-minus">왼쪽으로 가기</i>
                  </a>
                ) : null}
                {chatBotBtn === "left" ? (
                  <a
                    href="javascript:void(0);"
                    onClick={e => {
                      chatBotRightBtn(e);
                    }}
                  >
                    <i className="fa fa-close">오른쪽으로 가기</i>
                  </a>
                ) : null}
              </div>
            </div>
            {/* header 영역 - end */}

            {/* 채팅 영역 - start */}
            <div className="chat-messages">
              <MainContainer>
                <ChatContainer>
                  <MessageList>{getMessageComponent(messages)}</MessageList>
                  <MessageInput attachButton={false} />

                  <MessageInput
                    placeholder="물어보고 싶은 것을 말해주세요"
                    onSend={handleSend}
                  />
                  <TypingIndicator />
                </ChatContainer>
              </MainContainer>
            </div>
          </div>
        </ChatWrap>
      </div>
    </ChatOuter>
  );
};

export default Chat;
