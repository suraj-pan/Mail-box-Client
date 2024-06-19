import React, { useRef, useState ,useEffect} from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertToRaw } from 'draft-js';
import { convertToHTML} from 'draft-convert';
import {sentMail} from '../store/Mail';
import { IoMdSend } from "react-icons/io";


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
        const response = await fetch(`https://expense-tracker-65763-default-rtdb.firebaseio.com/mailBox/${userEmail}/sentBox.json`, {
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
        console.log(data)
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
            read:false
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
  
        

        <div className="flex justify-center items-center h-screen  rounded-md py-8">
            <form onSubmit={submitHandler} className="bg-blue-500 w-full max-w-2xl p-4 rounded-md">
                <div className="mb-4">
                    <label htmlFor="email" className="text-white block mb-1">To:</label>
                    <input
                        type="email"
                        id="email"
                        ref={mail}
                        className="w-full px-3 py-2 rounded-md border border-black focus:outline-none focus:border-blue-700"
                        placeholder="Enter the email"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="subject" className="text-white block mb-1">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        ref={subject}
                        className="w-full px-3 py-2 rounded-md border border-black focus:outline-none focus:border-blue-700"
                        placeholder="Enter subject"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-white block mb-1">Message:</label>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName border border-black bg-white rounded-md"
                    />
                </div>
                <button type="submit" className="bg-red-100 text-red-700 px-4 py-2 flex items-center rounded-md">
                    Send <IoMdSend className="ml-1" />
                </button>
            </form>
        </div>
  )
}

export default Compose
