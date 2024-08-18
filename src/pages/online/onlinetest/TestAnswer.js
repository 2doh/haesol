import styled from "@emotion/styled";
import TestEndBtn from "../TestEndBtn";
import TestOmr from "../TestOmr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { remainingQuestionsCount, updateTestDate } from "slices/testSlice";

const TestAnswerStyle = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #bee0e3;

  display: flex;
  flex-direction: column;

  .btn-wrap {
    width: 100%;
    min-height: 80px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }

  .cbt__remainder {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 20px;
    font-size: 18px;

    p {
      font-size: 24px;
      color: purple;
    }

    .zero {
      color: blue;
    }
  }

  .omr-wrap {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1180px) {
    .btn-wrap {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }

    .cbt__remainder {
      padding: 0px;
    }
  }
`;

const TestAnswer = () => {
  const testState = useSelector(state => state.testSlice);
  const dispatch = useDispatch();
  const [omrCount, setOmerCount] = useState(20);

  const countOmr = () => {
    const num =
      testState.remainingQuestions -
      testState.selectNumArr.filter(item => item.selectNum !== 0).length;
    setOmerCount(num);

    const data = {
      remainingQuestions: num,
    };

    dispatch(updateTestDate(data));
  };

  useEffect(() => {
    countOmr();
  }, [testState.selectNumArr]);

  return (
    <TestAnswerStyle>
      <div className="btn-wrap">
        <TestEndBtn />
        <div className="cbt__remainder">
          남은 문제 : &nbsp;&nbsp;&nbsp;
          <p className={omrCount === 0 ? "zero" : null}>{omrCount}</p>
          &nbsp;&nbsp; 개
        </div>
      </div>

      <div className="omr-wrap">
        <TestOmr />
      </div>
    </TestAnswerStyle>
  );
};

export default TestAnswer;
