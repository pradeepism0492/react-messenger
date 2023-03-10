import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Messenger from "./components/Messenger";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Messenger />} />
          <Route path="/messenger/login" element={<Login />} />
          <Route path="/messenger/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
