import styled from "@emotion/styled";
import "../../scss/modal/notbgclickmodal.css";

import React from "react";

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
`;

const NotBgClickModal = () => {
  return (
    <NotBgClickModalStyle>
      <div className="not-bg-click-modal">
        <div className="modal-inner">
          <div className="modal-header">
            <div className="modal-text">신청 승인</div>
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
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-btn">
              <button>확인</button>
              <button>취소</button>
            </div>
            {/* <div className="modal-text">3</div> */}
          </div>
        </div>
      </div>
    </NotBgClickModalStyle>
  );
};

export default NotBgClickModal;
