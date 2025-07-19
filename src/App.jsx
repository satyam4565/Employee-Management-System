import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)
  const [userData, setUserData] = useContext(AuthContext)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  },[])


  const handleLogin = (email, password) => {
    console.log('Login attempt:', { email, userData })
    
    // Check admin credentials
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }
    
    // Check employee credentials
    if (userData && Array.isArray(userData)) {
      const employee = userData.find(e => e.email === email && e.password === password)
      if (employee) {
        console.log('Employee found:', employee)
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          role: 'employee', 
          data: employee 
        }))
        return
      }
    }
    
    console.log('Login failed - Invalid credentials')
    alert("Invalid Credentials")
  }

  const handleSignUp = (formData) => {
    // Check if email already exists
    if (userData && Array.isArray(userData)) {
      const existingUser = userData.find(e => e.email === formData.email)
      if (existingUser) {
        alert("Email already exists. Please use a different email.")
        return
      }
    }

    // Create new employee object
    const newEmployee = {
      id: userData ? Math.max(...userData.map(e => e.id)) + 1 : 1,
      firstName: formData.fullName.split(' ')[0], // Use first name from full name
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      username: formData.username,
      taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0
      },
      tasks: []
    }

    // Add new employee to userData
    const updatedUserData = userData ? [...userData, newEmployee] : [newEmployee]
    setUserData(updatedUserData)

    // Update localStorage
    localStorage.setItem('employees', JSON.stringify(updatedUserData))

    // Auto login the new user
    setUser('employee')
    setLoggedInUserData(newEmployee)
    localStorage.setItem('loggedInUser', JSON.stringify({ 
      role: 'employee', 
      data: newEmployee 
    }))

    alert("Account created successfully! You are now logged in.")
  }

  const handleShowSignUp = () => {
    setShowSignUp(true)
  }

  const handleBackToLogin = () => {
    setShowSignUp(false)
  }



  return (
    <>
      {!user && !showSignUp ? <Login handleLogin={handleLogin} handleShowSignUp={handleShowSignUp} /> : ''}
      {!user && showSignUp ? <SignUp handleSignUp={handleSignUp} handleBackToLogin={handleBackToLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
    </>
  )
}

export default App;