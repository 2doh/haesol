import "../../scss/online/createTest.css";
import BasicRating from "./BasicRating";

const CreateTest = () => {
  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* 제목 위치 */}
        <span>5학년 국어</span>
        <p>시험 출제</p>
      </div>
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
          <div className="online-test-required-title">내용(질문)</div>
          <textarea />
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">파일 첨부</div>
          <div className="online-test-file">
            <button type="button" className="bt-style">
              파일 업로드
            </button>
          </div>
        </div>
        <div className="online-test-content">
          <div className="online-test-required-title">보기(정답)</div>
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
      </div>
    </div>
  );
};

export default CreateTest;
