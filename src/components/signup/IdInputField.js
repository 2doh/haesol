import { duplicateParentId } from "api/signup/parentapi";
import { duplicateId } from "api/signup/teacherapi";
import { useEffect, useState } from "react";

const IdInputField = ({ userId, setUserId, userType, setUserType }) => {
  const [validationMsg, setValidationMsg] = useState("");
  // const dispatch = useDispatch();

  const handleCheckUserId = async e => {
    e.preventDefault();
    if (!userId) {
      setValidationMsg("아이디를 입력해 주세요");
      return;
    }
    if (userType === "parent") {
      const result = await duplicateParentId(userId);
      console.log(result.data);
      if (result.data === "사용할 수 있는 값입니다.") {
        setValidationMsg("사용 가능한 아이디 입니다");
        return;
      }
      if (result.data === "이미 사용 중 입니다.") {
        setValidationMsg("사용할 수 없는 아이디 입니다");
        return;
      }
    }
    if (userType === "teacher") {
      const result = await duplicateId(userId);
      console.log(result);
      if (result.status === 200) {
        setValidationMsg("사용가능한 아이디입니다");
        return;
      }
      if (result === "err") {
        setValidationMsg("사용할 수 없는 아이디 입니다");
        return;
      }
    }
  };

  // /** 모달 호출 */
  // const showModal = selectModalType => {
  //   const data = { bodyText: ["사용가능한 아이디입니다"] };
  //   dispatch(updateModalDate(data));
  //   const modalRes = dispatch(openModal(selectModalType));
  // };

  const handleOnChange = e => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,16}$/;
    if (regex.test(e.target.value)) {
      setValidationMsg("");
    } else {
      setValidationMsg("아이디 형식에 맞지 않습니다");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">아이디</div>
        <div className="fields-section-errmsg">{validationMsg}</div>
      </div>
      <div className="signup-main-fields-section-bottom-id">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder="아이디 입력 (영어,숫자가 포함된 6~16자)"
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            handleOnChange(e);
          }}
        ></input>
        <button
          className="check-duplicate-id-bt"
          onClick={e => {
            handleCheckUserId(e);
            // showModal("BasicModal");
          }}
        >
          중복확인
        </button>
      </div>
    </div>
  );
};

export default IdInputField;
