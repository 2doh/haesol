import styled from "@emotion/styled";
import { delectAwaitAccept, singupAccept } from "api/admin/adminapi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalDate } from "slices/modalSlice";
import "../../scss/modal/modal.css";
import { allowScroll, preventScroll } from "./ScrollManagement";
import ViewPw from "./ViewPw";
import { putTeacherPwChange } from "api/teacher/teacherapi";
import PhoneInputFields from "pages/student/PhoneInputFields";
import { getCookie } from "utils/cookie";
import { deleteNotice } from "api/student/studentapi";

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

    .text-box:nth-child(1) {
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
`;

const Modal = () => {
  // 비밀번호 받아올 변수
  const [newPw, setNewPw] = useState();
  const [newPwRe, setNewPwRe] = useState();

  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180); // 180초
  const timerId = useRef(null);

  const [validationMsg, setValidationMsg] = useState("");
  const [validationConfirmMsg, setValidationConfirmMsg] = useState("");
  // const pwWarning = useRef();
  const [newPwWarningCheck, setNewPwWarningCheck] = useState(false);
  const [newPwReWarningCheck, setNewPwReWarningCheck] = useState(false);

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
    if (modalState.modalType === "BasicModal") {
      if (modalState.modalRes[0] === 44) {
        console.log("삭제처리를 하겠습니다.");
        let res = deleteNotice(modalState.modalRes[1]);
        console.log("res : ", res);
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
      // console.log(`신규 비밀번호 : ${newPw}, 재입력 : ${newPwRe}`);
      if (
        newPwWarningCheck === true ||
        newPwReWarningCheck === true ||
        pwCheck === true
      ) {
        // console.log("비밀번호 수정 처리 진입");
        // console.log(getCookie("userIdPk"));
        putTeacherPwChange(newPw, modalState.bodyText);
      }
      dispatch(closeModal());
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

    if (modalState.modalType === "TelAcceptModal") {
      timerTime();
    }

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
      console.log("승인 후 들어오는 값은?", res);
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
        modalState.bodyText[3],
      );
      console.log("승인 후 들어오는 값은?", res);
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
              <div className="modal-body-text-div">
                <div className="modal-text">{modalState.bodyText[0]}</div>
              </div>
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
        </div>
      </div>
    </ModalStyle>
  );
};

export default Modal;
