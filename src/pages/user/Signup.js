import SignupField from "pages/user/signup/SignupField";
import UserSelect from "pages/user/signup/UserSelect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../images/logo.png";
import "../../scss/signup/signup.scss";
import Footer from "components/layout/Footer";

const Signup = ({ setOnHeader }) => {
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
    setOnHeader(true);
    navi("/");
  };

  useEffect(() => {
    setOnHeader(false);
  }, []);

  return (
    <div className="signup" style={{ flexDirection: "column" }}>
      <div className="signup-wrap" style={{ backgroundColor: "white" }}>
        <div
          className="signup-wrap-inner br20"
          style={{ marginBottom: "50px" }}
        >
          <div className="signup-wrap-inner-content">
            <div className="signup-top">
              <img
                className="siginup-logo"
                src={logo}
                onClick={() => {
                  setOnHeader(true);
                  navi("/");
                }}
              ></img>
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
      <Footer></Footer>
    </div>
  );
};

export default Signup;
