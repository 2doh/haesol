import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router";

const SubjectsListWrapStyle = styled.div`
  padding: 0 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;
  .box {
    cursor: pointer;
    width: 200px;
    height: 200px;
    background-color: violet;
  }
`;

const SubjectsListWrap = () => {
  const navigate = useNavigate();

  const movePage = pageNnum => {
    switch (pageNnum) {
      case 1:
        navigate("/selftest");
        break;

      default:
        break;
    }
  };
  return (
    <SubjectsListWrapStyle>
      <div
        className="box"
        onClick={() => {
          movePage(1);
        }}
      >
        국어
      </div>
      <div className="box">수학</div>
      <div className="box">영어</div>
      <div className="box">과학</div>
      <div className="box">음악</div>
      <div className="box">미술</div>
      <div className="box">체육</div>
      <div className="box">바른 생활</div>
      <div className="box">사회/도덕</div>
      <div className="box">실과</div>
      <div className="box"></div>
      <div className="box"></div>

{/* <button class="button-24" role="button">
  <span class="text">Button 24</span>
</button> */}

{/* .button-24 {
  background-color: transparent;
  background-image: linear-gradient(#fff, #f5f5fa);
  border: 0 solid #003dff;
  border-radius: 9999px;
  box-shadow: rgba(37, 44, 97, .15) 0 4px 11px 0, rgba(93, 100, 148, .2) 0 1px 3px 0;
  box-sizing: border-box;
  color: #484c7a;
  cursor: pointer;
  display: inline-block;
  font-family: Hind, system-ui, BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  margin: 4px;
  padding: 16px 24px;
  text-align: center;
  text-decoration: inherit;
  text-wrap: nowrap;
  transition: all .2s ease-out;
  transition-behavior: normal;
  white-space-collapse: collapse;
  line-height: 1.15;
}

@media (min-width: 576px) {
  .button-24 {
    padding-bottom: 10px;
    padding-top: 10px;
  }
}

.button-24:after, .button-24:before, .div-flex-items-center-justify-center:after, .div-flex-items-center-justify-center:before, .span-flex-items-center-h-16-w-auto-mr-8-py-2-flex-grow-0-flex-shrink-0-fill-current:after, .span-flex-items-center-h-16-w-auto-mr-8-py-2-flex-grow-0-flex-shrink-0-fill-current:before, .svg-block-h-full:after, .svg-block-h-full:before {
  border: 0 solid #003dff;
  box-sizing: border-box;
}

.button-24:hover {
  box-shadow: rgba(37, 44, 97, .15) 0 8px 22px 0, rgba(93, 100, 148, .2) 0 4px 6px 0;
}

.button-24:disabled {
  cursor: not-allowed;
  opacity: .5;
} */}



    </SubjectsListWrapStyle>
  );
};

export default SubjectsListWrap;
