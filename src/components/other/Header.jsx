import React, { useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = (props) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    // window.location.reload()
  }

  
  return (
  <div className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-6 rounded-2xl shadow-xl">
    <div>
      <h1 className="text-lg sm:text-xl font-semibold text-white">
        Welcome back,
      </h1>
      <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">
        username <span className="animate-waving-hand">👋</span>
      </p>
    </div>
    <button
      onClick={logOutUser}
      className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
    >
      Log Out
    </button>
  </div>
);
}

export default Header