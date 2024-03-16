import React, { useRef, useState ,useEffect} from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertToRaw } from 'draft-js';
import { convertToHTML} from 'draft-convert';
import {sentMail} from '../store/Mail';

const Compose = () => {

    const mail = useRef();
    const subject = useRef();
    const text = useRef();
    const dispatch = useDispatch();

    const userEmail = useSelector((state)=>state.auth.email)
    console.log(userEmail)
    const navigate = useNavigate()
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);
    // console.log(editorState)
  
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      const sendData = async (email, subject,content) => {
        // save to user id
        console.log(content)
         const emailPart = email.split("@")[0];
        // console.log(emailPart);
        const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}.json`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            'Authorization': 'AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc',
          },
          body: JSON.stringify({
            email: email,
            subject: subject,
            data: content,
  
          })
  
       
        })
  
        const data = await response.json();
        // console.log(data)
        console.log("sent mail jo bhejna hai",email,subject,content)
        dispatch(sentMail({email,subject,content}))
  
        // save to send email id user
        const response2 = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${emailPart}.json`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            'Authorization': 'AIzaSyDqssr-XYkQE5aR15B7bVhhygLUnqGrHbc',
          },
          body: JSON.stringify({
            email:`${ userEmail}@gmail.com`,
            subject: subject,
            data: content,
  
          })
  
        })
  
        const data2 = await response2.json();
        console.log(data2)

        navigate("/dashboard");

      }
  
      console.log(mail.current.value, subject.current.value,convertedContent)
  
      sendData(mail.current.value, subject.current.value, convertedContent)

    
      console.log(convertedContent);
    }

 

    useEffect(() => {
      let html = convertToRaw(editorState.getCurrentContent());
      console.log(html.blocks[0].text)
      setConvertedContent(html.blocks[0].text);
    }, [editorState]);
  
    console.log(convertedContent);



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
       editorState={editorState}
      onEditorStateChange={setEditorState}

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

export default Compose
