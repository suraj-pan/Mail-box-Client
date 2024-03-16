import React from 'react'
import { useSelector } from 'react-redux'

const Outbox = () => {
    const list = useSelector(state=>state.mail.mail)
    console.log(list)
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
    {list.length === 0 ? (<div>No sent mail is available</div>):(
        list.map((item,index)=>(
            <div className='flex justify-between w-[400px]'  key={index}>
                <div className='text-xl'>{item.email}</div>
                <div className='text-slate-500 text-xl'>{item.subject}</div>
                <div className='font-semibold'>{item.content}</div>
            </div>
        ))
    )}
    </div>
  )
}

export default Outbox
