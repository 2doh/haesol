import { useDispatch } from "react-redux";
import { updateTestDate } from "slices/testSlice";
import reSelectNumArr from "./reSelectNumArr";

/** quiz = omr 체크 동기화 */
const answerSelect = (e, dispatch, testState) => {
  const data = {
    selectedValue: e.target.value,
  };

  dispatch(updateTestDate(data));
  reSelectNumArr(e.target.value, dispatch, testState);

  return;
};

export default answerSelect;
