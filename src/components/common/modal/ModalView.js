import styled from "@emotion/styled";
import { Modal } from "antd";

const ModalStyle = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
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

  .not-bg-click-modal {
    position: absolute;
    top: 35%;
    height: 250px;
  }

  .modal-inner {
    height: auto;
  }
`;

const ModalView = () => {
  return (
    <ModalStyle>
      <Modal />
    </ModalStyle>
  );
};

export default ModalView;
