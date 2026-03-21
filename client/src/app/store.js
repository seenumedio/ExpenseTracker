import {configureStore} from '@reduxjs/toolkit'
import txReducer from '../features/transactions/txSlice'
export const store = configureStore({
    reducer:{
        transactions: txReducer,
    }
})