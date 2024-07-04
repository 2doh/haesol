const DropFields = ({ children }) => {
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <select className="fields-section-drop">
        <option value="none" hidden>
          가족관계
        </option>
        <option value="father">부</option>
        <option value="mother">모</option>
        <option value="grandfather">조부</option>
        <option value="grandfather">조모</option>
        <option value="grandfather">기타</option>
      </select>
    </div>
  );
};

export default DropFields;
