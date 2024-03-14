import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const mail = useRef();
    const password = useRef();
    const ConfirmPassword = useRef();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const submitHandler =(e)=>{
        e.preventDefault();

        if(password.current.value !== ConfirmPassword.current.value){
            alert("Password doesn't match");
        }

        const sendData =async(mail,password)=>{
            try {
                const response  = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc`,{
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json" 
                    },
                    body:JSON.stringify({
                        email:mail,
                        password:password,
                        returnSecureToken:true
                    })
                }) ;

                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.error("error",error)
            }
        }

        sendData(mail.current.value,password.current.value);
        dispatch()
        navigate("/login")

    }

    const loginHandler = ()=>{
        navigate("/login")
    }
  return (
    <div className='flex flex-col mx-auto'>
    <h2 className='text-3xl font-bold'>Sign-up Form</h2>
    <form onSubmit={submitHandler} className='flex flex-col justify-center items-center bg-slate-200 mt-9 w-[300px] h-[600px] rounded-lg'>
      <label className='flex flex-col text-lg mt-4'>
        E-mail:
        <input className='px-2 py-1 rounded-sm bg-opacity-10 bg-slate-500' type='email' ref={mail} placeholder='Enter your email...' />
      </label>
      <label className='flex flex-col text-lg'>
        Password:
        <input className='px-2 py-1 rounded-sm bg-opacity-10 bg-slate-500' type='password' ref={password} placeholder='Enter your password...' />
      </label>
      <label className='flex flex-col text-lg'>
        Confirm Password:
        <input className='px-2 py-1 rounded-sm bg-opacity-10 bg-slate-500' type='password' ref={ConfirmPassword} placeholder='Re-enter password...' />
      </label>
      <h4 className='text-blue-500 cursor-pointer' onClick={loginHandler}>Login</h4>
      <button className='bg-slate-900 text-white px-2 py-1 mt-3 rounded-md' type='submit'>Submit</button>
    </form>
  </div>
  )
}

export default SignUp
