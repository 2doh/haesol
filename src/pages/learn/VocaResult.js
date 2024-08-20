import { useEffect, useState } from "react";

const VocaResult = ({ tempArr }) => {
  const [score, setScore] = useState("");

  useEffect(() => {
    const newArr = tempArr.filter(item => item.isCorrect === false);
    const result = 100 - newArr.length * 5;
    setScore(result);
  }, [tempArr]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-8">
      <div className="bg-white p-16 rounded-lg shadow-lg w-full max-w-full text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Score</h1>
        <div className="text-8xl font-bold text-green-600 mb-8">{score}점</div>
        <div className="mt-12">
          <p className="text-3xl font-semibold text-gray-700 mb-6">
            참 잘했어요!
          </p>
          <div className="flex justify-center mb-6"></div>
          <p className="text-xl text-gray-600 mt-6">
            아주 훌륭한 결과입니다! 계속해서 좋은 결과를 기대할게요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VocaResult;
