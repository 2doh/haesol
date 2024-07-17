import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "store/store";
import App from "./App";
import "./index.css";
import Dog from "components/notfound/Dog";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App />);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
