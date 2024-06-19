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
        // dispatch()
        navigate("/login")

    }

    const loginHandler = ()=>{
        navigate("/login")
    }
  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
    <h2 className='text-3xl font-bold mb-4'>Sign-up Form</h2>
    <form onSubmit={submitHandler} className='flex flex-col items-center bg-slate-200 rounded-lg p-6 shadow-md w-full max-w-md'>
        <label className='flex flex-col text-lg mt-4 w-full'>
            E-mail:
            <input
                className='px-3 py-2 mt-1 rounded-md bg-opacity-10 bg-slate-500 focus:outline-none focus:bg-white'
                type='email'
                ref={mail}
                placeholder='Enter your email...'
                required
            />
        </label>
        <label className='flex flex-col text-lg mt-4 w-full'>
            Password:
            <input
                className='px-3 py-2 mt-1 rounded-md bg-opacity-10 bg-slate-500 focus:outline-none focus:bg-white'
                type='password'
                ref={password}
                placeholder='Enter your password...'
                required
            />
        </label>
        <label className='flex flex-col text-lg mt-4 w-full'>
            Confirm Password:
            <input
                className='px-3 py-2 mt-1 rounded-md bg-opacity-10 bg-slate-500 focus:outline-none focus:bg-white'
                type='password'
                ref={ConfirmPassword}
                placeholder='Re-enter password...'
                required
            />
        </label>
        <button className='bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full max-w-sm' type='submit'>
            Submit
        </button>
        <p className='mt-3 text-gray-700 text-center'>
            Already have an account?{' '}
            <span className='text-blue-500 cursor-pointer hover:underline' onClick={loginHandler}>
                Login
            </span>
        </p>
    </form>
</div>
  )
}

export default SignUp
