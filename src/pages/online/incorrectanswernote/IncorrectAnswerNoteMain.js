import styled from "@emotion/styled";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TestTitle from "../onlinetest/TestTitle";
import NoteQuestion from "./NoteQuestion";
import NoteAnswer from "./NoteAnswer";

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
      /* height: calc(100% - 60px); */
      height: 1500px;
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
  const testState = useSelector(state => state.testSlice);

  useEffect(() => {
    console.log(testState);
  }, []);

  return (
    <>
      <GreenHeaderNoOption />
      <NoteWrap>
        <div className="note-page">
          <TestTitle
            subjectsName={testState.subjectName}
            testName={testState.testTitle}
          />
          <div className="note-page-inner">
            <NoteQuestion />
            <NoteAnswer />
          </div>
        </div>
      </NoteWrap>
    </>
  );
};

export default IncorrectAnswerNoteMain;
