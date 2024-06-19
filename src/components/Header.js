import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../store/Auth"

const Header = () => {

  const userEmail = useSelector((state) => state.auth.email)
  const dispatch = useDispatch();
  console.log(userEmail)

  const handleLogout = () => {
    dispatch(logout())
    /// navigate issue hai

  }
  return (
    <div className='flex justify-between bg-slate-400 px-3 text-white font-semibold'>
    {userEmail ? (
        <div className='flex justify-between items-center w-full max-w-screen-xl mx-auto text-lg font-semibold'>
            {/* <span className='text-black'>{userEmail}</span> */}
            <div className='flex gap-3'>
                <NavLink to="/dashboard" className='text-white hover:text-gray-200'>Inbox</NavLink>
                <NavLink to="/sentMail" className='text-white hover:text-gray-200'>Outbox</NavLink>
                <NavLink to="/login" onClick={handleLogout} className='text-white hover:text-gray-200'>Logout</NavLink>
            </div>
        </div>
    ) : (
        <div className='flex gap-3'>
            <NavLink to="/login" className='text-white hover:text-gray-200'>Login</NavLink>
            <NavLink to="/signUp" className='text-white hover:text-gray-200'>Signup</NavLink>
        </div>
    )}
</div>
  );
};

export default Header;