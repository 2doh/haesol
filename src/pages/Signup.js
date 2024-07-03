import { useState } from "react";
import "../scss/signup/signup.scss";
import SignupParent from "../components/signup/SignupParent";
import SignupTeacher from "../components/signup/SignupTeacher";

const Signup = () => {
  const [userType, setUserType] = useState("parent");
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
        />
      ) : (
        <SignupTeacher
          handleSelect={handleSelect}
          handleSelectTeacher={handleSelectTeacher}
          userType={userType}
        />
      )}
    </div>
  );
};

export default Signup;
