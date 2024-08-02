import { updateTestDate } from "slices/testSlice";

/** 답안지 배열 갱신 */
const reSelectNumArr = (qNum, dispatch, testState) => {
  const numInfo = qNum.split("_");
  const selectNumArr = testState.selectNumArr;

  let copiedItems = selectNumArr.map(item => {
    if (item.number === parseInt(numInfo[0])) {
      return { ...item, selectNum: parseInt(numInfo[1]) };
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
