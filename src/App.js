import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Compose from "./Pages/Compose";
import MailContainer from "./Pages/MailContainer";
import Header from "./components/Header";
import Outbox from "./Pages/Outbox";


function App() {

  
  return (
    <div className="mx-auto w-[90%] max-h-full flex flex-col ">
 
      <BrowserRouter>
      <Header/>
        <Routes>
      
        <Route path="/" Component={SignUp}  />
        <Route path="/login" Component={Login}  />
        <Route path="/compose" Component={Compose}  />
        <Route path="/dashboard" Component={Dashboard}  />
        <Route path="/mailContainer" Component={MailContainer}  />
        <Route path="/sentMail" Component={Outbox}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
