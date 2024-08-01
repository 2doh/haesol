import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import items from "../../api/json/gisa2020_01.json";

const TestQuestionWrap = styled.div`
  height: 100%;
  padding: 20px;

  .test-question-inner {
    width: 100%;
    height: 100%;
    border: 1px solid #1b6a78;
    padding: 20px;

    display: flex;
    flex-direction: column;

    .question-text {
      width: 100%;
    }

    .question-pic {
    }
  }
`;

const TestQuestion = () => {
  // 모든 시험 문제 저장
  const [questionAll, setQuestionAll] = useState([]);

  // 문제 수
  const [remainingQuestions, setRemainingQuestions] = useState(0);

  // 상태 변수 설정
  const [selectedValue, setSelectedValue] = useState("");

  const quizRef = useRef(null);
  const omrRef = useRef(null);

  useEffect(() => {
    dataQuestion();
  }, []);

  // 나중에 BE에서 불러오는 데이터로 변경하기(받아와야할 정보 : 문제 번호, 문제 내용, 답안 내용)
  // 나중에 BE에서 불러오는 데이터로 변경하기(보내야할 정보 : 문제 번호, 문제 내용, 작성한 답안 내용)
  // 문제 선택지는 정답 이외에는 랜덤이어야한다.(오답 선택지의 값이 랜덤이 아니더라도 최소 순서는 랜덤이어야한다.)
  /** JSON 불러오기 */
  const dataQuestion = () => {
    const formattedQuestions = items.map((item, index) => {
      /** 문제 번호 매기기, 문제 개별로 저장 */
      const formattedQuestion = {
        number: index + 1,
        question: item.question,
        answer: item.correct_answer,
      };

      // console.log("날 정보 : ", item);
      // console.log("문제 번호 매기기, 개별 저장 : ", formattedQuestion);

      const answerChoices = [...item.incorrect_answers];

      formattedQuestion.Answer =
        Math.floor(Math.random() * answerChoices.length) + 1;
      answerChoices.splice(
        formattedQuestion.Answer - 1,
        0,
        item.correct_answer,
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      // if (item.question_desc) {
      //   formattedQuestion.questionDesc = item.question_desc;
      // }
      if (item.question_img) {
        formattedQuestion.questionImg = item.question_img;
      }
      // if (item.desc) {
      //   formattedQuestion.desc = item.desc;
      // }

      return formattedQuestion;
    });

    setQuestionAll(formattedQuestions);
    // generateQuestionComponents(formattedQuestions);
  };

  // quiz = omr 체크 동기화
  const answerSelect = e => {
    setSelectedValue(e.target.value);
  };

  // 남은 문항 계산하기
  const updateRemainingQuestions = answeredCount => {
    const totalQuestions = questionAll.length;
    setRemainingQuestions(totalQuestions - answeredCount);
  };

  return (
    <TestQuestionWrap>
      <div className="test-question-inner">
        <div className="question-text cbt__quiz">
          {questionAll.map((item, index) => (
            <div className="cbt" key={index}>
              <div className="cbt__question">
                <span>{item.number}</span>. {item.question || ""}
              </div>
              <div className="cbt__question__img">
                {/* $
                {question.questionImg
                  ? `<img src="https://kebab000.github.io/web2023/gineungsaJPG/${question.questionImg}.jpg" alt="시험이미지">`
                  : ""} */}
              </div>
              {/* <div className="cbt__question__desc">{item.question || ""}</div> */}
              <div
                className="cbt__selects"
                ref={quizRef}
                onChange={e => {
                  answerSelect(e);
                }}
              >
                <input
                  type="radio"
                  checked={selectedValue === `${item.number}_1`}
                  id={`select${item.number}_1`}
                  name={`select${item.number}`}
                  value={`${item.number}_1`}
                />
                <label htmlFor={`select${item.number}_1`}>
                  <span>{item.choice1}</span>
                </label>
                <input
                  type="radio"
                  checked={selectedValue === `${item.number}_2`}
                  id={`select${item.number}_2`}
                  name={`select${item.number}`}
                  value={`${item.number}_2`}
                />
                <label htmlFor={`select${item.number}_2`}>
                  <span>{item.choice2}</span>
                </label>
                <input
                  type="radio"
                  checked={selectedValue === `${item.number}_3`}
                  id={`select${item.number}_3`}
                  name={`select${item.number}`}
                  value={`${item.number}_3`}
                />
                <label htmlFor={`select${item.number}_3`}>
                  <span>{item.choice3}</span>
                </label>
                <input
                  type="radio"
                  checked={selectedValue === `${item.number}_4`}
                  id={`select${item.number}_4`}
                  name={`select${item.number}`}
                  value={`${item.number}_4`}
                />
                <label htmlFor={`select${item.number}_4`}>
                  <span>{item.choice4}</span>
                </label>
                <input
                  type="radio"
                  checked={selectedValue === `${item.number}_5`}
                  id={`select${item.number}_5`}
                  name={`select${item.number}`}
                  value={`${item.number}_5`}
                />
                <label htmlFor={`select${item.number}_5`}>
                  <span>5</span>
                </label>
              </div>
              <div className="cbt__desc hide">{item.desc || ""}</div>
            </div>
          ))}
        </div>
        <div className="question-pic">사진 영역 입니다.</div>
        <div className="num-select cbt__omr">
          {questionAll.map((item, index) => (
            <div
              ref={omrRef}
              className="omr"
              key={index}
              onChange={e => {
                answerSelect(e);
              }}
            >
              <strong>{item.number}</strong>
              <input
                type="radio"
                checked={selectedValue === `${item.number}_1`}
                id={`omr${item.number}_1`}
                name={`omr${item.number}`}
                value={`${item.number}_1`}
              />
              <label htmlFor={`omr${item.number}_1`}>
                <span className="label-inner">1</span>
              </label>
              <input
                type="radio"
                checked={selectedValue === `${item.number}_2`}
                id={`omr${item.number}_2`}
                name={`omr${item.number}`}
                value={`${item.number}_2`}
              />
              <label htmlFor={`omr${item.number}_2`}>
                <span className="label-inner">2</span>
              </label>
              <input
                type="radio"
                checked={selectedValue === `${item.number}_3`}
                id={`omr${item.number}_3`}
                name={`omr${item.number}`}
                value={`${item.number}_3`}
              />
              <label htmlFor={`omr${item.number}_3`}>
                <span className="label-inner">3</span>
              </label>
              <input
                type="radio"
                checked={selectedValue === `${item.number}_4`}
                id={`omr${item.number}_4`}
                name={`omr${item.number}`}
                value={`${item.number}_4`}
              />
              <label htmlFor={`omr${item.number}_4`}>
                <span className="label-inner">4</span>
              </label>
              <input
                type="radio"
                checked={selectedValue === `${item.number}_5`}
                id={`omr${item.number}_5`}
                name={`omr${item.number}`}
                value={`${item.number}_5`}
              />
              <label htmlFor={`omr${item.number}_5`}>
                <span className="label-inner">5</span>
              </label>
            </div>
          ))}
        </div>
        <div className="cbt__remainder">
          남은 문항: <em>{remainingQuestions}</em>
        </div>
      </div>
    </TestQuestionWrap>
  );
};

export default TestQuestion;
