import FireworkConfetti from "components/learn/FireworkConfetti";
import ResultEmoji from "components/learn/ResultEmoji";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// ResultItem 타입 정의
interface ResultItem {
  wordQuePk?: number;
  queId?: number;
  word?: string;
  answer?: string;
  question?: string;
  sentence?: string;
  isCorrect?: boolean | null; // isCorrect가 true, false 또는 null이 될 수 있으므로 boolean | null로 정의
}

interface VocaResultProps {
  tempArr: ResultItem[]; // tempArr는 ResultItem 타입의 배열로 정의
}

const VocaResult: React.FC<VocaResultProps> = ({ tempArr }) => {
  const initMsg = {
    perfect: "아주 훌륭한 결과입니다! 계속해서 좋은 결과를 기대할게요",
    great: "참 잘했어요! 100점 까지 화이팅!",
    good: "정말 잘했어요! 다음엔 더 높은 점수를 기대할게요",
    bad: "괜찮아요! 한번 더 공부해볼까요?",
  };

  const navi = useNavigate();

  // 점수와 결과 메시지 및 상태 값의 타입 지정
  const [score, setScore] = useState<number | string>(""); // score는 number 또는 string일 수 있음
  const [resultMsg, setResultMsg] = useState<string>(""); // resultMsg는 string 타입
  const [resultState, setResultState] = useState<string>(""); // resultState는 string 타입

  useEffect(() => {
    const newArr = tempArr.filter(item => item.isCorrect === false);
    const spareArr = tempArr.filter(item => item.isCorrect === null);
    const point = 100 / tempArr.length;
    const result = Math.round(100 - (newArr.length + spareArr.length) * point);
    setScore(result);

    // 점수에 따른 메시지 설정
    if (result === 100) {
      setResultMsg(initMsg.perfect);
      setResultState("perfect");
    } else if (result < 100 && result > 70) {
      setResultMsg(initMsg.great);
      setResultState("great");
    } else if (result <= 70 && result > 50) {
      setResultMsg(initMsg.good);
      setResultState("good");
    } else {
      setResultMsg(initMsg.bad);
      setResultState("bad");
    }
  }, [tempArr]);

  return (
    <div className="bg-white p-16 rounded-lg shadow-lg w-full max-w-full text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 mt-10">Score</h1>
      <div className="text-8xl font-bold text-green-600 mb-8 mt-10">
        {score}점
      </div>
      <div className="mt-12">
        <ResultEmoji resultState={resultState} />
        <p className="text-3xl font-semibold text-gray-700 mb-6 mt-10">
          {resultMsg}
        </p>
      </div>
      <div className="mt-20 flex justify-center space-x-4">
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
