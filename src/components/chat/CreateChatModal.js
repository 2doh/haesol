import styled from "@emotion/styled";
import React from "react";
const CreateChatModalWrap = styled.div`
  position: fixed;
  bottom: 230px;
  right: 120px;
  z-index: 9999999;
  width: 300px;
  height: 200px;
  background-color: #efece8;
  border-radius: 20px;
  overflow: hidden;
  /* padding: 20px; */
  .modal-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .chat-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      height: 80%;
      /* margin-top: 30px; */
      span {
        font-size: 18px;
      }
    }
    .create-chat-btn {
      height: 20%;
    }
  }
`;
const CreateChatModal = () => {
  return (
    <CreateChatModalWrap>
      <div className="modal-inner">
        <div className="chat-title">
          <span>채팅방 이름 설정</span>
          <input />
        </div>
        <div className="create-chat-btn">
          <button>생성</button>
          <button>취소</button>
        </div>
      </div>
    </CreateChatModalWrap>
  );
};

export default CreateChatModal;
