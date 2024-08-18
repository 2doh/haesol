import styled from "@emotion/styled";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "api/config";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import botImg from "../../../images/graidentairobot.jpg";

const TextBotWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 60px;

  img {
    border-radius: 50px;
    width: 300px;
    height: 300px;
  }

  p {
    min-height: 173px;
    height: fit-content;
    // layout
    position: relative;
    max-width: 48em;

    // looks
    background-color: #fff;
    padding: 1.125em 1.5em;
    font-size: 1.25em;
    border-radius: 1rem;
    box-shadow:
      0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
      0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
  }

  p::before {
    // layout
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    /* left: 1.5em; */
    // offset should move with padding of parent
    border: 0.75rem solid transparent;
    /* border-top: none; */

    // looks
    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));

    /* 새로 추가된 css */
    left: 0;
    top: 50%;
    border: 20px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -20px;
  }
`;

const TextBot = () => {
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  // 여기에 당신의 API 키를 넣어주세요
  const genAI = new GoogleGenerativeAI(AI_KEY);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("네 이름이 뭐니?");
      //   const result = await model.generateContent(inputValue);
      setInputValue("");
      const response = result.response;
      const text = response.text();
      console.log(text);
      setpromptResponses([...promptResponses, text]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("문제가 생겼어요");
      setLoading(false);
    }
  };

  return (
    <TextBotWrap>
      <div className="bot-img-div">
        <img src={botImg} />
        <a href="https://kr.freepik.com/free-vector/graident-ai-robot-vectorart_125887871.htm#fromView=search&page=1&position=1&uuid=40fa22be-b6bc-45f0-8042-4d16889e1316">
          작가 juicy_fish 출처 Freepik
        </a>
      </div>
      <p>
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="물어보고 싶은 것을 말해주세요"
                className="form-control"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={getResponseForGivenPrompt}
                className="btn btn-primary"
              >
                전송
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">로딩중...</span>
                {/* // 당신의 질문에 대한 답변이 생성되는 동안에 표시되는 메시지 */}
              </div>
            </div>
          ) : (
            promptResponses.map((promptResponse, index) => (
              <div key={index}>
                <div
                  className={`response-text ${index === promptResponses.length - 1 ? "fw-bold" : ""}`}
                >
                  {promptResponse}
                </div>
                {/* // 가장 최근 응답이 굵게 표시됩니다 */}
              </div>
            ))
          )}
        </div>
        <div>
          <div>책 추천</div>
          <div>오답노트</div>
        </div>
      </p>
    </TextBotWrap>
  );
};

export default TextBot;
