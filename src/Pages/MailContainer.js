import React from 'react'
import { useLocation } from 'react-router-dom'

const MailContainer = () => {
    const data = useLocation()
    console.log(data.state.itemId)
    const item = data.state.itemId
  return (
    <div className='flex flex-col border border-black justify-center items-center h-screen' >
     <div>{item.email}</div>
     <div>{item.subject}</div>
     <div>{item.data}</div>
    </div>
  )
}

export default MailContainer
