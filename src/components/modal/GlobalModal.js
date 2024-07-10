import { useDispatch, useSelector } from "react-redux";

const MODAL_TYPES = {
  LoginModal: "LoginModal",
  BasicModal: "BasicModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.LoginModal,
    component: <LoginModal />,
  },
  {
    type: MODAL_TYPES.BasicModal,
    component: <BasicModal />,
  },
];

const GlobalModal = () => {
  // modal type을 string 형태로 받습니다.
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return (
    <Container>
      <Overlay onClick={() => dispatch(closeModal())} />
      {renderModal()}
    </Container>
  );
};

export default GlobalModal;
