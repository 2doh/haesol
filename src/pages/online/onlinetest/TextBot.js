import styled from "@emotion/styled";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "api/config";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import botImg from "../../../images/graidentairobot.jpg";
import { useNavigate } from "react-router";

const TextBotWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 60px;

  .bot-img-div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    img {
      border-radius: 50px;
      width: 300px;
      height: 300px;
    }
    a {
      text-align: center;
    }
  }

  p {
    width: 100%;
    min-height: 173px;
    height: fit-content;
    // layout
    position: relative;
    max-width: 48em;

    // looks
    background-color: #fff;
    padding: 2.125em 2.5em;
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

  .container {
    padding-bottom: 30px;
  }
  .re-text-wrap {
    min-height: 80px;
    word-break: auto-phrase;
    display: flex;
    flex-direction: column;
    gap: 7px;

    * {
      font-size: 18px;
    }
  }

  .bot-speech-bubble-btns {
    padding: 10px 0;
  }
`;

const TextBot = ({ testResText, setIsRecommend, isRecommend }) => {
  const navigate = useNavigate();
  const [promptResponses, setPromptResponses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // 나눈 문자열을 배열로 저장
  const [sentences, setSentences] = useState([]);

  // 여기에 당신의 API 키를 넣어주세요
  const genAI = new GoogleGenerativeAI(AI_KEY);

  // AI
  const getResponseForGivenPrompt = async () => {
    const exText = `(답변 예시 시작)
  테스트 결과 성취 비율 40% 미만으로 수해력 수준은 초등 1학년 중에서 하 수준입니다.
초등 수해력 교재의 트고하된 개념 설명을 바탕으로 기초부터 차근차근 시작하는 것이 가장 학습 효과가 좋습니다.

테스트 결과 성취 비율 40% 미만으로 문해력 수준은 초등 1학년 중에서 하 수준입니다.
ERI 지수 300 ~ 400의 독해 교재와 3단계 교재부터 차근차근 시작하는 것이 가장 학습 효과가 좋습니다.

문해력의 수준이 해당 학년 평균에 미치지 못합니다.

어휘 이해, 핵심 정보 파악, 내용 구조화, 내용 요약 능력이 전반적으로 부족합니다. 글을 읽을 때 건너뛰며 대충 읽지 않는지 확인해 보세요. 그림이 많은 책부터 시작해 짧은 글 읽기에 꾸준히 도전해 보세요. 교과서 읽기부터 시작하는 것도 좋습니다. 이해가 안 된다고 쉽게 포기하지 말고 다시 한 번 천천히 읽어 보세요. 글을 읽고 난 후 내용을 부모님이나 친구에게 설명해 보는 것도 문해력을 기르는 데 도움이 됩니다. <초등 문해력 한 문장 정리의 힘> 1권 기초 단계부터 천천히 학습하길 권장합니다.

글에서 만난 새로운 단어를 이해하는 능력이 부족합니다. 이솝우화나 전래동화 등의 짧은 문학을 읽으며 글에서 만나는 모르는 단어의 뜻을 추측해 보세요. 추측한 뜻이 맞는지 사전에서 정확한 뜻을 확인해 나가다 보면 어휘력을 키우는 데 도움이 됩니다. 평소 생활할 때 만나는 모르는 어휘들도 관심을 갖는 연습을 해 보세요.

글의 중심 낱말을 파악하는 능력이 평이한 수준입니다. 글을 읽으면서 글에서 중요하게 다루는 낱말이 무엇인지 찾아보는 훈련을 계속해 보세요. 중심 낱말이라고 생각되는 낱말을 찾았다면 모든 문장과 잘 연결되는지 다시 한 번 생각해보세요. <초등 문해력 한 문장 정리의 힘>의 다양한 글을 읽으며 핵심 단어를 찾는 연습을 하시기 바랍니다.

글에서 중심 문장을 파악하는 능력이 부족합니다. 글의 중심 낱말을 파악하고 있는지 먼저 확인하고, 중심 낱말 찾기를 먼저 학습하세요. 훈련이 된 후에는 짧은 글에서 중심 문장 찾는 훈련을 먼저 해 나가시기 바랍니다. 글을 읽을 때 문단마다 가장 중요한 문장을 하나씩 고르는 연습을 해 보세요. <초등 문해력 한 문장 정리의 힘> 기초 단계의 학습 길잡이를 통해 중심 문장 찾는 법을 익히고, 이를 실제 문제에 적용하여 가장 중요한 문장 찾는 연습을 하시기 바랍니다.

글을 읽고 내용을 구조적으로 간추리는 능력이 부족합니다. 먼저 글을 읽은 뒤에는 글에서 무엇을 말하고자 하는지 머릿속으로 떠올려 보세요. <초등 문해력 한 문장 정리의 힘> 기초 단계의 학습 길잡이를 통해 내용을 간추리는 방법을 익히고 이를 실제 문제에 적용하여 내용을 간추리는 연습을 하시기 바랍니다.

글을 읽고 핵심 내용을 파악하여 이를 한 문장으로 요약하는 데 어려움이 있습니다. 먼저 말로 충분히 연습한 후 문장으로 써 보세요. 글에서 덜 중요해 보이는 부분을 하나씩 선을 그어 지워 보세요. <초등 문해력 한 문장 정리의 힘> 기초, 연습 단계를 통해 중심 낱말 찾기, 중심 문장 찾기, 내용 간추리기를 먼저 학습하세요.

어휘 능력이 부족합니다. 다양한 책을 읽으며 낱말을 하나씩 익히기 바랍니다. 다만 책을 펼쳤을 때 한 페이지에 모르는 낱말이 다섯 개 이상 나오는 책은 너무 어려운 책이니 가급적이면 피하고, 쉽게 읽을 수 있는 책부터 차근차근 읽어 나가기 바랍니다.

이해 능력이 부족합니다. 글을 이해하지 못하면 의미 있는 독서를 할 수 없습니다. 책을 한 번만 읽고서는 독서의 효과를 온전히 다 누릴 수 없습니다. 책을 처음부터 끝까지 다 읽은 다음, 다시 한번 책을 읽어 보기를 바랍니다. 책을 한 번 읽었을 때와 두 번 읽었을 때의 느낌이 달라질 뿐만 아니라, 놓친 내용도 파악할 수 있을 것입니다.

추론 능력이 부족합니다. 추론 문제를 잘 풀지 못했다고 해서 의기소침해할 필요는 없습니다. 먼저 책을 잘 읽을 수 있다는 자신감을 가질 수 있도록 쉽고 재미있는 책을 한 권 골라 읽어 나가기 바랍니다. 책을 읽을 때 핵심 내용을 파악하고 원인과 결과, 숨겨진 의미 등을 생각하며 읽으면 도움이 될 것입니다.

비판 종합 사고 능력이 부족합니다. 책을 읽을 때 ‘왜’라는 질문을 던지며 책을 읽어 나가기 바랍니다. 혼자서 이런 활동이 잘 되지 않으니 또래와 함께 책 읽기를 권합니다. 질문을 만들어 내는 과정과 답을 찾는 과정이 바로 비판력과 사고력을 높이는 과정이 되기도 합니다.

  (답변 예시 끝)
  `;

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        `${testResText} 앞의 내용을 참고해서 총 문제 중 틀린 문제의 개수와 가장 많이 틀린 문제의 유형을 모두 이야기하고, 가장 많이 틀린 유형들의 각 유형에 대한 초등학생을 위한 공부법을 최대 4문장이내로 초등학생이 이해할 수 있게 분석한것같이 존댓말로 말하듯이 대답해줘. 대답할 때는 *, : 와 같은 기호를 절대 사용하면 안되고. 한 문장마다 문장 끝에 반드시 /를 넣어야 한다. 문제 유형 별로 틀린 문제의 번호를 전부 말해줘...`,
      );
      setInputValue("");
      const response = result.response;
      const text = await response.text();
      console.log(text);
      setPromptResponses([...promptResponses, text]);

      // 문자열을 문장 단위로 나누기
      setSentences(text.split("/"));

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("문제가 생겼어요");
      setLoading(false);
    }
  };

  const movePage = () => {
    navigate("/online/test/note");
  };

  // 최소 랜더링
  useEffect(() => {
    if (testResText) {
      getResponseForGivenPrompt();
    }
  }, [testResText]);

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
          {/* 분석 */}
          <div className="re-text-wrap">
            {loading ? (
              <div className="text-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">로딩중...</span>
                  {/* // 당신의 질문에 대한 답변이 생성되는 동안에 표시되는 메시지 */}
                </div>
              </div>
            ) : (
              sentences.map((item, index) => <div key={index}>{item}</div>)
            )}
          </div>
        </div>

        {/* 하단 */}
        <div className="bot-speech-bubble-btns">
          <button
            onClick={() => {
              setIsRecommend(!isRecommend);
              // setIsRecommend(true);
            }}
          >
            시험 끝내기
          </button>
          <button
            onClick={() => {
              movePage();
            }}
          >
            오답 노트 보기
          </button>
        </div>
      </p>
    </TextBotWrap>
  );
};

export default TextBot;
