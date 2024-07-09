import styled from "@emotion/styled";
import ViewPw from "components/common/ViewPw";
import React, { useEffect, useState } from "react";
import "../../scss/modal/pwchangemodal.css";

const PwChangeModalStyle = styled.div`
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

  & > .not-bg-click-modal {
    height: 250px;
  }

  .modal-inner {
    height: auto;
  }
`;

const PwChangeModal = ({ cancel }) => {
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

  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = "scroll";
    return currentScrollY;
  };

  /**
   * 스크롤을 허용하고, 스크롤 방지 함수에서 반환된 위치로 이동한다.
   */
  const allowScroll = prevScrollY => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return (
    <PwChangeModalStyle>
      <div className="not-bg-click-modal pw-modal">
        <div className="modal-inner pw-modal-inner">
          <div className="modal-header">
            {/* <div className="modal-text">{state.modalHeader[1]}</div> */}
            <div className="modal-text">비밀번호 재설정</div>
          </div>
          <div className="modal-body pw-modal-body">
            {/* <ViewPw setNewPw={setNowPw}></ViewPw> */}
            <div className="pw-modal-body-text-div">
              <div className="pw-modal-text">신규 비밀번호</div>
              <ViewPw setNewPw={setNewPw}></ViewPw>
            </div>
            <div className="pw-modal-body-text-div">
              <div className="pw-modal-text">신규 비밀번호 재입력</div>
              {/* <div className="pw-input-div"> */}
              <ViewPw setNewPw={setNewPwRe}></ViewPw>
              {/* </div> */}
            </div>
          </div>

          {/* <div className="modal-body-text-div">
              <div className="modal-text">구분</div>
              <div className="modal-text">:</div>
              <div className="modal-text">학부모</div>
            </div>
            <div className="modal-body-text-div">
              <div className="modal-text">아이디</div>
              <div className="modal-text">:</div>
              <div className="modal-text">acahe1d3</div>
            </div> */}
          {/* <div className="modal-body-text-div">
              <div className="modal-text">구분</div>
              <div className="modal-text">아이디</div>
            </div>
            <div className="modal-body-text-div">
              <div className="modal-text">:</div>
              <div className="modal-text">:</div>
            </div>

            <div className="modal-body-text-div">
              <div className="modal-text">학부모</div>
              <div className="modal-text">acahe1d3</div>
            </div> */}
          <div className="modal-footer">
            <div className="modal-btn">
              <button>확인</button>
              <button
                onClick={() => {
                  modalCancel();
                }}
              >
                취소
              </button>
            </div>
            {/* <div className="modal-text">3</div> */}
          </div>
        </div>
      </div>
    </PwChangeModalStyle>
  );
};

export default PwChangeModal;
