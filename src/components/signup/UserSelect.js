const UserSelect = ({ handleSelect, handleSelectTeacher, userType }) => {
  const btStyleParent = {
    backgroundColor: userType === "parent" ? "#dd838f" : "#fff",
    color: userType === "parent" ? "#fff" : "#dd838f",
  };
  const btStyleTeacher = {
    backgroundColor: userType === "teacher" ? "#dd838f" : "#fff",
    color: userType === "teacher" ? "#fff" : "#dd838f",
  };
  return (
    <div className="siginup-top-userselect">
      <div
        className="siginup-user-parent"
        onClick={e => {
          handleSelect(e);
        }}
        style={btStyleParent}
      >
        학부모
      </div>
      <div
        className="siginup-user-teacher"
        onClick={e => handleSelectTeacher(e)}
        style={btStyleTeacher}
      >
        교사용
      </div>
    </div>
  );
};

export default UserSelect;
