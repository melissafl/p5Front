import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({children}) =>{

    const Datos = {
        nombre: "Mel",
        edad: 29,
        musica: "R&B",
    }

    const [data, setData]= useState(Datos)

    return (
        <UserContext.Provider value={{data, setData}}>
            {children}
        </UserContext.Provider>
    )
}
