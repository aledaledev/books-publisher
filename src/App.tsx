import { useState } from 'react'
import BookForm from './components/BookForm'
import BookInfo from './components/BookInfo'
import BookList from './components/BookList'
import Header from './components/Header'

function App() {

  return (
    <div>
      <Header/>
      <BookForm/>
      <BookList/>
      <BookInfo/>
    </div>
  )
}

export default App
