import { createContext, useEffect, useReducer } from "react";

const initialState = {
  modalNum: 0, // 0 : 비활성화, 1 : 신청 승인, 2 : 신청 반려
  modalHeader: ["", "신청 승인", "신청 반려"],
  modalContents: [],
  modalBtn: ["완료", "취소"],
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "BBB":
      return { ...state, modalContents: action.payload };
    default:
      return state;
  }
};

export const NotClickBgModalContext = createContext();

const NotClickBgModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  useEffect(() => {
    dispatch({ type: "BBB", payload: 1 });
    console.log("값 : ", initialState);
  }, []);

  return (
    <NotClickBgModalContext.Provider value={{ state, dispatch }}>
      {children}
    </NotClickBgModalContext.Provider>
  );
};

export default NotClickBgModalProvider;
