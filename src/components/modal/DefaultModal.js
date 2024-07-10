import styled from "@emotion/styled";
import ViewPw from "components/common/ViewPw";
import React, { useEffect, useState } from "react";
import "../../scss/modal/notbgclickmodal.css";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "slices/modalSlice";

const DefaultModalStyle = styled.div`
  position: absolute;
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
`;

const DefaultModal = ({
  cancel,
  setModalResult,
  headerText,
  bodyText,
  buttonText,
  buttonNum,
}) => {
  const dispatch = useDispatch();
  const showPwChangeModal = () => {
    dispatch(closeModal());
    // console.log("State 출력 : ", modalState);
  };

  // 버튼 갯수
  // const btnNum = 2;

  // (공용) 비밀번호 받아올 변수
  //   const [nowPw, setNowPw] = useState();
  const [newPw, setNewPw] = useState();
  const [newPwRe, setNewPwRe] = useState();

  //   useEffect(() => {
  //     console.log("nowPw 확인 : ", nowPw);
  //     console.log("newPw 확인 : ", newPw);
  //     console.log("newPwRe 확인 : ", newPwRe);
  //   }, [nowPw, newPw, newPwRe]);

  /** 모달 닫기 */
  const modalCancel = () => {
    cancel();
  };





  
  /** 승인 : 확인 버튼 클릭 */
  const modalApproval = () => {
    setModalResult(true);
    cancel();
  };

  useEffect(() => {
    // 모달 생성시 스크롤 금지
    const prevScrollY = preventScroll();

    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return (
    <DefaultModalStyle>
      <div className="not-bg-click-modal">
        <div className="modal-inner">
          <div className="modal-header">
            {/* <div className="modal-text">{state.modalHeader[1]}</div> */}
            <div className="modal-text">{headerText}</div>
          </div>
          <div className="modal-body">
            <div className="modal-body-text-div">
              <div className="modal-text">{bodyText[0]}</div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-btn">
              {buttonNum === 2 ? (
                <>
                  <button
                    onClick={() => {
                      modalApproval();
                    }}
                    className="white-button"
                  >
                    {buttonText[0]}
                    {/* 완료 */}
                  </button>
                  <button
                    onClick={() => {
                      showPwChangeModal();
                      // modalCancel();
                    }}
                  >
                    {/* 취소 */}
                    {buttonText[1]}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    modalApproval();
                  }}
                >
                  {buttonText[0]}
                  {/* 완료 */}
                </button>
              )}
            </div>
            {/* <div className="modal-text">3</div> */}
          </div>
        </div>
      </div>
    </DefaultModalStyle>
  );
};

export default DefaultModal;
