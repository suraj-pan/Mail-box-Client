import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";

const Outbox = () => {

  /// error hai sab ka same aa raha hai..
    // const list = useSelector(state=>state.mail.mail)
    // console.log(list)
    const [list,setlist ] = useState([])

  const email = useSelector((state)=>state.auth.email);


  // console.log(email)

  const outboxData= async ()=>{
    const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${email}/sentBox.json`);
   
    const data = await response.json();
    console.log(data)
    if(data){
      const realData = Object.entries(data)?.map(([id,value])=>({id,...value}))
      console.log(realData)
      setlist(realData);
    }else{
      setlist([])
    }

    console.log(list)
  }

    useEffect(()=>{

      outboxData()

         const intervalId = setInterval(outboxData, 3000);

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId)
    },[])

    const DeleteHandler = async (item)=>{
        console.log(item.id)
        const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${email}/sentBox/${item.id}.json`,{
          method:"DELETE"
        })

        const data = await response.json()
        console.log(data)

        outboxData()

    }

  return (
    <div className='flex flex-col justify-center items-center h-screen p-4'>
    {list.length === 0 ? (
        <div className='text-slate-400 font-bold text-xl md:text-2xl text-center'>No sent mail is available</div>
    ) : (
        list?.map((item, index) => (
            <div className='flex flex-col md:flex-row border bg-blue-500 border-black px-2 py-1 md:gap-3 border-collapse justify-between w-full md:w-[900px] mb-2 rounded' key={index}>
                <div className='text-lg md:text-xl text-center md:text-left'>{item.email}</div>
                <div className='text-slate-900 text-lg md:text-xl text-center md:text-left'>{item.subject}</div>
                <div className='font-bold text-center md:text-left'>{item.data}</div>
                <button className='bg-red-200 text-red-900 rounded-md mx-auto px-2 py-1 mt-2 md:mt-0' onClick={() => DeleteHandler(item)}>
                    <MdDelete />
                </button>
            </div>
        ))
    )}
</div>
  )
}

export default Outbox
