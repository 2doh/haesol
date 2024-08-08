import { getChildList } from "api/signup/parentapi";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import { useEffect } from "react";

const ChildInputFields = ({
  children,
  setUserChildrenCode,
  userChildrenCode,
  setOnModal,
  setChildList,
  setIsChild,
}) => {
  const handleonClick = async e => {
    e.preventDefault();
    const reqData = {
      searchWord: userChildrenCode,
    };
    console.log(reqData);
    const result = await getChildList(reqData);
    console.log(result);
    if (result.data.response === "성공적으로 등록 되었습니다") {
      alert("자녀 확인 완료");
      setIsChild(true);
    }
    if (result.data.response !== "성공적으로 등록 되었습니다") {
      alert(result.data.response);
      setIsChild(true);
    }

    // setOnModal(true);
    // if (userChildrenCode) {
    //   // const findChild = find(
    //   //   item => item.name === userChildrenName,
    //   // );
    //   // console.log(findChild);
    //   const tempArr = result.data.filter(
    //     item => (item.name === userChildrenCode) === true,
    //   );
    //   if (tempArr.length === 0) {
    //     alert("자녀 이름을 확인해주세요");
    //     setOnModal(false);
    //     return;
    //   }
    //   // console.log(tempArr);
    //   // const selectChild = Array.from(tempArr);
    //   // console.log(selectChild);
    //   setChildList(tempArr);
    // }
    // if (!userChildrenCode) {
    //   setChildList(result.data);
    // }
  };

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-children"
          placeholder="자녀코드"
          value={userChildrenCode}
          onChange={e => setUserChildrenCode(e.target.value)}
        />
        <button
          className="check-duplicate-id-bt"
          onClick={e => {
            handleonClick(e);
          }}
        >
          자녀확인
        </button>
      </div>
    </div>
  );
};

export default ChildInputFields;
