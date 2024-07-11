import SignupField from "components/signup/SignupField";
import UserSelect from "components/signup/UserSelect";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../images/logo_b.png";
import "../scss/signup/signup.scss";

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
  const navi = useNavigate();
  const handleCancel = () => {
    navi("/");
  };

  return (
    <div className="signup">
      <div className="signup-wrap">
        <div className="signup-wrap-inner br20">
          <div className="signup-wrap-inner-content">
            <div className="signup-top">
              <img className="siginup-logo" src={logo}></img>
              <UserSelect
                handleSelect={handleSelect}
                handleSelectTeacher={handleSelectTeacher}
                userType={userType}
              />
            </div>
            <SignupField
              userType={userType}
              handleCancel={handleCancel}
              setUserType={setUserType}
            ></SignupField>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
