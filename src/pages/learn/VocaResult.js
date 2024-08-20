import { useEffect } from "react";

const VocaResult = tempArr => {
  const resultArr = tempArr.tempArr;
  console.log(tempArr);

  const bbb = resultArr.filter(item => {
    console.log(item);
    item.isCorrect === "false";
  });

  console.log(bbb);
  useEffect(() => {}, []);
  return <div>11</div>;
};

export default VocaResult;
