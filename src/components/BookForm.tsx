import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertBook } from '../store/bookSlice'
import {v4 as uuid} from 'uuid'

const BookForm = () => {

    const title = useRef(null)
    const price = useRef(null)
    const description = useRef(null)

    const dispatch = useDispatch()

    const {userName,isLoggedIn} = useSelector((store:any) => store.auth) as {userName:string,isLoggedIn:boolean}

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        const bookData = {
            title:title.current.value,
            price:Number(price.current.value),
            description:description.current.value,
            id:uuid(),
            //author:userName
        }
        dispatch(insertBook(bookData))
        title.current.value = ''
        price.current.value = ''
        description.current.value = ''
    }

  return (
    <div style={{border:"1px solid black"}}>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">title:</label>
                <input ref={title} type="text" name='title' id='title'/>
            </div>
            <div>
                <label htmlFor="price">price:</label>
                <input ref={price} type="number" name='price' id='price'/>
            </div>
            <div>
                <label htmlFor="description">description:</label>
                <textarea ref={description} name="description" id="description" style={{resize:'none'}}></textarea>
            </div>
            <button type='submit' disabled={!isLoggedIn}>submit</button>
        </form>
    </div>
  )
}

export default BookForm