import styled from "@emotion/styled";
import React, { useState } from "react";

const GenderSelect = () => {
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
        <label className="signup-main-fields-label">
          <input
            className="signup-main-fields-gender"
            type="radio"
            value="male"
            onChange={categoryHandler}
            checked={subCategoryId === "male"}
          />
          <div>남성</div>
        </label>
        <label className="signup-main-fields-label">
          <input
            className="signup-main-fields-gender"
            type="radio"
            value="female"
            onChange={categoryHandler}
            checked={subCategoryId === "female"}
          />
          <div>여성</div>
        </label>
      </WrapStyle>
    </div>
  );
};

export default GenderSelect;

const WrapStyle = styled.div`
  display: flex;
  align-items: center;
`;
