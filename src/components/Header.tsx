import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {

  const {error} = useSelector((store:any) => store.booklist)

  return (
    <>
    {error!==null?<p>{error}</p>:null}
    <header>
        <span>coolBooks</span>
        <button>Log in</button>
    </header>
    </>
  )
}

export default Header