import styled from "@emotion/styled";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import "../../scss/online/createTest.css";
import BasicRating from "./BasicRating";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sendFile, setSendFile] = useState(null);
  const [starValue, setStarValue] = useState(3);
  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  const handleFileChange = e => {
    const file = e.target.files[0];
    // 파일 보관
    setSendFile(file);
  };

  const saveData = async e => {
    e.preventDefault();
    const formData = new FormData();
    const onlineTestData = JSON.stringify({
      // BE: FE,
      // 제목,
      // 난이도,
      // 문제내용,
      // 이미지있을수도없을수도,
      // 보기내용,
      // 정답,
    });
    console.log("onlineTestData : ", onlineTestData);

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
              onChange={e => {
                handleTitleChange(e);
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
            보기(정답)<p>정답에 체크해주세요.(복수 정답일 시 여러 개 체크)</p>
          </div>

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
              <label htmlFor="three">3</label>
              <input type="text" className="select-input" />
            </div>
            <div className="online-test-select">
              <input type="checkbox" name="four" className="checkbox" />
              <label htmlFor="four">4</label>
              <input type="text" className="select-input" />
            </div>
            <div className="online-test-select">
              <input type="checkbox" name="five" className="checkbox" />
              <label htmlFor="five">5</label>
              <input type="text" className="select-input" />
            </div>
          </div>
        </div>
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

export default CreateTest;
