import NotBgClickModal from "components/modal/NotBgClickModal";
import React, { useContext } from "react";

const MyContext = createContext();
// export const TodoContext = createContext(null);

const Modal = () => {
  return (
    <>
      <NotBgClickModal />
    </>
  );
};

export default Modal;
