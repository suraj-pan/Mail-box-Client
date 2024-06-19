import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token:localStorage.getItem("token"),
    email:localStorage.getItem("email")
}

const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log(action.payload)
               state.email = action.payload.emailPart;
                state.isAuthenticated= true;
                state.token = action.payload.token ;
                // console.log(JSON.stringify(state))
                localStorage.setItem("email",action.payload.emailPart)
                localStorage.setItem("token",action.payload.token)
                console.log(state.email)
                console.log(state.token)
                console.log("login ho gaya hai")
        
        },
        logout:(state,action)=>{
           state.email = null;
            state.token = null;
            state.isAuthenticated=false;
            localStorage.removeItem("email")
            localStorage.removeItem("token")
            console.log("logout ho gaya hai..")
        }
    }
})

export const {login,logout} = auth.actions;
export default auth.reducer;