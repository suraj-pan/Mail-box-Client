import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const MailContainer = () => {
    const data = useLocation()
    const navigate = useNavigate()
    console.log(data.state.itemId)
    const item = data.state.itemId
  return (
    <div className='flex flex-col border border-black justify-center items-center h-screen p-4'>
    <button 
        onClick={() => navigate(-1)} 
        className='self-start bg-blue-500 text-white py-2 px-4 rounded mb-4'
    >
        Back
    </button>
    <div className='font-bold text-xl mb-2'>E-mail: {item.email}</div>
    <div className='text-xl font-semibold mb-2'>Subject: {item.subject}</div>
    <div className='font-mono'>{item.data}</div>
</div>
  )
}

export default MailContainer
