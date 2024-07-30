import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "store/store";
import App from "./App";
import "./index.css";
import Dog from "components/notfound/Dog";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App />);
root.render(
  <RecoilRoot>
    <Provider store={store}>
      <App />
    </Provider>
  </RecoilRoot>,
);
