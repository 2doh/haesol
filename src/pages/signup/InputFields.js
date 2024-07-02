const InputFields = () => {
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">학생 이름</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder="재학중인 자녀의 이름을 입력해주세요"
        ></input>
      </div>
    </div>
  );
};

export default InputFields;
