import styled from "@emotion/styled";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestTitle from "../onlinetest/TestTitle";
import NoteQuestion from "./NoteQuestion";
import NoteAnswer from "./NoteAnswer";
import { nowQuestionsNumReset } from "slices/testSlice";
import { useNavigate } from "react-router";
import usePreventRefresh from "hooks/common/usePreventRefresh";

const NoteWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);

  .note-page {
    width: 1180px;
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;
    min-width: 440px;

    .note-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: row;

      & > div:first-of-type {
        /* flex-grow: 2.5; */
        min-width: 880px;
        max-width: 880px;
      }
      & > div:last-child {
        /* flex-grow: 1; */
        /* min-width: 377px;
        max-width: 377px; */
      }
    }
  }
`;
const IncorrectAnswerNoteMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const testState = useSelector(state => state.testSlice);

  // 학생이 체크한 OMR
  const [studentOmr, setStudentOmr] = useState("");

  // 정답 배열
  const [realAnswerOmr, setRealAnswerOmr] = useState("");

  // 데이터가 있음/없음(새로고침 또는 뒤로가기 처리)
  const [isDate, setIsDate] = useState(false);

  useEffect(() => {
    // console.log(testState);

    /** 오답노트 첫 진입시 1번 문제부터 출력되도록 리셋 */
    dispatch(nowQuestionsNumReset());
  }, []);

  // 새로고침 경고 메세지
  usePreventRefresh();

  useEffect(() => {
    if (testState.questionAll.length === 0) {
      alert("종료된 시험을 확인할 수 없습니다.");
      navigate("/");
      // window.location.reload("/");
    } else {
      setIsDate(true);
      console.log("정보 : ", testState);
      setStudentOmr(testState.incorrectAnswerNoteMain.studentOmr.omrAnswer);
      setRealAnswerOmr(testState.incorrectAnswerNoteMain.realAnswer);
    }
  }, []);

  return (
    <>
      <GreenHeaderNoOption />
      <NoteWrap>
        {isDate ? (
          <div className="note-page">
            <TestTitle
              subjectsName={testState.subjectName}
              testName={testState.testTitle}
            />
            <div className="note-page-inner">
              <NoteQuestion
                studentOmr={studentOmr}
                realAnswerOmr={realAnswerOmr}
              />
              <NoteAnswer
                studentOmr={studentOmr}
                realAnswerOmr={realAnswerOmr}
              />
            </div>
          </div>
        ) : null}
      </NoteWrap>
    </>
  );
};

export default IncorrectAnswerNoteMain;
