import { atom } from "recoil";
import { getCookie } from "utils/cookie";

const accessToken = getCookie("accessToken");
const userIdPk = getCookie("userIdPk");
const userRole = getCookie("userRole");
const selectChildNum = getCookie("selectChildNum");
const userGrade = getCookie("userGrade");
const userClass = getCookie("userClass");
const userName = getCookie("userName");
const userEmail = getCookie("userEmail");
const userChild = getCookie("studentPk");

const tempObjParent = {
  accessToken: accessToken,
  userIdPk: userIdPk,
  userRole: userRole,
  selectChildNum: selectChildNum,
  userChild: userChild,
};
const tempObjTeacher = {
  accessToken: accessToken,
  userIdPk: userIdPk,
  userRole: userRole,
  userGrade: userGrade,
  userClass: userClass,
  userName: userName,
  userEmail: userEmail,
};

// console.log(tempObjParent, tempObjTeacher);

export const userRoleState = atom({
  key: "userRoleState",
  default: {
    role: userRole,
    data:
      userRole === "ROLE_PARENTS"
        ? tempObjParent
        : userRole === "ROLE_TEACHER"
          ? tempObjTeacher
          : {},
  },
});
