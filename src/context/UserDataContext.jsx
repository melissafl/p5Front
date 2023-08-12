import React, { createContext, useState } from 'react'

export const UserDataContex = createContext()

export const UserDataProvider = ({children}) =>{
    
    const [userData, setUserData] = useState({})

    const logout = () =>{
        setUserData(null)
    }

    return (
        <UserDataContex.Provider value={{userData, setUserData, logout}}>
            {children}
        </UserDataContex.Provider>
    )

}