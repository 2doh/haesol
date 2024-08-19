import styled from "@emotion/styled";
import {
  delectAwaitAccept,
  patchAdminUserUpdate,
  singupAccept,
} from "api/admin/adminapi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, logoutModal, updateModalDate } from "slices/modalSlice";
import "../../scss/modal/modal.css";
import { allowScroll, preventScroll } from "./ScrollManagement";
import ViewPw from "./ViewPw";
import { patchTeacherInfo, putTeacherPwChange } from "api/teacher/teacherapi";
import PhoneInputFields from "pages/student/PhoneInputFields";
import { getCookie, removeCookie } from "utils/cookie";
import {
  deleteNotice,
  modifyStudentInfo,
  sendSmsPost,
} from "api/student/studentapi";

import NoticeList from "pages/notice/NoticeList";
import { useNavigate } from "react-router";
import { putChildInfo, putParentsPwChange } from "api/parents/mychildinfo";
import { getChild, getChildList, putChild } from "api/signup/parentapi";
import { getOnlineTest, postOnlineTest } from "api/online/onlinetestapi";
import moment from "moment";
import { updateTestDate } from "slices/testSlice";

const ModalStyle = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  /* height: 100vh; */
  height: 100%;
  width: 100vw;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    text-shadow: none;
  }

  .modal-inner {
    height: auto;
  }
  .tel-input-box {
    width: 65%;
    padding-bottom: 20px;

    .tel-box-inner {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #886348;
      overflow: hidden;
      display: flex;
      flex-direction: row;

      input[type="text"] {
        font-size: 18px;
        width: 100%;
        height: 100%;
        padding: 5px;
        border: none;
        //   border: 1px solid #886348;
      }
    }
  }
  .tel-accept-modal-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .text-box:nth-of-type(1) {
      padding-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .tel-input-box {
      position: relative;

      .modal-timer-div {
        padding-top: 8px;
        font-size: 13px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        flex-direction: row;
        gap: 10px;

        .modal-timer {
        }

        .modal-timer-icon {
          width: 20px;
          height: 20px;
          background-color: yellow;
        }
      }
    }
  }

  & .pw-error-msg {
    color: red;
    width: 100%;
    text-align: center !important;
  }

  .modal-inner {
    height: auto;
  }

  #add-child-code-input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #886348;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    font-size: 15px;
    padding-left: 10px;
  }
`;

const Modal = () => {
  const navigate = useNavigate();

  // 비밀번호 받아올 변수
  const [newPw, setNewPw] = useState();
  const [newPwRe, setNewPwRe] = useState();

  const modalState = useSelector(state => state.modalSlice);
  const testStage = useSelector(state => state.testSlice);
  const dispatch = useDispatch();
  const navi = useNavigate();

  // 자녀 코드
  const [childCode, setChildCode] = useState();
  const [addChildMsg, setAddChildMsg] = useState("");

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180); // 180초
  const timerId = useRef(null);

  const [validationMsg, setValidationMsg] = useState("");
  const [validationConfirmMsg, setValidationConfirmMsg] = useState("");
  // const pwWarning = useRef();
  const [newPwWarningCheck, setNewPwWarningCheck] = useState(false);
  const [newPwReWarningCheck, setNewPwReWarningCheck] = useState(false);

  // 정보 수정 모달
  const [updateUserState, setUpdateUserState] = useState(
    modalState.modalRes && modalState.modalRes[2]
      ? modalState.modalRes[2].state
      : "",
  );
  const [updateUserName, setUpdateUserName] = useState(
    modalState.modalRes && modalState.modalRes[2]
      ? modalState.modalRes[2].userName
      : "",
  );
  const [updateUserGrade, setUpdateUserGrade] = useState(
    modalState.modalRes && modalState.modalRes[2]
      ? modalState.modalRes[2].userGrade
      : "",
  );
  const [updateUserClass, setUpdateUserClass] = useState(
    modalState.modalRes && modalState.modalRes[2]
      ? modalState.modalRes[2].userClass
      : "",
  );
  const [updataeUserMsg, setUpdataeUserMsg] = useState("");

  // 온라인 시험 타이틀명
  const [testNameData, setTestNameData] = useState(
    moment().format("YYYY년 MM월 DD일  HH시mm분"),
  );

  useEffect(() => {
    // console.log("출력값 : ", updateUserName);
    // console.log("출력값 : ", modalState.modalRes);
  }, [updateUserState, updateUserName, updateUserGrade, updateUserClass]);

  const timerTime = () => {
    /** 타이머 리셋 : 추후 로그인 연장 기능 추가 예정 */
    clearInterval(timerId.current);
    clearInterval(time.current);
    timerId.current = null;
    time.current = 180;
    setMin(3);
    setSec(0);

    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  };

  /** 모달 닫기 기능 */
  const modalClose = () => {
    dispatch(closeModal());
  };

  /** 확인 처리 : 기능 추가 */
  const modalAccept = async () => {
    if (
      modalState.modalType === "BasicModal" ||
      modalState.modalType === "AddChildModal" ||
      modalState.modalType === "TestTitlelModal"
    ) {
      // 단순 true 출력
      if (modalState.modalRes[0] === 1) {
        // console.log("true 를 리턴합니다.");
        const data = {
          modalRes: [false],
        };
        dispatch(updateModalDate(data));
        dispatch(closeModal());
      }

      // 헤더 : 로그인 시간 만료시 로그아웃 처리
      if (modalState.modalRes[0] === 2) {
        // console.log("true 를 리턴합니다.");
        const data = {
          modalRes: [false],
        };
        dispatch(updateModalDate(data));
        dispatch(logoutModal());
      }

      // 교직원 : 취소
      if (modalState.modalRes[0] === 10) {
        const data = {
          modalRes: [false],
        };
        navigate("/teacher");
        dispatch(closeModal());
      }

      // 교직원 : 정보 수정 페이지 처리
      if (modalState.modalRes[0] === 11) {
        console.log("수정처리를 하겠습니다.", modalState.modalRes[1]);
        const res = patchTeacherInfo(modalState.modalRes[1]);
        if (res) {
          dispatch(closeModal());
          navigate("/teacher");
        }
      }

      // 학부모 - 학생 : 정보 수정 페이지 처리 : 더미
      if (modalState.modalRes[0] === 12) {
        console.log("수정처리를 하겠습니다.", modalState.modalRes[1]);
        const res = putChildInfo(modalState.modalRes[1]);
        if (res) {
          dispatch(closeModal());
        }
      }

      // 학부모 - 학생 : 정보 수정 페이지 처리
      if (modalState.modalRes[0] === 13) {
        console.log("수정처리를 하겠습니다.", modalState.modalRes[1]);
        const res = modifyStudentInfo(modalState.modalRes[1]);
        if (res) {
          dispatch(closeModal());
          alert("수정이 완료되었습니다!");
        }
      }
      // 학부모 - 자녀 추가
      if (modalState.modalRes[0] === 14) {
        handleAddChild();
      }

      // 아이디 중복 확인
      if (modalState.modalRes[0] === 16) {
        dispatch(closeModal());
      }

      // 회원가입
      if (modalState.modalRes[0] === 17) {
        dispatch(closeModal());
        navi("/login");
      }

      // 문자 메세지 발송
      if (modalState.modalRes[0] === 22) {
        console.log("확인 : ", modalState.modalRes[1]);
        sendSmsPost(modalState.modalRes[1]);
        const data = {
          modalRes: [false],
        };
        dispatch(updateModalDate(data));
        dispatch(closeModal());
      }

      // 알림장 작성 취소용
      if (modalState.modalRes[0] === 43) {
        navi(-1);
        const data = {
          modalRes: [false],
        };
        dispatch(updateModalDate(data));
        dispatch(closeModal());
      }

      // 알림장 삭제
      if (modalState.modalRes[0] === 44) {
        // console.log(modalState);
        deleteNotice(modalState.modalRes[1]);
        const data = {
          modalRes: [false],
        };
        dispatch(updateModalDate(data));
        dispatch(closeModal());
      }

      // 학생 한 명 정보 수정 (선생님)
      if (modalState.modalRes[0] === 45) {
        console.log("수정처리를 하겠습니다.", modalState.modalRes[1]);

        // FormData 객체 생성
        const formData = new FormData();
        formData.append(
          "p",
          new Blob([JSON.stringify(modalState.modalRes[1])], {
            type: "application/json",
          }),
        );
        formData.append("pic", modalState.modalRes[2]); // 이미지 파일 추가

        const handleModify = async () => {
          const res = await modifyStudentInfo(formData);
          if (res) {
            dispatch(closeModal());
            alert("수정이 완료되었습니다!");
          }
        };

        handleModify(); // 확인 버튼 클릭 시 데이터 전송
      }

      // 온라인 시험 제출 관련
      if (modalState.modalRes[0] === 50) {
        console.log("시험 제출 완!.", modalState.modalRes[1]);
        navi(0);
        // const res = true;
        // if (res) {
        //   dispatch(updateModalDate(res));
        //   dispatch(closeModal());
        // }
        const data = {
          modalRes: [false],
        };
        dispatch(updateModalDate(data));
        dispatch(closeModal());
      }

      // 온라인 시험 전 시험명 작성
      if (modalState.modalRes[0] === 54) {
        const res = await getOnlineTest(modalState.modalRes[1]);

        dispatch(closeModal());
        console.log(modalState.modalRes);

        if (res) {
          navigate("/online/test", {
            state: {
              subjectsNum: modalState.modalRes[1],
              subjectsName: modalState.modalRes[2],
              testName: testNameData,
            },
          });
        } else {
          alert(
            "시험 문제를 불러오지 못했습니다. 담당 학급 선생님께 문의하세요.",
          );
          navigate("/");
        }
      }
      // 온라인 시험 작성 후 저장 버튼
      if (modalState.modalRes[0] === 55) {
        // api 작성되면 추가하기
        const res = true;
        if (res) {
          dispatch(closeModal());
        }
      }

      // 온라인 시험 작성 후 제출 버튼
      if (modalState.modalRes[0] === 56) {
        // api 작성되면 추가하기
        let testPk = [];
        let testSelectNum = [];
        // console.log("테스트 정보 : ", testStage);

        // questionAllPk 배열에서 questionPk 값을 추출하여 testPk 배열에 추가
        testStage.questionAllPk.forEach(item => {
          console.log("questionPk : ", item.questionPk);
          testPk.push(item.questionPk); // 중첩 배열에서 첫 번째 값 추출
        });

        // selectNumArr 배열에서 selectNum 값을 추출하여 testSelectNum 배열에 추가
        testStage.selectNumArr.forEach(item => {
          console.log("selectNum : ", item.selectNum);
          testSelectNum.push(item.selectNum); // 중첩 배열에서 첫 번째 값 추출
        });

        const data = {
          questionPk: testPk,
          omrAnswer: testSelectNum,
          title: testStage.testTitle,
          subjectCode: testStage.subjectCode,
        };

        // console.log("data : ", data);
        const res = await postOnlineTest(data);

        if (res) {
          const newData = { incorrectAnswerNoteMain: res };
          dispatch(updateTestDate(newData));

          dispatch(closeModal());
          navigate("/online/test/grad");
        }
      }

      // 어드민 : 퇴사/비활성화 처리
      if (modalState.modalRes[0] === 911) {
        const res = patchAdminUserUpdate(modalState.modalRes[1]);
        if (res) {
          dispatch(closeModal());
        }
      }
    }

    if (modalState.modalType === "ArrValueModal") {
      if (modalState.headerText.includes("반려")) {
        delectAwaitAcceptFc();
        dispatch(closeModal());
      }
      if (modalState.headerText.includes("승인")) {
        singupAcceptFc();
        dispatch(closeModal());
      }
    }
    if (modalState.modalType === "PasswordChangeModal") {
      console.log(`신규 비밀번호 : ${newPw}, 재입력 : ${newPwRe}`);

      const pwOk = pwCheck();

      if (pwOk === true) {
        console.log("일치");
      }
      if (
        newPwWarningCheck === true ||
        newPwReWarningCheck === true ||
        pwOk === true
      ) {
        console.log("비밀번호 수정 처리 진입");
        // console.log(getCookie("userIdPk"));
        if (getCookie("userRole") === "ROLE_TEACHER") {
          putTeacherPwChange(newPw, modalState.bodyText);
        }
        if (getCookie("userRole") === "ROLE_PARENTS") {
          putParentsPwChange(newPw, modalState.bodyText);
        }
        dispatch(closeModal());
      }
    }

    // 전화번호 인증 코드를 받는 경우
    if (modalState.modalType === "TelAcceptModal") {
      console.log("10번");
      // axios 처리
      dispatch(closeModal());
    }

    // console.log("2번");
    // dispatch(closeModal());
  };

  useEffect(() => {
    /** 모달 생성시 스크롤 금지 */
    const prevScrollY = preventScroll();

    // if (modalState.modalType === "TelAcceptModal") {
    //   timerTime();
    // }

    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  /** 회원가입 반려 기능 */
  const delectAwaitAcceptFc = async () => {
    try {
      const res = await delectAwaitAccept(
        modalState.bodyText[2],
        modalState.bodyText[3],
      );
      if (res) {
        const data = {
          modalRes: [!modalState.modalRes],
        };
        dispatch(updateModalDate(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 회원가입 승인 기능 */
  const singupAcceptFc = async () => {
    try {
      const res = await singupAccept(
        modalState.bodyText[2],
        modalState.bodyText[3] + 1,
      );
      if (res) {
        const data = {
          modalRes: [!modalState.modalRes],
        };
        dispatch(updateModalDate(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 비밀번호 수정 기능 */
  const handleOnChange = e => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (regex.test(e.target.value)) {
      setValidationMsg("");
    } else {
      setValidationMsg("비밀번호 형식에 맞지 않습니다");
    }
  };

  // useEffect(() => {
  //   console.log("문제 체크 되나?");
  //   if (newPwWarningCheck) {
  //     console.log("문제없음");
  //   } else {
  //     console.log("문제있음");
  //   }
  //   // newPwReWarningCheck
  // }, [newPwWarningCheck, newPwReWarningCheck]);

  const pwCheck = () => {
    if (newPwRe === newPw) {
      console.log("확인중");
      setValidationConfirmMsg("");
      return true;
    } else {
      setValidationConfirmMsg("비밀번호가 일치하지 않습니다");
      return false;
    }
  };

  /** 자녀 추가 */
  const handleAddChild = async () => {
    console.log("자녀 코드 : ", childCode);

    if (!childCode) {
      setAddChildMsg("자녀 코드를 확인 후 다시 입력해주세요.");
    } else {
      // console.log("값 있음.");
      const res = await putChild({ searchWord: childCode });
      dispatch(closeModal());
      // console.log(res){}
    }

    // try {
    //   const res = await singupAccept(
    //     modalState.bodyText[2],
    //     modalState.bodyText[3],
    //   );
    //   if (res) {
    //     const data = {
    //       modalRes: [!modalState.modalRes],
    //     };
    //     dispatch(updateModalDate(data));
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  /** UserUpdateModal : 어드민 - 유저 정보 수정 */
  const singUserInfoUpdate = async e => {
    e.preventDefault();
    // console.log("모달의 입력 데이터 입니다.", e.target);

    const newData = {
      p: modalState.modalRes[0],
      pk: modalState.modalRes[2].pk,
      state: updateUserState,
      userName: updateUserName,
      userGrade: updateUserGrade,
      userClass: updateUserClass,
    };

    const res = await patchAdminUserUpdate(newData);

    if (res) {
      setUpdataeUserMsg(res);
    }
  };

  return (
    <ModalStyle>
      <div className="modal-wrap">
        <div className="modal-inner">
          <div className="modal-header">
            <div className="modal-text">{modalState.headerText}</div>
          </div>
          {/* ArrValueModal */}
          {modalState.modalType === "ArrValueModal" ? (
            <div className="modal-body arr-value-modal-body">
              <div className="modal-body-text-div">
                {modalState.bodyTextLabel.map((item, index) => (
                  <div className="modal-text" key={item}>
                    {modalState.bodyTextLabel[index]
                      ? modalState.bodyTextLabel[index]
                      : "\u00a0"}
                  </div>
                ))}
              </div>
              <div className="modal-body-text-div">
                {modalState.bodyTextLabel.map((item, index) => (
                  <div className="modal-text" key={item}>
                    :
                  </div>
                ))}
              </div>

              <div className="modal-body-text-div">
                {modalState.bodyTextLabel.map((item, index) => (
                  <div className="modal-text" key={item}>
                    {modalState.bodyText[index]
                      ? modalState.bodyText[index]
                      : "\u00a0"}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* BasicModal */}
          {modalState.modalType === "BasicModal" ? (
            <div className="modal-body basic-modal-body">
              <div className="modal-body-text-div basic-modal-div">
                <div className="modal-text">{modalState.bodyText[0]}</div>
              </div>
            </div>
          ) : null}

          {/* AddChildModal */}
          {modalState.modalType === "AddChildModal" ? (
            <div className="modal-body">
              <div className="pw-modal-body-text-div">
                <div className="pw-modal-text">자녀 코드</div>
                <input
                  type="text"
                  id="add-child-code-input"
                  value={childCode}
                  onChange={e => {
                    setChildCode(e.target.value);
                  }}
                />
              </div>

              {addChildMsg === "" ? null : (
                <div className="pw-modal-body-text-div pw-error-msg-div">
                  <div className="pw-modal-text pw-error-msg">
                    {addChildMsg}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* PasswordChangeModal */}
          {modalState.modalType === "PasswordChangeModal" ? (
            <div className="modal-body">
              <div className="pw-modal-body-text-div">
                <div className="pw-modal-text">신규 비밀번호</div>

                <ViewPw
                  setNewPw={setNewPw}
                  setNewPwWarningCheck={setNewPwWarningCheck}
                ></ViewPw>
              </div>
              <div className="pw-modal-body-text-div">
                <div className="pw-modal-text">신규 비밀번호 재입력</div>
                <ViewPw
                  setNewPw={setNewPwRe}
                  setNewPwWarningCheck={setNewPwReWarningCheck}
                ></ViewPw>
              </div>
              {validationConfirmMsg === "" ? null : (
                <div className="pw-modal-body-text-div pw-error-msg-div">
                  <div className="pw-modal-text pw-error-msg">
                    {validationConfirmMsg}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* TestTitlelModal  */}
          {modalState.modalType === "TestTitlelModal" ? (
            <div className="modal-body">
              <div className="modal-body-text-div basic-modal-div">
                <div className="modal-text">
                  시험명을 작성해주세요.
                  <br />
                  <br />
                  시험명을 작성하지 않으면
                  <br />
                  현재 시간({moment().format("YYYY년 MM월 DD일  HH시mm분")})으로
                  <br /> 자동 설정됩니다.
                  <br />
                  <br />
                </div>
              </div>
              <div className="pw-modal-body-text-div">
                <div className="modal-text">시험명</div>
                <div className="test-title-input-div">
                  <input
                    id="testTitleInput"
                    type="text"
                    placeholder="시험명을 입력해주세요."
                    onChange={e => {
                      setTestNameData(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {/* TelAcceptModal */}
          {modalState.modalType === "TelAcceptModal" ? (
            <div className="modal-body tel-accept-modal-body">
              <div className="tel-accept-modal-wrap">
                <div className="text-box">
                  <div className="modal-body-text-div">
                    {modalState.bodyTextLabel.map((item, index) => (
                      <div className="modal-text" key={item}>
                        {modalState.bodyTextLabel[index]
                          ? modalState.bodyTextLabel[index]
                          : "\u00a0"}
                      </div>
                    ))}
                  </div>
                  <div className="modal-body-text-div">
                    {modalState.bodyTextLabel.map((item, index) => (
                      <div className="modal-text" key={item}>
                        :
                      </div>
                    ))}
                  </div>
                  <div className="modal-body-text-div">
                    {modalState.bodyTextLabel.map((item, index) => (
                      <div className="modal-text" key={item}>
                        {modalState.bodyText[index]
                          ? modalState.bodyText[index]
                          : "\u00a0"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-box tel-input-box">
                  <h3>전화번호</h3>
                  <div className="tel-box-inner">
                    <form>
                      <select name="phone" id="phone_first" title="">
                        <option value="010" selected="selected">
                          010
                        </option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                      </select>
                      <p>-</p>
                      <input
                        type="text"
                        className="phone-input-text"
                        placeholder=""
                      ></input>
                      <p>-</p>
                      <input
                        type="text"
                        className="phone-input-text"
                        placeholder=""
                      ></input>
                    </form>
                    {/* <PhoneInputFields placeholder="전화번호를 입력하세요" /> */}
                    <button>인증번호 받기</button>
                  </div>
                  <div className="modal-timer-div">
                    <div className="modal-timer">
                      <div>{String(min).padStart(2, "0")}</div>
                      <div> : </div>
                      <div>{String(sec).padStart(2, "0")}</div>
                    </div>
                    <div className="modal-timer-icon"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* UserUpdateModal */}
          {modalState.modalType === "UserUpdateModal" ? (
            <div className="user-update-modal-wrap">
              <form
                onSubmit={e => {
                  singUserInfoUpdate(e);
                }}
              >
                <div className="user-update-modal-wrap-inner">
                  <div className="user-update-modal-body-text-div">
                    <div className="user-update-modal-text">
                      <div className="text-box">
                        <div>상태</div>
                        <div>:</div>
                      </div>
                    </div>
                    {modalState.modalRes[0] === 2 ? (
                      <div className="stateDate">재직</div>
                    ) : null}
                    {modalState.modalRes[0] === 3 ? (
                      <select
                        className="stateDate"
                        onChange={e => {
                          setUpdateUserState(e.target.value);
                        }}
                      >
                        <>
                          <option value="1">재학</option>
                          <option value="2">전학</option>
                          <option value="3">졸업</option>
                          <option value="4">퇴학</option>
                        </>
                      </select>
                    ) : null}
                  </div>
                  <div className="user-update-modal-body-text-div">
                    <div className="user-update-modal-text">
                      <div className="text-box">
                        <div>아이디</div>
                        <div>:</div>
                      </div>
                    </div>
                    <div className="idDate">{modalState.modalRes[3]}</div>
                  </div>
                  <div className="user-update-modal-body-text-div">
                    <div className="user-update-modal-text">
                      <div className="text-box">
                        <div>이름</div>
                        <div>:</div>
                      </div>
                    </div>
                    <input
                      type="text"
                      id="nameDate"
                      value={updateUserName}
                      onChange={e => {
                        setUpdateUserName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="user-update-modal-body-text-div">
                    <div className="user-update-modal-text">
                      <div className="text-box">
                        <div>학년</div>
                        <div>:</div>
                      </div>
                    </div>

                    <select
                      className="gradeDate"
                      value={updateUserGrade}
                      onChange={e => {
                        setUpdateUserGrade(e.target.value);
                      }}
                    >
                      <>
                        <option value="1">1 학년</option>
                        <option value="2">2 학년</option>
                        <option value="3">3 학년</option>
                        <option value="4">4 학년</option>
                        <option value="5">5 학년</option>
                        <option value="6">6 학년</option>
                      </>
                    </select>
                  </div>
                  <div className="user-update-modal-body-text-div">
                    <div className="user-update-modal-text">
                      <div className="text-box">
                        <div>학급</div>
                        <div>:</div>
                      </div>
                    </div>

                    <select
                      className="classDate"
                      value={updateUserClass}
                      onChange={e => {
                        setUpdateUserClass(e.target.value);
                      }}
                    >
                      <>
                        <option value="1">1 반</option>
                        <option value="2">2 반</option>
                        <option value="3">3 반</option>
                        <option value="4">4 반</option>
                        <option value="5">5 반</option>
                        <option value="6">6 반</option>
                      </>
                    </select>
                  </div>
                  {updataeUserMsg === "" ? null : (
                    <div className="pw-modal-body-text-div pw-error-msg-div">
                      <div className="pw-modal-text pw-error-msg">
                        {updataeUserMsg}
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <div className="modal-btn">
                    <button type="submit" className="white-button">
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        modalClose();
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : null}

          {modalState.modalType === "UserUpdateModal" ? null : (
            <div className="modal-footer">
              <div className="modal-btn">
                {modalState.buttonCnt === 1 ? (
                  <button
                    onClick={() => {
                      modalAccept();
                    }}
                    className="white-button"
                  >
                    {/* 취소 */}
                    {modalState.buttonText[0]}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        modalAccept();
                      }}
                      className="white-button"
                    >
                      {modalState.buttonText[0]}
                      {/* 완료 */}
                    </button>
                    <button
                      onClick={() => {
                        modalClose();
                      }}
                    >
                      {/* 취소 */}
                      {modalState.buttonText[1]}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalStyle>
  );
};

export default Modal;
