import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    mail:[]
}

const Mail = createSlice({
    name:"mail",
    initialState,
    reducers:{
        sentMail:(state,action)=>{
                // console.log(action.payload);
                const {email,subject,content} = action.payload;
                console.log(email,subject,content)
                state.mail = [...state.mail,{email,subject,content}]
                console.log("sent mail",state.mail)
        }
    }

})

export const {sentMail} = Mail.actions;
export default Mail.reducer;