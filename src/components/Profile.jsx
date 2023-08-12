import React, { useContext } from 'react'
import { UserDataContex } from '../context/UserDataContext'
import { useNavigate } from 'react-router-dom'
import BtnCheckout from './Checkout/BtnCheckout'


const Profile = () => {
    const {userData, logout} = useContext(UserDataContex)
    const navigation = useNavigate()

    const handleOut = ()=>{
        logout()
        navigation('/login')
    }
  return (
    <div>
        <h1>Mi perfil</h1>
        {
            userData ? (
                <div>
                    <h1>Bienvenid@!</h1>
                    <h1>Hola, {userData.name}</h1>
                    <button onClick={ handleOut }> Cerrar sesión</button>
                    <BtnCheckout />
                </div>
               
                
            ) : (
                <h1>No estas logueado :c</h1>
            )
        }    
    </div>
  )
}

export default Profile
