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
            value="남자"
            onChange={e => {
              categoryHandler(e);
              setUserGender("남자");
            }}
            checked={subCategoryId === "남자"}
          />
          <div>남성</div>
        </label>
        <label className="signup-main-fields-label">
          <input
            className="signup-main-fields-gender"
            type="radio"
            value="여자"
            onChange={e => {
              categoryHandler(e);
              setUserGender("여자");
            }}
            checked={subCategoryId === "여자"}
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
