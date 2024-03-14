import React, { useEffect, useRef, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const navigate = useNavigate()
  const [Data, setData] = useState([]);
  const [clickItem, setClickItem] = useState(new Set());
  console.log(clickItem)


  const userEmail = useSelector((state) => state.auth.email)
  console.log(userEmail)

  const composeHandler = () => {
    navigate("/compose")
  }

  const getEmailData = async () => {
    const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}.json`);
    const datavalue = await response.json();

    const sentMailData = Object.entries(datavalue).map(([id, text]) => ({ id, ...text }))

    setData(sentMailData)

  }

  useEffect(() => {
    getEmailData()
  }, [])

  const dataHandler = (id) => {
    console.log(id)
    navigate("/mailContainer", { state: { itemId: id } })
  }

console.log(Data.length)

  return (
    <div className="mx-auto flex flex-col max-w-screen-lg p-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Welcome to the Mail client box</h2>
        {/* <button onClick={handleClose} className=" ml-5 text-red-500">Close</button> */}
      </div>
      <button onClick={composeHandler} className=" right-[-100px] absolute bg-blue-500 text-white py-2 px-4 rounded">Compose</button>
      <div className="mt-8 ">
        {Data.length === 0 ?(<p className='text-slate-300 font-bold text-2xl' >No emails have been sent or received</p>):(Data.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-3 mb-2 cursor-pointer justify-between p-4 border border-black ${clickItem.has(item.id) ? "bg-red-100" : "bg-blue-100"} rounded`}
            onClick={() => dataHandler(item)}
          >
            <div>{item.email}</div>
            <div>{item.subject}</div>
          </div>
        )))}
      </div>
    


   
    </div >
  )
}

export default Dashboard
