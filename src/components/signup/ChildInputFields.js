import { getChildList } from "api/signup/parentapi";

const ChildInputFields = ({
  children,
  setUserChildrenName,
  userChildrenName,
}) => {
  const handleonClick = async e => {
    e.preventDefault();
    const result = await getChildList();
    console.log(result);
  };

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
