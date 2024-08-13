import styled from "@emotion/styled";
import { calc } from "antd/es/theme/internal";
import MiniButtonVer01 from "components/common/style/MiniButtonVer01";
import usePlaceholder from "hooks/common/usePlaceholder";
import React from "react";

const SignupChildInput = ({ children, setUserChildrenCode }) => {
  const { placeholder, handleFocus, handleBlur } =
    usePlaceholder("자녀코드를 입력해주세요");

  return (
    <WrapStyle>
      <TitleWrap>
        <TitleStyle>{children}</TitleStyle>
      </TitleWrap>
      <div className="signup-main-fields-section-bottom">
        <>
          <FieldStyle style={{ position: "relative", padding: "5px" }}>
            <input
              className="fieleds-section-children"
              placeholder={placeholder}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
              onChange={e => setUserChildrenCode(e.target.value)}
              style={{
                width: "82%",
                height: "100%",
                border: "none",
                paddingRight: "10px",
              }}
            ></input>
            <button
              className="check-duplicate-id-bt"
              onClick={e => {
                handleonClick(e);
              }}
              style={{
                // position: "absolute",
                height: "100%",
                backgroundColor: "#dd838f",
                color: "#fff",
                padding: "5px",
                borderRadius: "5px",
                right: "5px",
                width: "18%",
                border: "1px solid #a8172a",
                // top: "1.5px",
                // display: "flex",
                // height: "100%",
              }}
            >
              자녀확인
            </button>
          </FieldStyle>
        </>
      </div>
    </WrapStyle>
  );
};

export default SignupChildInput;

const WrapStyle = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  width: 100%;
`;

const TitleStyle = styled.div`
  display: flex;
  font-size: 20px;
  white-space: nowrap;
`;

const FieldStyle = styled.div`
  border-radius: 5px;
  border: 1px solid #886348;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  color: #2a1b07;
  width: 100%;
  background-color: #fff;
`;
