import styled from "@emotion/styled";
import "../../scss/modal/notbgclickmodal.css";
import { useContext, useState } from "react";
import { NotClickBgModalContext } from "context/NotClickBgModalProvider";

const NotBgClickModalStyle = styled.div`
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

const NotBgClickModal = ({
  cancel,
  setModalResult,
  headerText,
  bodyTextLabel,
  bodyText,
  buttonText,
}) => {
  // const { state, dispatch } = useContext(NotClickBgModalContext);
  // const [modalNum, setModalNum] = useState(state.modalNum);
  // console.log("NotClickBgModalContext : ", state);
  // console.log("modalNum : ", modalNum);

  const modalApproval = () => {
    setModalResult(true);
    cancel();
  };

  /** 모달 닫기 */
  const modalCancel = () => {
    cancel();
  };

  // console.log();

  return (
    <NotBgClickModalStyle>
      <div className="not-bg-click-modal">
        <div className="modal-inner">
          <div className="modal-header">
            {/* <div className="modal-text">{state.modalHeader[1]}</div> */}
            <div className="modal-text">{headerText}</div>
          </div>
          <div className="modal-body">
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
            <div className="modal-body-text-div">
              {bodyTextLabel.map((item, index) => (
                <div className="modal-text" key={item}>
                  {bodyTextLabel[index] ? bodyTextLabel[index] : "\u00a0"}
                </div>
              ))}
            </div>
            <div className="modal-body-text-div">
              {bodyTextLabel.map((item, index) => (
                <div className="modal-text" key={item}>
                  :
                </div>
              ))}
            </div>

            <div className="modal-body-text-div">
              {bodyTextLabel.map((item, index) => (
                <div className="modal-text" key={item}>
                  {bodyText[index] ? bodyText[index] : "\u00a0"}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-btn">
              <button
                onClick={() => {
                  modalApproval();
                }}
              >
                {/* 확인 */}
                {buttonText[0]}
              </button>
              <button
                onClick={() => {
                  modalCancel();
                }}
              >
                {/* 취소 */}
                {buttonText[1]}
              </button>
            </div>
            {/* <div className="modal-text">3</div> */}
          </div>
        </div>
      </div>
    </NotBgClickModalStyle>
  );
};

export default NotBgClickModal;
