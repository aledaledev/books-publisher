import React from 'react'

const BookForm = () => {
  return (
    <div style={{border:"1px solid black"}}>
        <form action="">
            <div>
                <label htmlFor="title">title:</label>
                <input type="text" name='title' id='title'/>
            </div>
            <div>
                <label htmlFor="price">price:</label>
                <input type="number" name='price' id='price'/>
            </div>
            <div>
                <label htmlFor="description">description:</label>
                <textarea name="description" id="description" style={{resize:'none'}}></textarea>
            </div>
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default BookForm