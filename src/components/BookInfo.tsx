import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideInfo } from '../store/bookSlice'
import { BookListState } from '../types'

const BookInfo = () => {

  const dispatch = useDispatch()

  const {bookInfo} = useSelector((store:any) => store.booklist) as BookListState


  return (
    <div style={{border:"1px solid black"}}>
        <h2>info</h2>
        {bookInfo===null?null:<button onClick={() => dispatch(hideInfo())}>x</button>}
        <div>
          {bookInfo===null?
              <h4>there is no book selected yet. please select!</h4>:
              <>
                <h3>title: {bookInfo.title}</h3>
                <p>description: {bookInfo.description}</p>
                <small>author: {bookInfo.author}</small>
                <p>price: {bookInfo.price}</p>
              </>}
        </div>
    </div>
  )
}

export default BookInfo