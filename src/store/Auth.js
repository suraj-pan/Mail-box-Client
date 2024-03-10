import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticated: false,
    token:null
}

const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
                state.isAuthenticated= true;
                state.token = action.payload;
            console.log(action.payload)
        },
        logout:(state,action)=>{
           
            state.token = null;
            state.isAuthenticated=false;
            console.log(action.payload)
        }
    }
})

export const {login,logout} = auth.actions;
export default auth.reducer;