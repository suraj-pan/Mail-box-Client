import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticated: false,
    token:null,
    email:null
}

const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log(action.payload)
               state.email = action.payload.emailPart
                state.isAuthenticated= true;
                state.token = action.payload.token;
                console.log(JSON.stringify(state))
        
        },
        logout:(state,action)=>{
           state.email = null;
            state.token = null;
            state.isAuthenticated=false;
            console.log(action.payload)
        }
    }
})

export const {login,logout} = auth.actions;
export default auth.reducer;