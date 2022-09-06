import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;