import { configureStore } from "@reduxjs/toolkit";
import booklist from './bookSlice'

export default configureStore({
    reducer:{
        booklist
    }
})  