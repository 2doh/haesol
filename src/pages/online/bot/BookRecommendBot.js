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

const BookListWrap = styled.div``;

const BookRecommendBot = ({ mostMistakesTypes, isRecommend }) => {
  // ai가 한 말 저장

  // 여기에 당신의 API 키를 넣어주세요
  const genAI = new GoogleGenerativeAI(AI_KEY);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // 최초 랜더링
  useEffect(() => {
    if (mostMistakesTypes[0] === "없음") {
      getResponseForGivenPrompt("수준이 높은 초등학생 수학 도서를 추천해줘.");
    } else {
      //   console.log("mostMistakesTypes : ", mostMistakesTypes);
      getResponseForGivenPrompt(
        `구글링해서 ${mostMistakesTypes}에 관련된 초등학생 수준의 실제 한국에서 판매중인 도서 이름을 알려줘. 추천해준 이름으로 검색했을 때 이름이 제대로 나와야한다.`,
      );
    }
  }, [isRecommend]);

  /** 실제 ai : 책추천 */
  const getResponseForGivenPrompt = async text => {
    let qu = text;
    console.log("text : ", text);
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(qu);
      setInputValue("text");
      const response = result.response;
      const text = await response.text();
      console.log("답변 : ", text);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("문제가 생겼어요");
      setLoading(false);
    }
  };

  return (
    <BookListWrap>
      {/* <div className="chatbox chatbox-min"> */}
      <div className="chat-recommend-book-list-wrap">
        {/* 채팅 영역 - start */}
        <div className="chat-recommend-book-list">네?</div>
      </div>
    </BookListWrap>
  );
};

export default BookRecommendBot;
