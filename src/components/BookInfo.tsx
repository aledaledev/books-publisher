import React from 'react'

const BookInfo = () => {
  return (
    <div style={{border:"1px solid black"}}>
        <h2>info</h2>
        <div>
          {true?
          <h4>there is no book selected yet. please select!</h4>:
          <>
            <h5>title: </h5>
            <p>description : </p>
            <small>author: </small>
            <p>price: </p>
          </>}
        </div>
    </div>
  )
}

export default BookInfo