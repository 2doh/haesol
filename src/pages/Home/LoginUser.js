import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import styled from "@emotion/styled";
import { getMyChildInfo } from "api/parents/mychildinfo";
import { useEffect, useRef, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import "../../scss/main/mainlogin.css";
import ClassSchedule from "./ClassSchedule";

// import StudentImg from "pages/student/StudentImg";
import Chat from "./Chat";
import ClassNotice from "./ClassNotice";
import MainSchedule from "./MainSchedule";

const LoginUserStyle = styled.div`
  position: relative;
  /* border: 1px solid black; */
  /* display: flex;
  justify-content: center; */
  /* width: inherit; */
  /* margin: 0 40px; */

  .chat-btn {
    position: absolute;
    bottom: 40px;
    right: 40px;
  }

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

        /* .s-div {
          left: 158px;
        } */

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

const ChatWarp = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* display: none; */
`;

const LoginUser = () => {
  // 나중에 : api 수정 후

  const navigate = useNavigate();
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const [createdAt, setCreatedAt] = useState();

  const [myChildList, setMyChildList] = useState([]);
  const [offUseEffect, setOffUseEffect] = useState(false);

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

  // 이미지
  const [studentPic, setStudentPic] = useState(null);

  const [selectChildInfo, setSelectChildInfo] = useState([]);
  const [num, setnum] = useState(0);

  /** 메뉴 선택 */
  const [countIndex, setCountIndex] = useState(0);

  // const refStudentMenu1 = useRef();
  // const refStudentMenu2 = useRef();

  // ROLE_ADMIN = 어드민;
  // ROLE_TEAHCER = 교직원;
  // ROLE_PARENTS = 학부모;
  useEffect(() => {
    if (loginUserType === "ROLE_ADMIN") navigate("/admin/home");
    myChildInfo();
  }, []);

  /** 아이들 정보 불러오기 */

  useEffect(() => {
    // console.log("offUseEffect False");
    if (offUseEffect) {
      const num = getCookie("selectChildNum");
      // console.log("offUseEffect True");
      // console.log("정보 확인 : ", myChildList[num].name);

      /** 선택되어 있는 학생의 정보 저장 */
      setBirth(myChildList[num].birth);
      setClassId(myChildList[num].classId);
      setClassName(myChildList[num].classId);
      setGender(myChildList[num].gender);
      setName(myChildList[num].name);
      setParentName(myChildList[num].parentName);
      setParentPhone(myChildList[num].parentPhone);
      setParentsPK(myChildList[num].parentsPK);
      setPhone(myChildList[num].phone);
      setStudentPk(myChildList[num].studentPk);
      setAge(myChildList[num].age);
      setTeacherName(myChildList[num].teacherName);
      setStudentPic(myChildList[num].pic);
      setCookie("studentPk", myChildList[num].studentPk);
    }
  }, [getCookie("selectChildNum")]);

  const myChildInfoUpdate = async () => {};

  /** 아이들 정보 불러오기 */
  const myChildInfo = async () => {
    const res = await getMyChildInfo();

    if (res === false) {
      console.log("자녀 없음.");
    }

    const num = getCookie("selectChildNum");
    if (res) {
      // console.log("자녀 있음.");
      setMyChildList(res);
      // console.log(res);

      /** 선택되어 있는 학생의 정보 저장 */
      setBirth(res[num].birth);
      setClassId(res[num].classId);
      setClassName(res[num].classId);
      setGender(res[num].gender);
      setName(res[num].name);
      setParentName(res[num].parentName);
      setParentPhone(res[num].parentPhone);
      setParentsPK(res[num].parentsPK);
      setPhone(res[num].phone);
      setStudentPk(res[num].studentPk);
      setAge(res[num].age);
      setTeacherName(res[num].teacherName);
      setStudentPic(res[num].pic);
      setCookie("studentPk", res[num].studentPk);

      setOffUseEffect(true);
    }
  };

  useEffect(() => {
    myChildInfo();
  }, []);

  /** 알림장 최초 실행 */
  useEffect(() => {
    // const res = getRecentNoticeInfo(1);
    // console.log("알림장 : ", res);
  }, []);

  /** 반 시간표 */

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate("/studentinfo");
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
    removeCookie("studentPk");

    window.location.reload("/");
  };

  /** 메뉴 선택시 selectChildNum 변경 */
  const handleOnClick = (e, idx) => {
    setCountIndex(idx);
    setCookie("selectChildNum", idx);
  };

  const [isChat, setIsChat] = useState(false);
  const openChat = () => {
    setIsChat(!isChat);
  };

  return (
    <LoginUserStyle>
      {/* <ChatWarp> */}
      {/* <Chat /> */}
      {/* </ChatWarp> */}

      <div className="main-core">
        <div className="user-info-wrap">
          <div className="user-info-tap">
            <div className="property">
              {myChildList.map((item, index) => {
                // console.log("자녀의 수 : ", item);
                const leftPosition = index * 158; // 인덱스에 따라 left 위치 계산

                return (
                  <div
                    key={index}
                    id={index}
                    className={`div-wrapper ${countIndex === index ? "select-menu" : ""}`}
                    onClick={e => handleOnClick(e, index)}
                    // onChange={e => {
                    //   onChangeClcikMemu(e);
                    // }}
                    style={{ left: `${leftPosition}px` }}
                  >
                    <div className="text-wrapper">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <LoginParents /> */}
      <div className="access-login-main main">
        <div className="access-login-main-inner">
          <h1 className="access-login-title">{className}</h1>
          <div className="main-inner">
            <div className="main-inner-class login-user-view">
              {/* <div className="main-schedule main-class-schedule">
                <div className="main-schedule-title main-contents-title">
                  <div className="main-schedule-title-text ">우리반 시간표</div>
                </div>
                <div className="main-title-dwon-contents main-schedule-calendar">
                  <ClassSchedule />
                </div>
              </div> */}

              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">학교 일정</div>
              </div>
              <div className="main-title-dwon-contents main-schedule-calendar">
                <MainSchedule />
              </div>

              <div className="main-notice">
                <div className="main-schedule-title main-contents-title">
                  <div className="main-schedule-title-text ">알림장</div>
                  <div className="main-notice-day">{createdAt}</div>
                </div>
                <div className="main-title-dwon-contents">
                  {/* <ClassNotice setCreatedAt={setCreatedAt} /> */}
                </div>
              </div>
            </div>

            <div className="main-right-wrap">
              <div className="main-inner-info user-main-inner-info">
                <div className="main-login-user-info">
                  {/* <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text">학교 일정</div>
              </div> */}

                  <div className="main-inner-info-login">
                    <div className="login-inner">
                      <div className="login-user-info">
                        <div className="login-user-pic">
                          {/* <StudentImg
                          studentPic={studentPic}
                          setStudentPic={setStudentPic}
                          studentPk={studentPk}
                        /> */}
                        </div>
                        <div className="login-user-info-div">
                          <div className="login-user-info-label-box">
                            <div className="login-user-info-label">
                              학생 이름
                            </div>
                            <div className="login-user-info-label">생일</div>
                            <div className="login-user-info-label">학급</div>
                            <div className="login-user-info-label">
                              선생님 성함
                            </div>
                          </div>
                          <div className="login-user-info-label-box">
                            <div className="login-user-info-text">{name}</div>
                            <div className="login-user-info-text">
                              {/* {age === "" || age === null || age === 0 ? (
                                <div className="home-my-info-no-style">
                                  미등록
                                </div>
                              ) : (
                                age
                              )} */}

                              {birth === "" || birth === null || birth === 0 ? (
                                <div className="home-my-info-no-style">
                                  미등록
                                </div>
                              ) : (
                                birth
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

                    {/* 채팅방 시작 */}
                    {/* <div>
                      <Chat />
                    </div> */}
                    {/* 채팅방 끝 */}
                  </div>
                </div>
              </div>
              <div>{/* <Chat /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </LoginUserStyle>
  );
};
export default LoginUser;
