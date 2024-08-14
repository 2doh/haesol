import styled from "@emotion/styled";
import React, { useState } from "react";

const SocialLoginIntegrationStyle = styled.div`
  min-width: 600px;
  min-height: 200px;
  background-color: lightgoldenrodyellow;

  .checkbox-wrapper {
    margin-bottom: 20px;
  }

  .checkbox-wrapper .switch {
    display: none;
  }

  .checkbox-wrapper .switch + label {
    align-items: center;
    color: #78768d;
    cursor: pointer;
    display: flex;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    line-height: 15px;
    position: relative;
    user-select: none;
  }

  .checkbox-wrapper .switch + label::before,
  .checkbox-wrapper .switch + label::after {
    content: "";
    display: block;
  }

  .checkbox-wrapper .switch + label::before {
    background-color: #05012c;
    border-radius: 500px;
    height: 15px;
    margin-right: 8px;
    transition: background-color 0.125s ease-out;
    width: 25px;
  }

  .checkbox-wrapper .switch + label::after {
    background-color: #fff;
    border-radius: 13px;
    box-shadow:
      0 3px 1px 0 rgba(37, 34, 71, 0.05),
      0 2px 2px 0 rgba(37, 34, 71, 0.1),
      0 3px 3px 0 rgba(37, 34, 71, 0.05);
    height: 13px;
    left: 1px;
    position: absolute;
    top: 1px;
    transition: transform 0.125s ease-out;
    width: 13px;
  }

  .checkbox-wrapper .switch + label .switch-x-text {
    display: block;
    margin-right: 0.3em;
  }

  .checkbox-wrapper .switch + label .switch-x-toggletext {
    display: block;
    font-weight: bold;
    height: 15px;
    overflow: hidden;
    position: relative;
    width: 25px;
  }

  .checkbox-wrapper .switch + label .switch-x-unchecked,
  .checkbox-wrapper .switch + label .switch-x-checked {
    left: 0;
    position: absolute;
    top: 0;
    transition:
      opacity 0.125s ease-out,
      transform 0.125s ease-out;
  }

  .checkbox-wrapper .switch + label .switch-x-unchecked {
    opacity: 1;
    transform: none;
  }

  .checkbox-wrapper .switch + label .switch-x-checked {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  .checkbox-wrapper .switch + label .switch-x-hiddenlabel {
    position: absolute;
    visibility: hidden;
  }

  .checkbox-wrapper .switch:checked + label::before {
    background-color: #ffb500;
  }

  .checkbox-wrapper .switch:checked + label::after {
    transform: translate3d(10px, 0, 0);
  }

  .checkbox-wrapper .switch:checked + label .switch-x-unchecked {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  .checkbox-wrapper .switch:checked + label .switch-x-checked {
    opacity: 1;
    transform: none;
  }
`;

const SocialLoginIntegration = () => {
  // States for each checkbox
  const [googleChecked, setGoogleChecked] = useState(false);
  const [naverChecked, setNaverChecked] = useState(false);
  const [kakaoChecked, setKakaoChecked] = useState(false);

  return (
    <SocialLoginIntegrationStyle>
      구글 :
      <div className="checkbox-wrapper">
        <input
          checked={googleChecked}
          onChange={() => setGoogleChecked(!googleChecked)}
          id="switch-google"
          type="checkbox"
          className="switch"
        />
        <label htmlFor="switch-google">
          <span className="switch-x-text">현재 연동</span>
          <span className="switch-x-toggletext">
            <span className="switch-x-unchecked">
              <span className="switch-x-hiddenlabel">Unchecked: </span>해제
            </span>
            <span className="switch-x-checked">
              <span className="switch-x-hiddenlabel">Checked: </span>중
            </span>
          </span>
        </label>
      </div>
      <br />
      네이버 :
      <div className="checkbox-wrapper">
        <input
          checked={naverChecked}
          onChange={() => setNaverChecked(!naverChecked)}
          id="switch-naver"
          type="checkbox"
          className="switch"
        />
        <label htmlFor="switch-naver">
          <span className="switch-x-text">현재 연동</span>
          <span className="switch-x-toggletext">
            <span className="switch-x-unchecked">
              <span className="switch-x-hiddenlabel">Unchecked: </span>해제
            </span>
            <span className="switch-x-checked">
              <span className="switch-x-hiddenlabel">Checked: </span>중
            </span>
          </span>
        </label>
      </div>
      <br />
      카카오 :
      <div className="checkbox-wrapper">
        <input
          checked={kakaoChecked}
          onChange={() => setKakaoChecked(!kakaoChecked)}
          id="switch-kakao"
          type="checkbox"
          className="switch"
        />
        <label htmlFor="switch-kakao">
          <span className="switch-x-text">현재 연동</span>
          <span className="switch-x-toggletext">
            <span className="switch-x-unchecked">
              <span className="switch-x-hiddenlabel">Unchecked: </span>해제
            </span>
            <span className="switch-x-checked">
              <span className="switch-x-hiddenlabel">Checked: </span>중
            </span>
          </span>
        </label>
      </div>
    </SocialLoginIntegrationStyle>
  );
};

export default SocialLoginIntegration;
