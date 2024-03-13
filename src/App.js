import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Compose from "./Pages/Compose";


function App() {

  
  return (
    <div className="mx-auto w-[90%] max-h-full flex flex-col ">
      <BrowserRouter>
        <Routes>
        <Route path="/" Component={SignUp}  />
        <Route path="/login" Component={Login}  />
        <Route path="/compose" Component={Compose}  />
        <Route path="/dashboard" Component={Dashboard}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
