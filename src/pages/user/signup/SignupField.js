import React from "react";
import SignupParent from "./SignupParent";
import SignupTeacher from "./SignupTeacher";
import SignupBt from "components/user/SignupBt";

const SignupField = ({ userType, handleCancel, setUserType }) => {
  return (
    <>
      {userType === "parent" ? (
        <SignupParent
          userType={userType}
          handleCancel={handleCancel}
          setUserType={setUserType}
        />
      ) : (
        <SignupTeacher
          userType={userType}
          handleCancel={handleCancel}
          setUserType={setUserType}
        />
      )}
    </>
  );
};

export default SignupField;
