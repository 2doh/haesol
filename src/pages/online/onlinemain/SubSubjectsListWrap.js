import styled from "@emotion/styled";
import { useNavigate } from "react-router";

const SubSubjectsListWrapStyle = styled.div`
  min-height: 150px;
  padding: 0 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 80px;

  .english-buttons {
    min-height: 150px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    gap: 80px;

    & button {
      width: 100%;
      height: 100%;
      /* height: 130px; */
    }
  }
`;

const SubSubjectsListWrap = () => {
  const navigate = useNavigate();

  const movePage = type => {
    navigate("/learn/voca", { state: { type: type } });
  };

  return (
    <SubSubjectsListWrapStyle>
      <div className="">영어</div>
      <div className="english-buttons">
        {/* <button className="button-36" role="button">
        <span className="text">말하기</span>
      </button>
      <button className="button-36" role="button">
        <span className="text">듣기</span>
      </button>
      <button className="button-36" role="button">
        <span className="text">쓰기</span>
      </button> */}

        <button
          className="button-1"
          role="button"
          onClick={() => {
            movePage("말하기");
          }}
        >
          <span className="button-1-shadow"></span>
          <span className="button-1-edge"></span>
          <span className="button-1-front text">말하기</span>
        </button>
        <button
          className="button-1"
          role="button"
          onClick={() => {
            movePage("듣기");
          }}
        >
          <span className="button-1-shadow"></span>
          <span className="button-1-edge"></span>
          <span className="button-1-front text">듣기</span>
        </button>
        <button
          className="button-1"
          role="button"
          onClick={() => {
            movePage("쓰기");
          }}
        >
          <span className="button-1-shadow"></span>
          <span className="button-1-edge"></span>
          <span className="button-1-front text">쓰기</span>
        </button>
      </div>

      {/* <div className="sub-subjects">SubSubjectsListWrap</div>
      <div className="sub-subjects">ectsListWrap</div> */}
    </SubSubjectsListWrapStyle>
  );
};

export default SubSubjectsListWrap;
