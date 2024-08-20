import { updateTestDate } from "slices/testSlice";
import reSelectNumArr from "./reSelectNumArr";

/** quiz = omr 번호 체크 동기화 */
const answerSelect = (e, dispatch, testState, typeNum) => {
  console.log("typeNum 확인 : ", typeNum);

  if (typeNum === 1) {
    console.log("객관식", e.target.value);

    const data = {
      selectedValue: e.target.value,
    };

    dispatch(updateTestDate(data));

    reSelectNumArr(e.target.value, dispatch, testState, typeNum);
  }

  if (typeNum === 2) {
    console.log("주관식");

    const data = {
      selectedValue: e,
    };

    dispatch(updateTestDate(data));

    reSelectNumArr(e, dispatch, testState, typeNum);
  }
};

export default answerSelect;
