import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../scss/online/createTest.css";
import { openModal, updateModalDate } from "slices/modalSlice";
import TestInputAnswer from "./TestInputAnswer";

const CreateTestEn = () => {
  // 시험 종류
  const [selectedOption, setSelectedOption] = useState("vocabulary");
  // 시험 내용
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  // const [wordEn, setWordEn] = useState("");
  // const [wordKo, setWordKo] = useState("");
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");

  const tempObj = {
    // placeholder: "",
    state: "",
    wordQuestion: "단어를 입력해주세요",
    wordAnswer: "정답을 입력해주세요",
  };
  // <TestInputAnswer tempObj={tempObj}></TestInputAnswer>
  // <TestInputAnswer></TestInputAnswer>

  // 이미지
  const [previewFile, setPreviewFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);
  // 모달
  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
  };

  // 이미지 업로드 및 미리보기용 함수
  const handleFileChange = e => {
    const file = e.target.files[0];
    // 전송 파일 보관
    setSendFile(file);
    // 미리보기용
    const url = URL.createObjectURL(file);
    // 웹 브라우저 임시 파일 주소
    setPreviewFile(url);
  };

  const saveData = async e => {
    e.preventDefault();
    const formData = new FormData();
    const onlineTestEnData = JSON.stringify({
      // BE: FE,
      // 시험종류,
      // 이미지,
      // 문제내용,
      // 영어단어,
      // 한국어단어,
      // 정답,
    });
    console.log("onlineTestEnData : ", onlineTestEnData);

    const dto = new Blob([infoData], { type: "application/json" });
    formData.append("키명", dto);
    // formData.append("petImage", imgFile); 처럼 백에서 요구한 값 넣기
    formData.append("키명", sendFile);
    axiosPost함수(formData);
  };

  const handleSave = selectModalType => {
    const data = {
      bodyText: [
        "문제가 성공적으로 저장되었습니다. 다음 문제를 계속해서 제출하시겠습니까?",
      ],
      modalRes: [50],
      buttonText: ["확인", "닫기"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 취소 기능 */
  const modifyCancel = selectModalType => {
    const data = {
      bodyText: ["문제 제출을 취소하시겠습니까?"],
      modalRes: [43],
      buttonText: ["확인", "닫기"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  const TestTitleStyled = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 20px;
    margin: 80px;
    span {
      font-size: 36px;
      font-weight: 700;
      color: #1b4957;
    }
    p {
      font-size: 18px;
    }
  `;
  return (
    <div className="main-core">
      <TestTitleStyled>
        {/* 제목 위치 */}
        <span>영어</span>
        <p>5학년 시험 출제</p>
      </TestTitleStyled>
      <div className="online-test-inner">
        <div className="test-option">
          <select
            name="english-test"
            value={selectedOption}
            onChange={e => {
              handleSelectChange(e);
            }}
          >
            <option value="vocabulary">단어장</option>
            <option value="speaking">영어 말하기</option>
            <option value="listening">영어 듣기</option>
          </select>
        </div>

        <div className="online-test-content">
          <div className="online-test-required-title">이미지 업로드</div>

          <div className="online-english-test-file">
            {/* 이미지 미리보기 */}
            {previewFile !== null ? <img src={previewFile} /> : <div></div>}
          </div>
          <input
            id="filebt_id"
            type="file"
            accept="image/*"
            onChange={e => handleFileChange(e)}
          />
        </div>
        {selectedOption === "listening" && (
          <div className="online-test-content-write">
            <div className="online-test-required-title">문제</div>
            <textarea
              type="text"
              placeholder="지문을 입력해주세요."
              className="test-detail-content"
            ></textarea>
            <div className="online-test-required-title">문장</div>
            <textarea
              type="text"
              placeholder="지문을 입력해주세요."
              className="test-detail-content"
            ></textarea>
          </div>
        )}

        {(selectedOption === "vocabulary" || selectedOption === "speaking") && (
          <div className="online-test-content-write">
            <div className="online-test-required-title">낱말</div>
            <TestInputAnswer
              placeholder={tempObj.wordQuestion}
              setWord={setQuestions}
            ></TestInputAnswer>
            <div className="online-test-required-title">정답</div>
            <TestInputAnswer
              placeholder={tempObj.wordAnswer}
              setWord={setAnswer}
            ></TestInputAnswer>
          </div>
        )}
        {selectedOption === "listening" && (
          <div className="online-test-content-write">
            <div className="online-test-required-title">정답</div>
            <input type="text" placeholder="정답을 입력해주세요."></input>
          </div>
        )}
        <div className="button-section">
          <button
            onClick={() => {
              handleSave("BasicModal");
            }}
          >
            저장
          </button>
          <button
            onClick={() => {
              modifyCancel("BasicModal");
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestEn;
