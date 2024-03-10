import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth'

export const Store = configureStore({
   reducer:{ auth:AuthReducer}
})