import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../store/bookSlice'
import { Book, BookListState } from '../types'

const BookList = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getBooks())
  },[dispatch])

  const {books,isLoading} = useSelector((store:any) => store.booklist) as BookListState

  const List = books.map(({title,id}) => {
    return <div key={id}>
      <span>{title}</span>
      <button>delete</button>
      <button>more info</button>
    </div>
  })

  return (
    <div style={{border:"1px solid black"}}>
        <h2>books</h2>
        <div>
          {isLoading?'loading...':List}
        </div>
    </div>
  )
}

export default BookList