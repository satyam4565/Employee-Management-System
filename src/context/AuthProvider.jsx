import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        console.log('Initializing AuthProvider...')
        try {
            // Initialize localStorage with default data
            setLocalStorage()
            // Get the data from localStorage
            const { employees } = getLocalStorage()
            console.log('Loaded employees:', employees)
            if (employees && Array.isArray(employees)) {
                setUserData(employees)
            } else {
                console.error('No valid employee data found')
            }
        } catch (error) {
            console.error('Error initializing AuthProvider:', error)
        }
    }, [])

    // Persist employees back to localStorage whenever they change
    useEffect(() => {
        try {
            if (userData && Array.isArray(userData)) {
                localStorage.setItem('employees', JSON.stringify(userData))
            }
        } catch (error) {
            console.error('Error persisting employees:', error)
        }
    }, [userData])
    
    

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider