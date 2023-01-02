import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { BookListState } from '../types'

//se guarda el error en un state para mostrarlo en la ui
const initialState:BookListState = {
    books:[],
    isLoading:false,
    error:null
}

//async
export const getBooks = createAsyncThunk('booklist/getBooks',async (_,thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        //dispatch({type:'book/getBook/pending', payload:undefined})
        const res = await fetch('http://localhost:3000/books')
        const data = await res.json()
        return data
        //dispatch({type:'book/getBook/fulfilled', payload:data})
    } catch (error) {
        return rejectWithValue(error.message)
        //dispatch({type:'book/getBook/rejected', payload:error})
    }
})

const bookSlice = createSlice({
    name:'booklist',
    initialState,
    reducers:{

    },
    extraReducers:{
        [getBooks.pending]: (state:BookListState,action) => {
            state.isLoading = true
            state.error = null
        },
        [getBooks.fulfilled]: (state:BookListState,action) => {
            state.isLoading = false
            state.books = action.payload
        },
        [getBooks.rejected]: (state:BookListState,action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {} = bookSlice.actions
export default bookSlice.reducer