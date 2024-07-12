import styled from "@emotion/styled";
import { delectAwaitAccept, singupAccept } from "api/admin/adminapi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "slices/modalSlice";
import "../../scss/modal/notbgclickmodal.css";
import "../../scss/modal/pwchangemodal.css";
import { allowScroll, preventScroll } from "./ScrollManagement";
import ViewPw from "./ViewPw";
import { putTeacherPwChange } from "api/teacher/teacherapi";

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

  & > .not-bg-click-modal {
    height: 250px;
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
`;

const TelAcceptModalStyle = styled.div`
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
`;

const Modal = () => {
  // 비밀번호 받아올 변수
  const [newPw, setNewPw] = useState();
  const [newPwRe, setNewPwRe] = useState();

  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  /** 모달 닫기 기능 */
  const modalClose = () => {
    dispatch(closeModal());
  };

  /** 확인 처리 */
  const modalAccept = () => {
    // 비밀번호 변경 모달의 경우

    if (modalState.modalType === "BasicModal") {
      console.log("BasicModal 타입 확인 버튼 클릭");
      // 처리
    }
    if (modalState.modalType === "ArrValueModal") {
      if (modalState.headerText.includes("반려")) {
        delectAwaitAccept(modalState.bodyText[2], modalState.bodyText[3]);
      }
      if (modalState.headerText.includes("승인")) {
        singupAccept(modalState.bodyText[2], modalState.bodyText[3]);
        modalState.bodyText[2], modalState.bodyText[3];
      }
      // axios 처리
    }
    if (modalState.modalType === "PasswordChangeModal") {
      // console.log(`신규 비밀번호 : ${newPw}, 재입력 : ${newPwRe}`);
      putTeacherPwChange(newPw, newPwRe);
    }

    // 전화번호 인증 코드를 받는 경우
    if (modalState.modalType === "TelAcceptModal") {
      console.log("10번");
      // axios 처리
    }

    // console.log("2번");
    dispatch(closeModal());
  };

  useEffect(() => {
    /** 모달 생성시 스크롤 금지 */
    const prevScrollY = preventScroll();

    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return (
    <ModalStyle>
      {/* <div className="not-bg-click-modal"> */}
      <div className="not-bg-click-modal pw-modal">
        {/* <div className="modal-inner"> */}
        <div className="modal-inner pw-modal-inner">
          <div className="modal-header">
            {/* <div className="modal-text">{state.modalHeader[1]}</div> */}
            <div className="modal-text">{modalState.headerText}</div>
          </div>
          {/* <div className="modal-body"> */}
          <div className="modal-body pw-modal-body">
            {modalState.modalType === "BasicModal" ? (
              <div className="modal-body-text-div">
                <div className="modal-text">{modalState.bodyText[0]}</div>
              </div>
            ) : null}
            {modalState.modalType === "PasswordChangeModal" ? (
              <>
                <div className="pw-modal-body-text-div">
                  <div className="pw-modal-text">신규 비밀번호</div>
                  <ViewPw setNewPw={setNewPw}></ViewPw>
                </div>
                <div className="pw-modal-body-text-div">
                  <div className="pw-modal-text">신규 비밀번호 재입력</div>
                  <ViewPw setNewPw={setNewPwRe}></ViewPw>
                </div>
              </>
            ) : null}
            {modalState.modalType === "ArrValueModal" ? (
              <>
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
              </>
            ) : null}
            {modalState.modalType === "TelAcceptModal" ? (
              <TelAcceptModalStyle>
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
                  <div className="tel-box-inner">
                    <input type="text"></input>
                    {/* <ViewPw setNewPw={setNewPw}>인증번호</ViewPw> */}
                  </div>
                  <div className="modal-timer-div">
                    <div className="modal-timer">(시간추가)</div>
                    <div className="modal-timer-icon"></div>
                  </div>
                </div>
              </TelAcceptModalStyle>
            ) : null}
          </div>
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
            {/* <div className="modal-text">3</div> */}
          </div>
        </div>
      </div>
    </ModalStyle>
  );
};

export default Modal;
