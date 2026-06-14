import {configureStore} from '@reduxjs/toolkit'
import txReducer from '../features/transactions/txSlice'
import authReducer from '../features/auth/authSlice'
export const store = configureStore({
    reducer:{
        transactions: txReducer,
        auth: authReducer,
    }
})