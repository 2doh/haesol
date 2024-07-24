import styled from "@emotion/styled";
import { useState } from "react";

const GenderSelect = ({ setUserGender }) => {
  const [subCategoryId, setSubCategoryId] = useState(0);
  const categoryHandler = e => {
    setSubCategoryId(e.target.value);
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
            value="남"
            onChange={e => {
              categoryHandler(e);
              setUserGender("남");
            }}
            checked={subCategoryId === "남"}
          />
          <div>남성</div>
        </label>
        <label className="signup-main-fields-label">
          <input
            className="signup-main-fields-gender"
            type="radio"
            value="여"
            onChange={e => {
              categoryHandler(e);
              setUserGender("여");
            }}
            checked={subCategoryId === "여"}
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
