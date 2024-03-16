import React, { useEffect, useRef, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';


const Dashboard = () => {

  const navigate = useNavigate()
  const [Data, setData] = useState([]);
  const [clickItem, setClickItem] = useState(true);
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

    const intervalId = setInterval(getEmailData, 2000);

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const dataHandler = (id) => {
    console.log(id)
    navigate("/mailContainer", { state: { itemId: id } })
    setClickItem(false)
  }

  console.log(Data.length)

  const deleteHandler = async (id) => {
    console.log(id)
    const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}/${id}.json`,{
      method:'DELETE'
    });
    console.log(response)
    // yeh dusra pe navigate ho raha hai.. issue hai
    navigate("/dashboard")
  }
  return (
    <div className="mx-auto flex flex-col max-w-screen-lg p-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Welcome to the Mail client box</h2>
        {/* <button onClick={handleClose} className=" ml-5 text-red-500">Close</button> */}
      </div>
      {/* <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar> */}
         <button onClick={composeHandler} className=" right-[-100px] absolute bg-blue-500 text-white py-2 px-4 rounded">Compose</button>
      <div className="mt-8 ">
        {Data.length === 0 ? (<p className='text-slate-300 font-bold text-2xl' >No emails have been sent or received</p>) : (Data.map((item, index) => (
          <div
            key={item.id}
            // blue dot show nahi ho rha hai
            className={`flex gap-3 mb-2 cursor-pointer bg-slate-400 justify-between p-4 border border-black rounded-md  fill-blue-300 `}
            onClick={() => dataHandler(item)}
          >
            <div>{item.email}</div>
            <div>{item.subject}</div>
            <button onClick={()=>deleteHandler(item.id)} className='bg-slate-500 text-white rounded-md px-2' >Delete</button>
          </div>
        )))}
      </div>




    </div >
  )
}

export default Dashboard
