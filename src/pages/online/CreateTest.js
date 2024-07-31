import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../scss/online/createTest.css";
import DOMPurify from "dompurify";
import BasicRating from "./BasicRating";
import styled from "@emotion/styled";

const CreateTest = () => {
  const [content, setContent] = useState("");
  const [sendFile, setSendFile] = useState(null);
  const fileBt = useRef(null);

  const handleFileClick = () => {
    fileBt.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    // 파일 보관
    setSendFile(file);
  };

  // 모듈 활용
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
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
            ></input>
          </div>

          <div className="test-rating">
            <div className="online-test-required-title">난이도</div>
            <BasicRating />
          </div>
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">내용(문제)</div>
          {/* <textarea /> */}
          <form>
            <ReactQuill
              onChange={setContent}
              modules={modules}
              className="test-content-quill"
              placeholder="내용을 입력해주세요"
            />
          </form>
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">이미지 첨부</div>
          <div className="online-test-file">
            <div className="button-section">
              <button
                type="button"
                onClick={() => {
                  handleFileClick();
                }}
              >
                파일 업로드
              </button>
            </div>
            <input
              // 파일 이름 미리보기 가능하도록 변경 필요
              // style={{ display: "none" }}
              id="filebt_id"
              ref={fileBt}
              type="file"
              accept="image/*"
              onChange={e => handleFileChange(e)}
            />
          </div>
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">보기(정답)</div>
          <div></div>
          <div className="online-test-select-wrap">
            <div className="online-test-select">
              <input type="checkbox" name="one" className="checkbox" />
              <label htmlFor="one">1</label>
              <input type="text" className="select-input" />
            </div>
            <div className="online-test-select">
              <input type="checkbox" name="two" className="checkbox" />
              <label htmlFor="two">2</label>
              <input type="text" className="select-input" />
            </div>
            <div className="online-test-select">
              <input type="checkbox" name="three" className="checkbox" />
              <label htmlFor="two">3</label>
              <input type="text" className="select-input" />
            </div>
            <div className="online-test-select">
              <input type="checkbox" name="four" className="checkbox" />
              <label htmlFor="two">4</label>
              <input type="text" className="select-input" />
            </div>
            <div className="online-test-select">
              <input type="checkbox" name="five" className="checkbox" />
              <label htmlFor="two">5</label>
              <input type="text" className="select-input" />
            </div>
          </div>
        </div>
        <div className="button-section">
          <button
            onClick={() => {
              handleSave();
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

export default CreateTest;
