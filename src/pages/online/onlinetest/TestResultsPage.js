import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "api/config";
import { useState } from "react";

const TestResultsPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  // 여기에 당신의 API 키를 넣어주세요
  const genAI = new GoogleGenerativeAI(AI_KEY);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue("");
      const response = result.response;
      const text = response.text();
      console.log(text);
      setpromptResponses([...promptResponses, text]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("문제가 생겼어요");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="물어보고 싶은 것을 말해주세요"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button
            onClick={getResponseForGivenPrompt}
            className="btn btn-primary"
          >
            전송
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">로딩중...</span>
            {/* // 당신의 질문에 대한 답변이 생성되는 동안에 표시되는 메시지 */}
          </div>
        </div>
      ) : (
        promptResponses.map((promptResponse, index) => (
          <div key={index}>
            <div
              className={`response-text ${index === promptResponses.length - 1 ? "fw-bold" : ""}`}
            >
              {promptResponse}
            </div>
            {/* // 가장 최근 응답이 굵게 표시됩니다 */}
          </div>
        ))
      )}
    </div>
  );
};

export default TestResultsPage;
