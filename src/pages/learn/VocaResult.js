import FireworkConfetti from "components/learn/FireworkConfetti";
import ResultEmoji from "components/learn/ResultEmoji";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const VocaResult = ({ tempArr }) => {
  const initMsg = {
    perfect: "아주 훌륭한 결과입니다! 계속해서 좋은 결과를 기대할게요",
    great: "참 잘했어요! 100점 까지 화이팅!",
    good: "정말 잘했어요! 다음엔 더 높은 점수를 기대할게요",
    bad: "괜찮아요! 한번 더 공부해볼까요?",
  };
  const navi = useNavigate();
  const [score, setScore] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [resultState, setResultState] = useState("");
  console.log(tempArr);
  useEffect(() => {
    const newArr = tempArr.filter(item => item.isCorrect === false);
    const spareArr = tempArr.filter(item => item.isCorrect === null);
    const point = 100 / tempArr.length;
    const result = 100 - (newArr.length + spareArr.length) * point;
    setScore(result);
    if (result === 100) {
      setResultMsg(initMsg.perfect);
      setResultState("perfect");
    }
    if (result < 100 && result > 70) {
      setResultMsg(initMsg.great);
      setResultState("great");
    }
    if (result <= 70 && result > 50) {
      setResultMsg(initMsg.good);
      setResultState("good");
    }
    if (result < 50) {
      setResultMsg(initMsg.bad);
      setResultState("bad");
    }
  }, [tempArr]);
  return (
    <div className="bg-white p-16 rounded-lg shadow-lg w-full max-w-full text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-8  mt-10">Score</h1>
      <div className="text-8xl font-bold text-green-600 mb-8 mt-10">
        {score}점
      </div>
      <div className="mt-12">
        <ResultEmoji resultState={resultState} />
        <p className="text-3xl font-semibold text-gray-700 mb-6  mt-10">
          {resultMsg}
        </p>
      </div>
      <div className="mt-20 flex justify-center space-x-4 ">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
          onClick={() => {
            navi("/");
          }}
        >
          홈으로
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          onClick={() => {
            navi("/online");
          }}
        >
          다시하기
        </button>
      </div>
      {resultState === "perfect" && <FireworkConfetti />}
    </div>
  );
};

export default VocaResult;
