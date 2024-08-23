import { atom } from "recoil";
import { getCookie } from "utils/cookie";

// 쿠키에서 가져온 값의 타입 정의
const accessToken = getCookie("accessToken") || "";
const userIdPk = getCookie("userIdPk") || "";
const userRole = getCookie("userRole") || "";
const selectChildNum = getCookie("selectChildNum") || "";
const userGrade = getCookie("userGrade") || "";
const userClass = getCookie("userClass") || "";
const userName = getCookie("userName") || "";
const userEmail = getCookie("userEmail") || "";
const userChild = getCookie("studentPk") || "";

// 각 역할에 대한 타입 정의
interface ParentData {
  accessToken: string;
  userIdPk: string;
  userRole: string;
  selectChildNum: string;
  userChild: string;
}

interface TeacherData {
  accessToken: string;
  userIdPk: string;
  userRole: string;
  userGrade: string;
  userClass: string;
  userName: string;
  userEmail: string;
}

type UserRoleData = ParentData | TeacherData;

// atom의 상태 타입 정의
interface UserRoleState {
  role: string;
  data: UserRoleData;
}

// 기본값 정의
const tempObjParent: ParentData = {
  accessToken: accessToken,
  userIdPk: userIdPk,
  userRole: userRole,
  selectChildNum: selectChildNum,
  userChild: userChild,
};

const tempObjTeacher: TeacherData = {
  accessToken: accessToken,
  userIdPk: userIdPk,
  userRole: userRole,
  userGrade: userGrade,
  userClass: userClass,
  userName: userName,
  userEmail: userEmail,
};

// atom 생성
export const userRoleState = atom<UserRoleState>({
  key: "userRoleState",
  default: {
    role: userRole,
    data:
      userRole === "ROLE_PARENTS"
        ? tempObjParent
        : userRole === "ROLE_TEACHER"
          ? tempObjTeacher
          : ({} as UserRoleData),
  },
});
