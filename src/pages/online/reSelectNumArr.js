import { updateTestDate } from "slices/testSlice";

/** 답안지 배열 갱신 */
const reSelectNumArr = (qNum, dispatch, testState, nowQuestionsNum) => {
  let numInfo = "";

  console.log("qNum : ", qNum);

  if (!nowQuestionsNum) {
    numInfo = qNum.split("_");
  } else {
    numInfo = qNum;
  }

  const selectNumArr = testState.selectNumArr;

  let copiedItems = selectNumArr.map(item => {
    if (nowQuestionsNum) {
      if (item.number === nowQuestionsNum + 1) {
        return { ...item, selectNum: numInfo };
      }
    } else {
      if (item.number === parseInt(numInfo[0])) {
        return { ...item, selectNum: parseInt(numInfo[1]) };
      }
    }

    return item;
  });
  const data = {
    selectNumArr: copiedItems,
  };

  dispatch(updateTestDate(data));

  return;
};

export default reSelectNumArr;
