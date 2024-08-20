import { useDispatch } from "react-redux";
import { updateTestDate } from "slices/testSlice";
import reSelectNumArr from "./reSelectNumArr";

/** quiz = omr 체크 동기화 */
const answerSelect = (e, dispatch, testState, nowQuestionsNum) => {
  console.log("nowQuestionsNum : ", nowQuestionsNum);
  if (nowQuestionsNum) {
    console.log("주관식");

    const data = {
      selectedValue: e,
    };

    dispatch(updateTestDate(data));

    reSelectNumArr(e, dispatch, testState, nowQuestionsNum);
  } else {
    console.log("객관식", e.target.value);

    const data = {
      selectedValue: e.target.value,
    };

    dispatch(updateTestDate(data));

    reSelectNumArr(e.target.value, dispatch, testState);
  }

  return;
};

export default answerSelect;
