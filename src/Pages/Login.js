import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {login} from '../store/Auth'
import { useDispatch } from 'react-redux';

const Login = () => {

    const mail = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const SignUpHandler =()=>{
        navigate("/signUp")
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        const sendData = async(mail,password)=>{

          const emailPart = mail.split("@")[0];
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

           
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message)
            }
            const data = await response.json();

         
            const token =data.idToken

            dispatch(login({emailPart,token}))

            navigate("/dashboard")
          } catch (error) {
            console.log("error",error)
            window.alert(`Login failed: ${error }`);
          }

       

        }

        sendData(mail.current.value,password.current.value)
       
        
    }



  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
    <h2 className='text-3xl font-bold mb-4'>Login Form</h2>
    <form onSubmit={submitHandler} className='flex flex-col items-center bg-gray-200 mt-9 w-[300px] h-[400px] rounded-lg shadow-lg'>
        <label className='flex flex-col text-lg mt-4'>
            E-mail:
            <input
                className='px-3 py-2 mt-1 rounded-md bg-opacity-10 bg-gray-500 focus:outline-none focus:bg-white'
                type='email'
                ref={mail}
                placeholder='Enter your email...'
            />
        </label>
        <label className='flex flex-col text-lg mt-4'>
            Password:
            <input
                className='px-3 py-2 mt-1 rounded-md bg-opacity-10 bg-gray-500 focus:outline-none focus:bg-white'
                type='password'
                ref={password}
                placeholder='Enter your password...'
            />
        </label>
        <button className='bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
            Submit
        </button>
        <h4 className='mt-4 text-gray-700'>
            Need an account?{' '}
            <span
                className='text-blue-500 cursor-pointer hover:underline'
                onClick={SignUpHandler}
            >
                Sign Up
            </span>
        </h4>
    </form>
</div>
  )
}

export default Login
