import styled from "@emotion/styled";
import React, { useState } from "react";

const GenderSelect = ({ children }) => {
  const [subCategoryId, setSubCategoryId] = useState(0);
  const categoryHandler = e => {
    setSubCategoryId(String(e.target.value));
  };
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">성별</div>
      </div>
      <WrapStyle>
        <RadioStyle>
          <label>
            <input
              type="radio"
              value="남성"
              onChange={categoryHandler}
              checked={subCategoryId === "남성"}
            />
            남성
          </label>
        </RadioStyle>
        <RadioStyle>
          <label>
            <input
              type="radio"
              value="여성"
              onChange={categoryHandler}
              checked={subCategoryId === "여성"}
            />
            여성
          </label>
        </RadioStyle>
      </WrapStyle>
    </div>
  );
};

export default GenderSelect;

const WrapStyle = styled.div`
  display: flex;
  align-items: center;
`;

const RadioStyle = styled.div`
  width: 100%;
  height: 100%;
`;
