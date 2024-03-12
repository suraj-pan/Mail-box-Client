import React, { useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';

const Dashboard = () => {

  const mail = useRef();
  const subject = useRef();
  const text = useRef();


  const submitHandler = (e) => {
    e.preventDefault();

    const sendData = async (email, subject) => {
      // save to user id
       const emailPart = email.split("@")[0];
      console.log(emailPart);
      const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${emailPart}.json`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Authorization': 'AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc',
        },
        body: JSON.stringify({
          email: email,
          subject: subject,
          data: "this is my text1",

        })

     
      })

      const data = await response.json();
      console.log(data)


      // save to send email id user
      const response2 = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${emailPart}.json`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Authorization': 'AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc',
        },
        body: JSON.stringify({
          email: email,
          subject: subject,
          data: "this is my text1",

        })

      })

      const data2 = await response2.json();
      console.log(data2)
    }

    console.log(mail.current.value, subject.current.value)

    sendData(mail.current.value, subject.current.value, text)
  }

  return (
    <div>
      Welcome to the Mail client box

      <div className='flex justify-center items-center mt-11 bg-slate-300 rounded-md py-3'>

        <form onSubmit={submitHandler} >
          <label className='flex'>
            To:
            <input type='email' ref={mail} className='w-full px-2  border-b border-black' placeholder='Enter the email' />
          </label>
          <label className='flex'>

            <input type='text' ref={subject} className='w-full px-2 border-b border-black' placeholder=' subject' />
          </label>
          <Editor
            onContentStateChange={text}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName border border-black bg-white"

          />
          <button className='bg-red-100 px-2 py-1 rounded-md mt-2' >submit</button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
