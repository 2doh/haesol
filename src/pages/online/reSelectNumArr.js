import { updateTestDate } from "slices/testSlice";

/** 답안지 배열 갱신 */
const reSelectNumArr = (qNum, dispatch, testState, typeNum) => {
  // (typeNum) 1: 객관식, 2 : 주관식

  let numInfo = "";

  if (typeNum === 1) {
    numInfo = qNum.split("_");
  } else {
    numInfo = qNum;
  }

  const selectNumArr = testState.selectNumArr;

  let copiedItems = selectNumArr.map(item => {
    if (typeNum === 2) {
      if (item.number === testState.nowQuestionsNum + 1) {
        // const data = {
        //   number: item.number,
        //   selectNum: numInfo,
        // };
        return {
          ...item,
          selectNum: numInfo,
        };
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
