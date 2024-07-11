import NotClickBgModalProvider, {
  NotClickBgModalContext,
} from "context/NotClickBgModalProvider";
import { useContext } from "react";

const Modal = () => {
  const aaa = useContext(NotClickBgModalContext);
  console.log("aaa : ", NotClickBgModalContext);
  const handleClick = () => {
    // setBucket([
    //   { pk: 1, goodname: "사과" },
    //   { pk: 2, goodname: "딸기" },
    // ]);
    // const data = [
    //   { pk: 1, goodname: "사과" },
    //   { pk: 2, goodname: "딸기" },
    // ];
    // dispatch({ type: "SET_BUCKET", payload: data });
  };

  //   console.log("확인 : ", state);
  return (
    <NotClickBgModalProvider>
      {/* <p>장바구니 목록 : {state}</p> */}
      {/* <button
        onClick={() => {
          handleClick();
        }}
      >
        장바구니 업데이트
      </button> */}
      {/* <NotBgClickModal /> */}
    </NotClickBgModalProvider>
  );
};

export default Modal;
