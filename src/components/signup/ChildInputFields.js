import { getChildList } from "api/signup/parentapi";
import { updateModalDate } from "slices/modalSlice";

const ChildInputFields = ({
  children,
  setUserChildrenName,
  userChildrenName,
  setUserChildrenPk,
}) => {
  const handleonClick = async e => {
    e.preventDefault();
    const result = await getChildList();
    setUserChildrenName(result.data[0].name);
    // showModal("BasicModal");
    console.log(result.data[0]);
  };

  // const showModal = selectModalType => {
  //   const data = { bodyText: ["1"], buttonCnt: 1 };
  //   dispatch(updateModalDate(data));
  //   const modalRes = dispatch(openModal(selectModalType));
  // };

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <div className="fieleds-section-children">{userChildrenName}</div>
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
