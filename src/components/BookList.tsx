import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getInfo } from '../store/bookSlice'
import { Book, BookListState } from '../types'

const BookList = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getBooks())
  },[dispatch])

  const {books,isLoading} = useSelector((store:any) => store.booklist) as BookListState
  const {isLoggedIn} = useSelector((store:any) => store.auth)

  const List = books.length===0?<h4>there is no books available</h4>:
  books.map(({title,id}) => {
    return <div key={id}>
      <span>{title}</span>
      <button disabled={!isLoggedIn}>delete</button>
      <button onClick={() => dispatch(getInfo(id))}>more info</button>
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