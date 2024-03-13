import React, { useEffect, useRef, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const navigate = useNavigate()
  const [Data,setData] = useState([]);
 
  const userEmail = useSelector((state)=>state.auth.email)
  console.log(userEmail)

  const composeHandler = ()=>{
      navigate("/compose")
  }

  const getEmailData = async()=>{
    const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}.json`);
    const datavalue = await response.json();

    const sentMailData = Object.entries(datavalue).map(([id,text])=>({id,...text})) 

    setData(sentMailData)

  }

  useEffect(()=>{
      getEmailData()
  },[])

  return (
    <div>
    <h2>  Welcome to the Mail client box</h2>
    <button onClick={composeHandler} >Compose</button>
    <div>
    {Data.map((item,index)=>(
      <div key={item.id} >
        <div>{item.email}</div>
        <div>{item.subject}</div>
        <div>{item.data}</div>
      </div>
    ))}
    </div>


   
    </div>
  )
}

export default Dashboard
