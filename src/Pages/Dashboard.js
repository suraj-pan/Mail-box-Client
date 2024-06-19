import React, { useEffect, useRef, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';
import { MdDelete } from "react-icons/md";


const Dashboard = () => {

  const navigate = useNavigate()
  const [Data, setData] = useState([]);
  const [clickItem, setClickItem] = useState(true);
  // console.log(clickItem)
  const [loading,setloading] = useState(false)


  const userEmail = useSelector((state) => state.auth.email)
  // console.log(userEmail)

  const composeHandler = () => {
    navigate("/compose")
  }



  const getEmailData = async () => {
    setloading(true)
    const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}.json`);
    const datavalue = await response.json();
      // console.log(datavalue,response);

    let sentMailData=[];
    if(datavalue){
      const filteredData = Object.keys(datavalue)
      .filter(key => key !== 'sentBox')
      .reduce((obj, key) => {
        obj[key] = datavalue[key];
        return obj;
      }, {});

      // console.log(filteredData)
       sentMailData = Object?.entries(filteredData).map(([id, text]) => ({ id, ...text }))
    }
      console.log(sentMailData)



      setData(sentMailData || []);

    // console.log(Data)

    // console.log(Data)
    setloading(false)
    

  }

   useEffect(() => {
    getEmailData()


    const intervalId = setInterval(getEmailData, 6000);

   


    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId)
  }, [])

  const dataHandler = (id) => {

  
    // console.log(id)
    navigate("/mailContainer", { state: { itemId: id } })
    setClickItem(false)
  }

  // console.log(Data.length)

  const deleteHandler = async (id) => {
    console.log(id)
   try {
    const responseMailbox = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}/${id}.json`,{
      method:'DELETE'
    });

    if(!responseMailbox.ok){
      throw new Error('Failed to delete data from mailbox URL');
    }
    getEmailData();
 
   } catch (error) {
    console.error("error ", error)
   }
   
   
    // navigate("/dashboard")
  }
  return (
    <div className="mx-auto flex flex-col max-w-screen-lg p-4 md:p-8 relative">
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-center md:text-left mb-4 md:mb-0">Welcome to the Mail Client Box</h2>
        <button onClick={composeHandler} className="bg-blue-500 text-white py-2 px-4 rounded">Compose</button>
    </div>

    <div className="mt-8">
        {Data.length === 0 ? (
            <p className='text-slate-300 font-bold text-xl md:text-2xl text-center'>No emails have been received</p>
        ) : (
            Data?.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-3 mb-2 cursor-pointer bg-slate-400 justify-between p-4 border border-black rounded-md items-center"
                    onClick={() => dataHandler(item)}
                >
                    <div className="w-2 h-2 bg-blue-500 rounded-full hidden md:block"></div>
                    <div className="flex-1 text-center md:text-left">{item.email}</div>
                    <div className="flex-1 text-center md:text-left">{item.subject}</div>
                    <button
                        onClick={(event) => { event.stopPropagation(); deleteHandler(item.id); }}
                        className='bg-red-500 text-white rounded-xl px-2 py-1 mt-2 md:mt-0'
                    >
                        <MdDelete />
                    </button>
                </div>
            ))
        )}
    </div>
</div>
  )
}

export default Dashboard
