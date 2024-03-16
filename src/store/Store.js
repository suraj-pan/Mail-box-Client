import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth'
import MailReducer from './Mail'

export const Store = configureStore({
   reducer:{ auth:AuthReducer,
      mail:MailReducer},

})