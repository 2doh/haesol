import { getChildList } from "api/signup/parentapi";

const ChildInputFields = ({
  children,
  setUserChildrenName,
  userChildrenName,
  setUserChildrenPk,
  setOnModal,
  setIsChild,
  setChildList,
}) => {
  // const tempArr = [
  //   pk : 0
  //   name : "",
  //   grade : ""
  // ]
  const handleonClick = async e => {
    e.preventDefault();
    const result = await getChildList();
    // setUserChildrenName(result.data[0].name);
    setOnModal(true);
    if (userChildrenName) {
      const aaa = result.data.find(item => item.name === userChildrenName);
      console.log(aaa);
      const bbb = [...aaa, aaa];
      setChildList(bbb);
      console.log(bbb);
    }
    console.log(result);
  };

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-children"
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
