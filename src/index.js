import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "store/store";
import App from "./App";
import "./index.css";
import Dog from "components/notfound/Dog";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userRoleState } from "atoms/userState";
import { useEffect } from "react";
import { getCookie } from "utils/cookie";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

// InitializeUserRole 컴포넌트 정의
// const InitializeUserRole = () => {
//   const setUserRole = useSetRecoilState(userRoleState);

//   useEffect(() => {
//     const role = getCookie("userRole");
//     if (role) {
//       setUserRole(role);
//     }
//   }, [setUserRole]);

//   return null;
// };

// root.render(<App />);
root.render(
  <RecoilRoot>
    <Provider store={store}>

      {/* <InitializeUserRole /> */}

      <App />
    </Provider>
  </RecoilRoot>,
);
