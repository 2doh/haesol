import { getChildList } from "api/signup/parentapi";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import { useEffect } from "react";

const ChildInputFields = ({
  children,
  setUserChildrenName,
  userChildrenName,
  setOnModal,
  setChildList,
}) => {
  const handleonClick = async e => {
    e.preventDefault();
    const result = await getChildList();
    // console.log(result.data);
    setOnModal(true);
    if (userChildrenName) {
      // const findChild = find(
      //   item => item.name === userChildrenName,
      // );
      // console.log(findChild);
      const tempArr = result.data.filter(
        item => (item.name === userChildrenName) === true,
      );
      // console.log(tempArr);
      // const selectChild = Array.from(tempArr);
      // console.log(selectChild);
      setChildList(tempArr);
    }
    if (!userChildrenName) {
      setChildList(result.data);
    }
  };

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-children"
          placeholder="자녀이름"
          value={userChildrenName}
          onChange={e => setUserChildrenName(e.target.value)}
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
