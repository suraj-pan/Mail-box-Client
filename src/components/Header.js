import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {logout} from "../store/Auth"

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleLogout =()=>{
    dispatch(logout())
    /// navigate issue hai
    navigate("/login")
  }
  return (
    <div className='flex justify-between bg-slate-400 px-3 text-white font-semibold'>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/">Signup</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink onClick={handleLogout} >logout</NavLink>
    </div>
  );
};

export default Header;