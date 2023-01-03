import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { BookListState } from '../types'

//se guarda el error en un state para mostrarlo en la ui
const initialState:BookListState = {
    books:[],
    isLoading:false,
    error:null,
    bookInfo: null,
    //isInfoLoading:false,
    bookToUpdate:null
}

//async -> solicitudes
//lo que devuelva pasa a ser el action.payload del extraReducer
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

export const insertBook = createAsyncThunk('book/insertBook', async (bookData,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI

    try {
        const author = getState().auth.userName
        const res = await fetch('http://localhost:3000/books',{
            method:'POST',
            body: JSON.stringify({...bookData,author}),
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

/*export const selectBook = createAsyncThunk('book/selectBook', async (id,thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await fetch(`http://localhost:3000/books/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})*/

export const deleteBook = createAsyncThunk('book/deleteBook', async (book,thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        await fetch(`http://localhost:3000/books/${book.id}`,{
            method:'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        return book
    } catch (error) {
        rejectWithValue(error.message)
    }
}) 

export const updateBook = createAsyncThunk('book/updateBook',async (bookData,thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await fetch(`http://localhost:3000/books/${bookData.id}`,{
            method:'PUT',
            body: JSON.stringify(bookData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const data = await res.json()
        return data     //objeto actualizado
        
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const bookSlice = createSlice({
    name:'booklist',
    initialState,
    reducers:{
        hideInfo:(state) => {
            state.bookInfo=null
        },
        setBookInfo:(state,action) => {
            state.bookInfo = action.payload
        },
        toUpdate:(state,action) => {
            state.bookToUpdate=action.payload
        },
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

        [insertBook.pending]: (state:BookListState,action) => {
            state.isLoading = true
            state.error = null
        },
        [insertBook.fulfilled]: (state:BookListState,action) => {
            state.isLoading = false
            state.books = [...state.books,action.payload]
        },
        [insertBook.rejected]: (state:BookListState,action) => {
            state.isLoading = false
            state.error = action.payload
        },

        /*[selectBook.pending]: (state:BookListState,action) => {
            state.isInfoLoading = true
            state.error = null
        },
        [selectBook.fulfilled]: (state:BookListState,action) => {
            state.isInfoLoading = false
            state.bookInfo = action.payload
        },
        [selectBook.rejected]: (state:BookListState,action) => {
            state.isInfoLoading = false
            state.error = action.payload
        },*/

        [deleteBook.pending]: (state:BookListState,action) => {
            state.isLoading= true
            state.error = null
        },
        [deleteBook.fulfilled]: (state:BookListState,action) => {
            state.isLoading = false
            state.books = state.books.filter(({id}) => id !== action.payload.id)
        },
        [deleteBook.rejected]: (state:BookListState,action) => {
            state.isLoading = false
            state.error = action.payload
        },

        [updateBook.pending]: (state:BookListState,action) => {
            state.isLoading= true
            state.error = null
        },
        [updateBook.fulfilled]: (state:BookListState,action) => {
            const index = state.books.findIndex(({id}) => id===action.payload.id)
            state.isLoading = false
            state.books[index]=action.payload
        },
        [updateBook.rejected]: (state:BookListState,action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {hideInfo,toUpdate,setBookInfo} = bookSlice.actions
export default bookSlice.reducer