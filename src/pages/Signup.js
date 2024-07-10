import { useState } from "react";
import "../scss/signup/signup.scss";
import SignupParent from "../components/signup/SignupParent";
import SignupTeacher from "../components/signup/SignupTeacher";
import { useNavigate } from "react-router";

const Signup = () => {
  const [userType, setUserType] = useState("parent");
  const navi = useNavigate();
  const handleCancel = () => {
    navi("/");
  };
  const handleSelect = e => {
    e.preventDefault();
    setUserType("parent");
  };
  const handleSelectTeacher = e => {
    e.preventDefault();
    setUserType("teacher");
  };
  return (
    <div className="signup">
      {userType === "parent" ? (
        <SignupParent
          handleSelect={handleSelect}
          handleSelectTeacher={handleSelectTeacher}
          userType={userType}
          handleCancel={handleCancel}
        />
      ) : (
        <>
          <SignupTeacher
            handleSelect={handleSelect}
            handleSelectTeacher={handleSelectTeacher}
            userType={userType}
            handleCancel={handleCancel}
          />
        </>
      )}
    </div>
  );
};

export default Signup;
