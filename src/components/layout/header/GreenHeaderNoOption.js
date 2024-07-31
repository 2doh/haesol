import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import "../../../scss/header/header.css";

const GreenHeaderNoOptionStyle = styled.div`
  position: relative;
  z-index: 999;
  height: 70px;
  width: 100%;
  min-width: 900px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5f909f;

  .header-wrap {
    display: flex;
    position: relative;

    max-width: 1130px;
    width: 100%;
    height: 100%;

    .header-logo-div {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
    }
  }
`;

const GreenHeaderNoOption = () => {
  const navigate = useNavigate();

  /** 메인 페이지로 이동 */
  const moveHomePage = () => {
    navigate("/");
  };

  return (
    <GreenHeaderNoOptionStyle>
      <div className="header-wrap">
        <div className="header-logo-div">
          <div
            className="logo"
            onClick={() => {
              moveHomePage();
            }}
          ></div>
        </div>
      </div>
    </GreenHeaderNoOptionStyle>
  );
};

export default GreenHeaderNoOption;
