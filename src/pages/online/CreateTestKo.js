import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import "../../scss/online/createTest.css";
import BasicRating from "./BasicRating";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { onlineTestCreate } from "api/online/onlinetestapi";
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

const CreateTestKo = () => {
  // 문제 종류
  const [typeTag, setTypeTag] = useState(11);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [starValue, setStarValue] = useState(3);
  // 보기 내용 저장 배열
  const [multiple, setMultiple] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  // 답 저장
  const [answer, setAnswer] = useState(null);

  // 해설
  const [explanation, setExplanation] = useState("");

  // 파일처리
  const [sendFile, setSendFile] = useState(null);

  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  const handleSelectTagType = e => {
    setTypeTag(e.target.value);
  };

  // 이미지 업로드 및 미리보기용 함수
  const handleFileChange = e => {
    const file = e.target.files[0];
    // 전송 파일 보관
    setSendFile(file);
    // 미리보기용
    // const url = URL.createObjectURL(file);
    // 웹 브라우저 임시 파일 주소
    // setPreviewFile(url);
  };

  /** 체크된 정답 저장 */
  const handleCheckboxChange = (e, index) => {
    if (e.target.checked) {
      setAnswer(index);
    } else {
      setAnswer(null);
    }
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
    if (answer === null) {
      alert("정답을 선택해주세요.");
      return;
    }
    const hasEmpty = multiple.some(item => item.content.trim() === "");
    if (hasEmpty) {
      alert("모든 보기를 입력해주세요.");
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

    const multipleContents = multiple.map(item => item.content);
    const onlineTestData = JSON.stringify({
      // BE: FE,
      // 국어
      subjectCode: 1,
      // 타입
      // typeTag: typeTag,
      typeTag: parseInt(typeTag, 10), // 선택한 유형 (정수형 변환)
      // 객관식
      queTag: 1,
      // 난이도,
      level: starValue,
      // 제목,
      question: title,
      // 문제내용,
      contents: contents,
      // 보기내용,
      multiple: multipleContents,
      // 정답,
      answer: answer,
      // 해설
      해설: explanation,
    });
    console.log("onlineTestData : ", onlineTestData);

    // JSON 데이터를 문자열로 변환하여 FormData에 추가

    const formData = new FormData();
    const dto = new Blob([onlineTestData], { type: "application/json" });
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
      const response = await onlineTestCreate(formData);
      console.log("데이터 전송 결과 : ", response);
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
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        <TestTitleStyled>
          {/* 제목 위치 */}
          <span>국어</span>
          <p>5학년 시험 출제</p>
        </TestTitleStyled>
        <div className="online-test-inner">
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
                name="korean-test"
                value={typeTag}
                onChange={e => {
                  handleSelectTagType(e);
                }}
              >
                <option value="11">독해</option>
                <option value="12">문법</option>
                <option value="13">문학</option>
              </select>
            </div>
            <form>
              <ReactQuill
                value={contents}
                onChange={value => {
                  setContents(value);
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
          <div className="online-test-content">
            <div className="online-test-required-title">해설</div>
            <form>
              <ReactQuill
                value={explanation}
                onChange={value => {
                  setExplanation(value);
                }}
                modules={modules}
                className="test-content-quill"
                placeholder="내용을 입력해주세요"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateTestKo;
