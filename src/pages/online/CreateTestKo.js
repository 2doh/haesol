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
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  // 문제 종류
  const [typeTag, setTypeTag] = useState("1");
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

  // useEffect(() => {
  //   console.log("체크되었다", answer);
  // }, [answer]);

  // 파일처리
  const [previewFile, setPreviewFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);

  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  const handleSelectChange = e => {
    setTypeTag(e.target.value);
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

  /** 체크된 정답 저장 */
  const handleCheckboxChange = (e, index) => {
    if (e.target.checked) {
      setAnswer(index);
      const newMultiple = multiple.map((item, i) => (i === index ? item : ""));
      setMultiple(newMultiple);
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
    const formData = new FormData();

    const multipleContents = multiple.map(item => item.content);

    const onlineTestData = JSON.stringify({
      // BE: FE,
      // 국어
      subjectCode: 1,
      // 제목,
      question: title,
      // 타입
      typeTag: typeTag,
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

    const dto = new Blob([onlineTestData], { type: "application/json" });
    formData.append("pic", dto);
    if (sendFile) {
      formData.append("file", sendFile);
    }
    try {
      console.log("국어 시험 post : ", formData.get(1));

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
                handleSelectChange(e);
              }}
            >
              <option value="1">독해</option>
              <option value="2">문법</option>
              <option value="3">문학</option>
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
        <div className="online-test-content">
          <div className="online-test-required-title">
            보기(정답)<p>정답에 체크해주세요.</p>
          </div>

          <div className="online-test-select-wrap">
            {multiple.map((item, index) => (
              <div className="online-test-select" key={index}>
                <input
                  type="checkbox"
                  // name={item.number}
                  name={`option${index}`}
                  className="checkbox"
                  // checked={setAnswer(index)}
                  // checked={item.checked}
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
          <button
            // onClick={() => {
            //   handleSave();
            // }}
            onClick={handleSave}
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

export default CreateTestKo;
