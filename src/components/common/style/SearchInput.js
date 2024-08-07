import styled from "@emotion/styled";
import { RiSearchLine } from "react-icons/ri";

import "../../../scss/common/searchinput.css";
import { useRef, useState } from "react";

const SearchInputStyle = styled.div`
  .field-container {
    width: 310px;
    height: 50px;
  }
  .search-input {
    position: relative;
    display: flex;

    .search-input-box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
    }

    .search-icon-btn {
      position: absolute;
      right: 0;
    }
  }
`;

export const SearchInput = ({
  placeholderText,
  setSearchKeyword,
  setClickSearchBtn,
}) => {
  const [inputVal, setInputVal] = useState("");

  const handleSearchBtn = e => {
    setInputVal(e.target.value);
    setSearchKeyword(e.target.value);
  };

  const handleReset = () => {
    setInputVal("");
  };

  return (
    <SearchInputStyle>
      <fieldset className="field-container">
        <input
          type="text"
          placeholder={placeholderText || "키워드 검색"}
          className="field"
          value={inputVal}
          onChange={e => {
            handleSearchBtn(e);
          }}
        />
        <div className="icons-container">
          <div
            className="icon-search"
            onClick={() => {
              setClickSearchBtn(true);
            }}
          ></div>
          <div
            className="icon-close"
            onClick={() => {
              handleReset();
            }}
          >
            <div className="x-up"></div>
            <div className="x-down"></div>
          </div>
        </div>
      </fieldset>
    </SearchInputStyle>
  );
};
