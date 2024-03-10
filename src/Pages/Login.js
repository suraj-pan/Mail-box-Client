import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const mail = useRef();
    const password = useRef();
    const navigate = useNavigate()

    const SignUpHandler =()=>{
        navigate("/signUp")
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        const sendData = async(mail,password)=>{
          try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json" 
                },
                body:JSON.stringify({
                    email:mail,
                    password:password,
                    returnSecureToken:true
                })
            });
            const data = await response.json();

            console.log(data)
          } catch (error) {
            console.log("error",error)
          }

        }

        sendData(mail.current.value,password.current.value)
    }



  return (
    <div className='flex flex-col  mx-auto'>
    <h2 className='text-3xl font-bold'>Login Form</h2>
    <form onSubmit={submitHandler} className='flex flex-col justify-center items-center bg-slate-200 mt-9 w-[300px] h-[600px] rounded-lg'>
      <label className='flex flex-col text-lg mt-4'>
          E-mail :
          <input className='px-2 py-1 rounded-sm bg-opacity-10 bg-slate-500' type='mail' ref={mail} placeholder='Enter your name...' />
      </label>
      <label className='flex flex-col text-lg'>
          Password :
          <input className='px-2 py-1 rounded-sm bg-opacity-10 bg-slate-500' type='password' ref={password} placeholder='Enter your password...' />
      </label>
     
      <button className='bg-slate-900 text-white px-2 py-1 mt-3 rounded-md' type='submit'>Submit</button>
      <h4>Need a account? <span className='text-white' onClick={SignUpHandler}>Sign-Up</span></h4>
    </form>

  </div>
  )
}

export default Login
