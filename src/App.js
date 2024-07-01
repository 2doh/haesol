import "./css/reset.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";

function App() {
  return (
    <BrowserRouter>
      header
      <Routes>
        <Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/" element="test"></Route>
          <Route path="/" element="test"></Route>
          <Route path="/" element="test"></Route>
          <Route path="/" element="test"></Route>
        </Route>
      </Routes>
      footer
    </BrowserRouter>
  );
}

export default App;
