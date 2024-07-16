import styled from "@emotion/styled";
import { getMyChildInfo } from "api/parents/mychildinfo";
import { getRecentNoticeInfo } from "api/teacher/teacherapi";
import { useEffect, useRef, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import "../../scss/main/mainlogin.css";
import ClassNotice from "./ClassNotice";
import ClassSchedule from "./ClassSchedule";

const LoginUserStyle = styled.div`
  /* border: 1px solid black; */
  /* display: flex;
  justify-content: center; */
  /* width: inherit; */
  /* margin: 0 40px; */
  .main-inner {
    border-radius: 0 0 10px 10px;
  }

  .main-core {
    .user-info-wrap {
      margin: 0px;
      width: auto;

      .user-info-tap {
        min-height: 50px;
      }

      .property {
        .frame {
          background-color: #fbfaf9;

          position: absolute;
          bottom: 0;
          & * {
            font-size: 16px;
          }
        }

        .div-wrapper {
          background-color: #fbfaf9;

          position: absolute;
          bottom: 0;

          & * {
            font-size: 16px;
          }
        }

        .s-div {
          left: 158px;
        }

        .select-menu {
          background-color: #e7d9d9;
          height: 50px;
          z-index: 1;
          & * {
            font-size: 18px;
          }
        }
      }
    }
  }

  & .access-login-main {
    border-radius: 0px 10px 10px 10px;
  }
`;

const LoginUser = () => {
  // 나중에 : api 수정 후

  const navigate = useNavigate();
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const [myChildList, setMyChildList] = useState([]);

  // 선택한 학생 번호 쿠키에 저장
  setCookie("selectChildNum", 0);

  // 선택되어 있는 학생 한 명의 정보
  const [birth, setBirth] = useState("");
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  // const [class, setClass] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentsPK, setParentsPK] = useState("");
  const [phone, setPhone] = useState("");
  const [studentPk, setStudentPk] = useState("");

  const [selectChildInfo, setSelectChildInfo] = useState([]);
  const [selectNum, setSelectNum] = useState(0);

  const refStudentMenu1 = useRef();
  const refStudentMenu2 = useRef();

  // ROLE_ADMIN = 어드민;
  // ROLE_TEAHCER = 교직원;
  // ROLE_PARENTS = 학부모;
  useEffect(() => {
    if (loginUserType === "ROLE_ADMIN") navigate("/admin/home");
    myChildInfo();
  }, []);

  /** 아이들 정보 불러오기 */
  const myChildInfo = async () => {
    const res = await getMyChildInfo();
    setMyChildList(res);
    // console.log(res);

    const num = getCookie("selectChildNum");

    /** 선택되어 있는 학생의 정보 저장 */
    setBirth(res[num].birth);
    setClassId(res[selectNum].classId);
    setClassName(res[selectNum].classId); // 여기 수정
    setGender(res[selectNum].gender);
    setName(res[selectNum].name);
    setParentName(res[selectNum].parentName);
    setParentPhone(res[selectNum].parentPhone);
    setParentsPK(res[selectNum].parentsPK);
    setPhone(res[selectNum].phone);
    setStudentPk(res[selectNum].studentPk);
    setAge(res[selectNum].age);
    setTeacherName(res[selectNum].teacherName);
  };

  useEffect(() => {
    myChildInfo();
  }, [getCookie("selectChildNum")]);

  /** 알림장 최초 실행 */
  useEffect(() => {
    const res = getRecentNoticeInfo(1);
    console.log("알림장 : ", res);
  }, []);

  /** 반 시간표 */

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    if (loginUserType === "ROLE_TEAHCER") navigate("/teacherinfo");
    if (loginUserType === "ROLE_PARENTS") navigate("/studentinfo");
  };

  /** 성적 확인 페이지 이동 */
  const moveMyGradePage = () => {
    // navigate("/grade/1");
    navigate(`/grade/${studentPk}`);
  };

  /** 로그아웃 기능 */
  const logout = () => {
    removeCookie("accessToken");
    removeCookie("userIdPk");
    removeCookie("userRole");
    removeCookie("selectChildNum");

    window.location.reload("/");
  };

  /** 메뉴 선택 */
  const onClickNameMemu = selectNum => {
    if (selectNum === 1) {
      refStudentMenu1.current.classList = "frame f-div select-menu";
      refStudentMenu2.current.classList = "div-wrapper s-div";
    }
    if (selectNum === 2) {
      refStudentMenu1.current.classList = "div-wrapper f-div";
      refStudentMenu2.current.classList = "frame s-div select-menu";
    }
  };

  return (
    <LoginUserStyle>
      <div className="main-core">
        <div className="user-info-wrap">
          <div className="user-info-tap">
            <div className="property">
              <div
                ref={refStudentMenu1}
                className="frame f-div select-menu"
                onClick={() => {
                  onClickNameMemu(1);
                }}
              >
                <div className="text-wrapper">{name}</div>
              </div>
              <div
                ref={refStudentMenu2}
                className="div-wrapper s-div"
                onClick={() => {
                  onClickNameMemu(2);
                }}
              >
                <div className="info-subtitle">김나래</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="access-login-main main">
        <div className="access-login-main-inner">
          <h1>{className}</h1>
          <div className="main-inner">
            <div className="main-inner-class login-user-view">
              <div className="main-schedule main-class-schedule">
                <div className="main-schedule-title main-contents-title">
                  <div className="main-schedule-title-text ">우리반 시간표</div>
                </div>
                <div className="main-title-dwon-contents main-schedule-calendar">
                  <ClassSchedule />
                </div>
              </div>
              <div className="main-notice">
                <div className="main-schedule-title main-contents-title">
                  <div className="main-schedule-title-text ">알림장</div>
                  {/* 알림장 날짜 받아오는 것으로 추후 수정 */}
                  <div className="main-notice-day">000</div>
                </div>
                <div className="main-title-dwon-contents">
                  <ClassNotice />
                </div>
              </div>
            </div>
            <div className="main-inner-info">
              <div className="main-login-user-info">
                {/* <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text">학교 일정</div>
              </div> */}
                <div className="main-inner-info-login">
                  <div className="login-inner">
                    <div className="login-user-info">
                      <div className="login-user-pic">사진 넣기</div>
                      <div className="login-user-info-div">
                        <div className="login-user-info-label-box">
                          <div className="login-user-info-label">학생 이름</div>
                          <div className="login-user-info-label">나이</div>
                          <div className="login-user-info-label">학급</div>
                          <div className="login-user-info-label">
                            선생님 성함
                          </div>
                        </div>
                        <div className="login-user-info-label-box">
                          <div className="login-user-info-text">{name}</div>
                          <div className="login-user-info-text">
                            {age === "" || age === null || age === 0 ? (
                              <div className="home-my-info-no-style">
                                미등록
                              </div>
                            ) : (
                              age
                            )}
                          </div>
                          <div className="login-user-info-text">
                            {className === "" || className === null ? (
                              <div className="home-my-info-no-style">
                                미등록
                              </div>
                            ) : (
                              className
                            )}
                          </div>
                          <div className="login-user-info-text">
                            {teacherName === "" || teacherName === null ? (
                              <div className="home-my-info-no-style">
                                미등록
                              </div>
                            ) : (
                              teacherName
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="logout-icon"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <MdOutlineLogout size="100%" title="로그아웃" />
                      </div>
                    </div>
                    {/* 프로필 버튼 영역 start */}
                    <div className="login-user-btn">
                      <button
                        className="subject-grade-btn"
                        onClick={() => {
                          moveMyGradePage();
                        }}
                      >
                        과목별 성적
                      </button>
                      <button
                        className="my-page-btn"
                        onClick={() => {
                          moveMyPage();
                        }}
                      >
                        마이페이지
                      </button>
                    </div>
                    {/* 프로필 버튼 영역 end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginUserStyle>
  );
};
export default LoginUser;
