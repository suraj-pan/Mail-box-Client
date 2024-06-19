import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Compose from "./Pages/Compose";
import MailContainer from "./Pages/MailContainer";
import Header from "./components/Header";
import Outbox from "./Pages/Outbox";
import Protected from "./Pages/Protected";


function App() {

  
  return (
    <div className="min-h-screen  mx-auto bg-gradient-to-b from-slate-100 to-slate-300  px-4 md:px-8 lg:px-16 ">
 
      <BrowserRouter>
      <Header/>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signUp" element={<SignUp/>}  />
        <Route path="/login" element={<Login/>}  />
        <Route path="/compose" element={<Protected><Compose/></Protected> }  />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected> }  />
        <Route path="/mailContainer" element={ <Protected><MailContainer/></Protected>}  />
        <Route path="/sentMail" element={<Protected><Outbox/></Protected>}  />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
