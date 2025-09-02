import React from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { ToastContext } from '../../context/ToastProvider'

const Header = (props) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const [userData, setUserData] = React.useContext(AuthContext)
  const toast = React.useContext(ToastContext)

  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    // window.location.reload()
  }

  const deleteSelf = () => {
    if(!props.data) return
    const confirmDelete = window.confirm('Delete your account? This cannot be undone.')
    if(!confirmDelete) return
    const updated = userData.filter(u => u.id !== props.data.id)
    setUserData(updated)
    localStorage.setItem('employees', JSON.stringify(updated))
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    toast.show('Account deleted', 'success')
  }

  
  return (
  <div className="flex items-center justify-between bg-gray-900 border border-gray-800 px-8 py-6 rounded-2xl shadow-xl">
    <div>
      <h1 className="text-lg sm:text-xl font-semibold text-white">
        Welcome back
      </h1>
      <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">
        {props.data?.firstName || 'Admin'}
      </p>
    </div>
    <div className="flex gap-2">
      {props.data && (
        <button
          onClick={deleteSelf}
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Delete Account
        </button>
      )}
      <button
        onClick={logOutUser}
        className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        Log Out
      </button>
    </div>
  </div>
);
}

export default Header