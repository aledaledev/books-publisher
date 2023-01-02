import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logInOut } from '../store/authSlice'

const Header = () => {

  const dispatch = useDispatch()

  const {error} = useSelector((store:any) => store.booklist)
  const {isLoggedIn, userName} = useSelector((store:any) => store.auth)

  return (
    <>
    {error!==null?<p>{error}</p>:null}
    <header>
        <span>coolBooks</span>
        <button onClick={() => dispatch(logInOut())}>{isLoggedIn?'log out':'log in'}</button>
    </header>
    </>
  )
}

export default Header