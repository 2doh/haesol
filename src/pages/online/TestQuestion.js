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
  // 문제 출력
  const [examHtml, setExamHtml] = useState("");
  // omr 출력
  const [omrHtml, setOmrHtml] = useState("");
  // 문제 수
  const [remainingQuestions, setRemainingQuestions] = useState(0);

  const quizRef = useRef(null);
  const omrRef = useRef(null);

  useEffect(() => {
    dataQuestion();
  }, []);

  useEffect(() => {
    if (quizRef.current && omrRef.current) {
      const quizElem = quizRef.current;
      const omrElem = omrRef.current;

      // 이벤트 핸들러 설정
      quizElem.addEventListener("change", answerSelect);
      omrElem.addEventListener("change", answerSelectOmr);

      // 컴포넌트 언마운트 시 이벤트 핸들러 정리
      return () => {
        quizElem.removeEventListener("change", answerSelect);
        omrElem.removeEventListener("change", answerSelectOmr);
      };
    }
  }, [examHtml, omrHtml]);

  /** JSON 불러오기 */
  const dataQuestion = () => {
    const formattedQuestions = items.map((item, index) => {
      const formattedQuestion = {
        number: index + 1,
        question: item.question,
      };

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

      if (item.question_desc) {
        formattedQuestion.questionDesc = item.question_desc;
      }
      if (item.question_img) {
        formattedQuestion.questionImg = item.question_img;
      }
      if (item.desc) {
        formattedQuestion.desc = item.desc;
      }

      return formattedQuestion;
    });

    setQuestionAll(formattedQuestions);
    generateQuestionComponents(formattedQuestions);
  };

  // 문제와 OMR 컴포넌트 생성
  const generateQuestionComponents = questions => {
    const examHtml = [];
    const omrHtml = [];

    questions.forEach((question, number) => {
      examHtml.push(`
        <div class="cbt">  
            <div class="cbt__question"><span>${question.number}</span>. ${question.question}</div>
            <div class="cbt__question__img">
              ${question.questionImg ? `<img src="https://kebab000.github.io/web2023/gineungsaJPG/${question.questionImg}.jpg" alt="시험이미지">` : ""}
            </div>
            <div class="cbt__question__desc">${question.questionDesc || ""}</div>
            <div class="cbt__selects">
                <input type="radio" id="select${number}_1" name="select${number}" value="${number}_1">
                <label for="select${number}_1"><span>${question.choice1}</span></label>
                <input type="radio" id="select${number}_2" name="select${number}" value="${number}_2">
                <label for="select${number}_2"><span>${question.choice2}</span></label>
                <input type="radio" id="select${number}_3" name="select${number}" value="${number}_3">
                <label for="select${number}_3"><span>${question.choice3}</span></label>
                <input type="radio" id="select${number}_4" name="select${number}" value="${number}_4">
                <label for="select${number}_4"><span>${question.choice4}</span></label>
            </div>
            <div class="cbt__desc hide">${question.desc || ""}</div>
        </div>
      `);

      omrHtml.push(`
        <div class="omr">
            <strong>${question.number}</strong>
            <input type="radio" name="omr${number}" id="omr${number}_1" value="${number}_0">
            <label for="omr${number}_1"><span class="label-inner">1</span></label>
            <input type="radio" name="omr${number}" id="omr${number}_2" value="${number}_1">
            <label for="omr${number}_2"><span class="label-inner">2</span></label>
            <input type="radio" name="omr${number}" id="omr${number}_3" value="${number}_2">
            <label for="omr${number}_3"><span class="label-inner">3</span></label>
            <input type="radio" name="omr${number}" id="omr${number}_4" value="${number}_3">
            <label for="omr${number}_4"><span class="label-inner">4</span></label>
        </div>
      `);
    });

    setExamHtml(examHtml.join(""));
    setOmrHtml(omrHtml.join(""));
  };

  // quiz >> omr 체크 동기화
  const answerSelect = () => {
    if (!quizRef.current || !omrRef.current) return;

    const quizElem = quizRef.current;
    const omrElem = omrRef.current;

    // 모든 체크된 라디오 버튼 가져오기
    let checkAllRadio = quizElem.querySelectorAll("input[type=radio]:checked");

    // 체크한 값을 오른쪽 omr에 checked할 거에요
    checkAllRadio.forEach(radioNum => {
      const valueParts = radioNum.value.split("_");
      const questionNumber = valueParts[0];
      const choiceNumber = valueParts[1];
      const omrInput = omrElem.querySelector(
        `input[id=omr${questionNumber}_${choiceNumber}]`,
      );
      if (omrInput) {
        omrInput.checked = true;
      }
    });

    updateRemainingQuestions(checkAllRadio.length);
  };

  // omr >> quiz 체크 동기화
  const answerSelectOmr = () => {
    if (!quizRef.current || !omrRef.current) return;

    const quizElem = quizRef.current;
    const omrElem = omrRef.current;

    // 모든 체크된 라디오 버튼 가져오기
    const checkedOmrRadios = omrElem.querySelectorAll(
      "input[type=radio]:checked",
    );

    // quiz 영역의 체크박스 동기화
    checkedOmrRadios.forEach(radio => {
      const valueParts = radio.value.split("_");
      const questionNumber = valueParts[0];
      const choiceNumber = valueParts[1];
      const correspondingQuizInput = quizElem.querySelector(
        `input[value="${questionNumber}_${choiceNumber}"]`,
      );
      if (correspondingQuizInput) {
        correspondingQuizInput.checked = true;
      }
    });

    updateRemainingQuestions(checkedOmrRadios.length);
  };

  // 남은 문항 계산하기
  const updateRemainingQuestions = answeredCount => {
    const totalQuestions = questionAll.length;
    setRemainingQuestions(totalQuestions - answeredCount);
  };

  return (
    <TestQuestionWrap>
      <div className="test-question-inner">
        <div
          className="question-text cbt__quiz"
          dangerouslySetInnerHTML={{ __html: examHtml }}
          ref={quizRef}
        ></div>
        <div className="question-pic">사진 영역 입니다.</div>
        <div
          className="num-select cbt__omr"
          dangerouslySetInnerHTML={{ __html: omrHtml }}
          ref={omrRef}
        ></div>
        <div className="cbt__remainder">
          남은 문항: <em>{remainingQuestions}</em>
        </div>
      </div>
    </TestQuestionWrap>
  );
};

export default TestQuestion;
