import { configureStore } from "@reduxjs/toolkit";
import booklist from './bookSlice'
import auth from './authSlice'

export default configureStore({
    reducer:{
        booklist,
        auth
    }
})  