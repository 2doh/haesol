import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../scss/online/createTest.css";
import { openModal, updateModalDate } from "slices/modalSlice";
import TestInputAnswer from "./TestInputAnswer";
import ReactQuill from "react-quill";
import {
  onlineTestCreateEn,
  onlineTestCreateListeningEn,
} from "api/online/onlinetestapi";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import Footer from "components/layout/Footer";

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

const CreateTestEn = () => {
  // 시험 종류
  const [selectedOption, setSelectedOption] = useState("vocabulary");
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState("");

  // 듣기
  const [question, setQuestion] = useState("");
  const [sentence, setSentence] = useState("");

  const tempObj = {
    // placeholder: "",
    state: "",
    wordQuestion: "단어를 입력해주세요",
    wordAnswer: "정답을 입력해주세요",
  };

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

  const handleSave = async e => {
    e.preventDefault();

    if (!sendFile) {
      alert("이미지를 첨부해주세요.");
      return;
    }
    if (!word) {
      alert("단어를 입력해주세요.");
      return;
    }
    if (!answer) {
      alert("정답을 입력해주세요.");
      return;
    }

    let res = false;
    if (selectedOption === "vocabulary" || selectedOption === "speaking") {
      res = await EnTestSaveData(e);
    } else if (selectedOption === "listening") {
      res = await EnListeningTestSaveData(e);
    }

    console.log("Handle Save Result:", res);

    if (res) {
      const data = {
        bodyText: [
          "문제가 성공적으로 저장되었습니다. 다음 문제를 계속해서 제출하시겠습니까?",
        ],
        modalRes: [50],
        buttonText: ["확인", "닫기"],
      };

      dispatch(updateModalDate(data));
      dispatch(openModal("BasicModal"));
    } else {
      const data = {
        bodyText: ["문제 제출에 실패했습니다. 다시 시도해주세요."],
        modalRes: [1],
        buttonCnt: 1,
        buttonText: ["확인"],
      };
      dispatch(updateModalDate(data));
      dispatch(openModal("BasicModal"));
    }
  };

  // 영어 말하기/단어 시험
  const EnTestSaveData = async e => {
    e.preventDefault();

    const onlineTestEnData = JSON.stringify({
      // BE: FE,
      word,
      answer,
    });
    console.log("onlineTestEnData : ", onlineTestEnData);

    // JSON 데이터를 문자열로 변환하여 FormData에 추가

    const formData = new FormData();
    const dto = new Blob([onlineTestEnData], { type: "application/json" });
    formData.append("p", dto);
    console.log("========== sendFile : ", sendFile);

    // 파일이 있을 경우 FormData에 추가
    if (sendFile) {
      formData.append("pic", sendFile);
      console.log("pic", sendFile);
    } else {
      // 빈 Blob을 파일처럼 추가 (빈 파일을 나타냄)
      formData.append("pic", new Blob([]), "empty.jpg");
      console.log("pic", "empty.jpg (빈 파일 추가)");
    }

    try {
      const response = await onlineTestCreateEn(formData);
      console.log("데이터 전송 결과 : ", response);
      if (response.status === 200 || response.resultMsg === "200 OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 영어 듣기 시험
  const EnListeningTestSaveData = async e => {
    e.preventDefault();

    const onlineTestEnData = JSON.stringify({
      // BE: FE,
      question,
      sentence,
      answer,
    });
    console.log("onlineTestEnData : ", onlineTestEnData);

    // JSON 데이터를 문자열로 변환하여 FormData에 추가

    const formData = new FormData();
    const dto = new Blob([onlineTestEnData], { type: "application/json" });
    formData.append("p", dto);
    console.log("========== sendFile : ", sendFile);

    // 파일이 있을 경우 FormData에 추가
    if (sendFile) {
      formData.append("pic", sendFile);
      console.log("pic", sendFile);
    } else {
      // 빈 Blob을 파일처럼 추가 (빈 파일을 나타냄)
      formData.append("pic", new Blob([]), "empty.jpg");
      console.log("pic", "empty.jpg (빈 파일 추가)");
    }

    try {
      const response = await onlineTestCreateListeningEn(formData);
      console.log("데이터 전송 결과 : ", response);
      if (response.status === 200 || response.resultMsg === "200 OK") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
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

  // 모듈 활용
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["clean"],
      ],
    },
  };

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
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
              <div className="online-test-content">
                <div className="online-test-required-title">문제</div>
                <form>
                  <ReactQuill
                    value={question}
                    onChange={value => {
                      setQuestion(value);
                    }}
                    modules={modules}
                    className="test-content-quill"
                    placeholder="문제를 입력해주세요"
                  />
                </form>
              </div>
              <div className="online-test-content">
                <div className="online-test-required-title">문장</div>
                <form>
                  <ReactQuill
                    value={sentence}
                    onChange={value => {
                      setSentence(value);
                    }}
                    modules={modules}
                    className="test-content-quill"
                    placeholder="지문을 입력해주세요"
                  />
                </form>
              </div>
            </div>
          )}

          {(selectedOption === "vocabulary" ||
            selectedOption === "speaking") && (
            <div className="online-test-content-write">
              <div className="online-test-required-title">단어</div>
              <TestInputAnswer
                placeholder={tempObj.wordQuestion}
                setWord={setWord}
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
            <button onClick={handleSave}>저장</button>
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
      <Footer />
    </>
  );
};

export default CreateTestEn;
