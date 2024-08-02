import styled from "@emotion/styled";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import TestTitle from "./TestTitle";
import TestQuestion from "./TestQuestion";
import TestAnswer from "./TestAnswer";

const TestWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-page {
    width: 1180px;
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;

    .test-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: row;

      & > div:first-child {
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

const TestPage = () => {
  return (
    <>
      <GreenHeaderNoOption />
      <TestWrap>
        <div className="test-page">
          <TestTitle />
          <div className="test-page-inner">
            <TestQuestion />
            <TestAnswer />
          </div>
        </div>
      </TestWrap>
    </>
  );
};

export default TestPage;
