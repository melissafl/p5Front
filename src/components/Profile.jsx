import React, { useContext } from 'react'
import { UserDataContex } from '../context/UserDataContext'
import { useNavigate } from 'react-router-dom'
import BtnCheckout from './Checkout/BtnCheckout'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import "../App.css"


const Profile = () => {
    const {userData, logout} = useContext(UserDataContex)
    const navigation = useNavigate()

    const handleOut = ()=>{
        logout()
        navigation('/login')
    }

  return (
    <div>
        <div className='navBar'>
            <Navbar expand="lg">
                <Container>    
                    <Navbar.Brand href="#home" style={{fontSize: "35px", color: "rgb(254, 70, 165)", fontFamily: "Pacifico"}}>BarbieShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor:"pink"}} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="http://localhost:5173/"  style={{color:"rgb(254, 70, 165)", paddingLeft: "50px"}}>Home</Nav.Link>
                            <Nav.Link href="#"  style={{color:"rgb(254, 70, 165)"}}>Mi Perfil</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    <div>

    </div>
    
        <div className="profile">
            <h1>Bienvenid@, {userData.name}</h1>


        </div>
        

        {
            userData ? (
                <div  style={{textAlign:"center"}}>
                    

                    <button onClick={ handleOut } style={{backgroundColor: "rgb(254, 70, 165)", border: "pink", borderRadius:"50px", fontFamily:"Bricolage Grotesque", color:"pink"}}> Cerrar sesión</button>
                    <div>


                    </div>
                    <div style={{margin:"5rem", alignItems:"center"}}>
                    <BtnCheckout />


                    </div>
                </div>
               
                
            ) : (
                <h1>No estas logueado :c</h1>
            )
        }    
    </div>
  )
}

export default Profile
