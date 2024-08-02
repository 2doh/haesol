import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import store from "store/store";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </RecoilRoot>,
);
