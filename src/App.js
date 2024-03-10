import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="mx-auto w-[90%] max-h-full flex flex-col ">
      <BrowserRouter>
        <Routes>
        <Route path="/signUp" Component={SignUp}  />
        <Route path="/login" Component={Login}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
