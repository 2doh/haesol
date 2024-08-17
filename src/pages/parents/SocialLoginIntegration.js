import styled from "@emotion/styled";
import React, { useState } from "react";
import googleIcon from "../../images/google-icon.png";
import naverIcon from "../../images/naver-icon.png";
import kakaoIcon from "../../images/kakao-icon.png";

const SocialLoginIntegrationStyle = styled.div`
  /* min-width: 600px;
  min-height: 200px;
  background-color: lightgoldenrodyellow; */
  h3 {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 15px;
  }

  .social-login-div {
    display: flex;
    flex-wrap: row;
    padding-left: 20px;
    gap: 15px;
    align-items: center;
    padding-bottom: 10px;

    .social-icon-div {
      max-width: 40px;
      max-height: 40px;
      border-radius: 50px;
      background-color: white;
      padding: 10px;
      overflow: hidden;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .google-icon-div {
      border: #c9c9c9 solid 1px;
    }

    .kakao-icon-div,
    .naver-icon-div {
      padding: 0px;

      img {
        width: 40px;
        height: 40px;
      }
    }

    /* .kakao-icon-div {
      border: yellow solid 1px;
    } */

    p {
      font-size: 15px;
      width: 150px;
    }
  }

  .checkbox-wrapper {
    /* margin-bottom: 20px; */

    padding-left: 20px;
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
    /* background-color: #05012c; */
    background-color: #757b98;

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
    /* background-color: #757b98; */
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
      <h3>소셜 로그인 설정</h3>
      <div className="social-login-div google-social-login-div">
        <div className="social-icon-div google-icon-div">
          <img src={googleIcon}></img>
        </div>
        <p>구글 계정으로 로그인 </p>
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
      </div>
      <div className="social-login-div naver-social-login-div">
        <div className="social-icon-div naver-icon-div">
          <img src={naverIcon}></img>
        </div>
        <p>네이버 계정으로 로그인 </p>
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
      </div>
      <div className="social-login-div kakao-social-login-div">
        <div className="social-icon-div kakao-icon-div">
          <img src={kakaoIcon}></img>
        </div>
        <p>카카오 계정으로 로그인 </p>
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
      </div>
    </SocialLoginIntegrationStyle>
  );
};

export default SocialLoginIntegration;
