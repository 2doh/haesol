import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import "../../scss/online/createTest.css";
import BasicRating from "./BasicRating";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import TestInputAnswer from "./TestInputAnswer";
import { onlineTestCreate } from "api/online/onlinetestapi";

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

const CreateTestMath = () => {
  // 시험 종류
  const [selectedOption, setSelectedOption] = useState("choice");
  // 문제 종류
  const [typeTag, setTypeTag] = useState("1");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [starValue, setStarValue] = useState(3);
  const [multiple, setMultiple] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  // 답 저장
  const [answer, setAnswer] = useState(null);
  // useEffect(() => {
  //   console.log("체크되었다", answer);
  // }, [answer]);

  const tempObj = {
    state: "",
    wordMath: "정답을 입력해주세요.",
  };

  // 파일 처리
  const [previewFile, setPreviewFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);

  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

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

  /** 체크된 정답 저장 */
  const handleCheckboxChange = (e, index) => {
    if (e.target.checked) {
      setAnswer(index);
    } else {
      setAnswer(null);
    }
  };

  // 주관식 객관식 선택
  const handleSelectChange = e => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "subjective") {
      setAnswer(null); // 주관식일 경우 정답을 초기화
    }
  };
  // 문제 타입 선택
  const handleSelectTagType = e => {
    const value = e.target.value;
    setTypeTag(value);

    // if (value === "1") {
    //   setTypeTag(null);
    // }
  };

  /** 문제 내용 저장 함수 */
  const handleInputChange = (index, event) => {
    const newMultiple = [...multiple];
    newMultiple[index].content = event.target.value;
    setMultiple(newMultiple);
  };

  const handleSave = async e => {
    e.preventDefault();

    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    // 객관식일 경우에만 정답 선택 여부를 검사
    if (selectedOption === "choice" && answer === null) {
      alert("정답을 선택해주세요.");
      return;
    }
    if (selectedOption === "choice") {
      const hasEmpty = multiple.some(item => item.content.trim() === "");
      if (hasEmpty) {
        alert("모든 보기를 입력해주세요.");
        return; // 하나라도 항목이 비어 있을 때 실행 중지
      }
    }
    if (selectedOption === "subjective" && answer === null) {
      alert("정답을 입력해주세요.");
      return; // 하나라도 항목이 비어 있을 때 실행 중지
    }

    const data = {
      bodyText: [
        "문제가 성공적으로 저장되었습니다. 다음 문제를 계속해서 제출하시겠습니까?",
      ],
      modalRes: [50],
      buttonText: ["확인", "닫기"],
    };

    await saveData(e);
    dispatch(updateModalDate(data));
    dispatch(openModal("BasicModal"));
  };

  const saveData = async e => {
    e.preventDefault();
    const formData = new FormData();
    const multipleContents = multiple.map(item => item.content);

    const onlineTestData = JSON.stringify({
      // BE: FE,
      // 수학
      subjectCode: 2,
      // 제목,
      question: title,
      // 타입
      typeTag: typeTag,
      // 객관식
      queTag: selectedOption,
      // 난이도,
      level: starValue,
      // 문제내용,
      contents: contents,
      // 보기내용,
      multiple: multipleContents,
      // 정답,
      answer: answer,
    });
    console.log("onlineTestData : ", onlineTestData);

    // JSON 데이터를 문자열로 변환하여 FormData에 추가
    const dto = new Blob([onlineTestData], { type: "application/json" });
    formData.append("p", dto);
    console.log("========== sendFile : ", sendFile);

    // 파일이 있을 경우 FormData에 추가
    if (sendFile) {
      formData.append("pic", sendFile);
    }

    try {
      // console.log("수학 시험 post : ", formData.get("p"), formData.get("pic"));
      console.log("데이터 전송중");
      await onlineTestCreate(formData);
    } catch (error) {
      console.log(error);
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
    <div className="main-core">
      <TestTitleStyled>
        {/* 제목 위치 */}
        <span>수학</span>
        <p>5학년 시험 출제</p>
      </TestTitleStyled>
      <div className="online-test-inner">
        <div className="test-option">
          <select
            name="math-test"
            value={selectedOption}
            onChange={e => {
              handleSelectChange(e);
            }}
          >
            <option value="choice">객관식</option>
            <option value="subjective">주관식</option>
          </select>
        </div>

        <div className="online-test-title">
          <div className="online-test-title-top">
            <div className="online-test-required-title">제목</div>
            <input
              className="online-test-title"
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={e => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>

          <div className="test-rating">
            <div className="online-test-required-title">난이도</div>
            <BasicRating starValue={starValue} setStarValue={setStarValue} />
          </div>
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">내용(문제)</div>
          <div className="test-option">
            <select
              name="math-test"
              value={typeTag}
              onChange={e => {
                handleSelectTagType(e);
              }}
            >
              <option value="1">사칙연산</option>
              <option value="2">단위환산</option>
              <option value="3">그래프</option>
              <option value="4">규칙찾기</option>
              <option value="5">도형 넓이 계산</option>
            </select>
          </div>
          <form>
            <ReactQuill
              onChange={() => {
                setContents();
              }}
              modules={modules}
              className="test-content-quill"
              placeholder="내용을 입력해주세요"
            />
          </form>
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">이미지 첨부</div>
          <div className="online-test-file">
            <input
              // 파일 이름 미리보기 가능하도록 변경 필요
              id="filebt_id"
              type="file"
              accept="image/*"
              onChange={e => handleFileChange(e)}
            />
          </div>
        </div>
        {/* 정답 객관식 */}
        {selectedOption === "choice" && (
          <div className="online-test-content">
            <div className="online-test-required-title">
              보기(정답)<p>정답에 체크해주세요.</p>
            </div>

            <div className="online-test-select-wrap">
              {multiple.map((item, index) => (
                <div className="online-test-select" key={index}>
                  <input
                    type="checkbox"
                    name={`option${index}`}
                    className="checkbox"
                    checked={answer === index}
                    onChange={e => {
                      handleCheckboxChange(e, index);
                    }}
                  />
                  <label htmlFor={`option${index}`}>{index + 1}</label>
                  <input
                    type="text"
                    className="select-input"
                    value={item.content}
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 정답 주관식 */}
        {selectedOption === "subjective" && (
          <div className="online-test-content">
            <div className="online-test-content-write">
              <div className="online-test-required-title">주관식</div>
              <TestInputAnswer
                placeholder={tempObj.wordMath}
                setWord={setAnswer}
              ></TestInputAnswer>
            </div>
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
  );
};

export default CreateTestMath;
