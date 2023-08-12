import React, { useContext } from 'react'
import { UserContext } from '../context/DataContext'
import { UserDataContex } from '../context/UserDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Container, Row, Card, Button, Col, Nav, Navbar, NavDropdown} from "react-bootstrap"


const LoginForm = () => {
    //const [userData, setUserData] = useSatet({})
    const {userData, setUserData} = useContext(UserDataContex)
    const url = "http://localhost:4003/api/v1/auth/login"
    const url2 = "http://localhost:4003/api/v1/users/me"
    const url3 = "http://localhost:4003/api/v1/admin/yo"
    const navigation = useNavigate()

   const handleSubmit = () =>{
     
    axios.post(url, userData)
        .then(res =>{
            console.log(res.data)
            const token = res.data.token 
            const isAdmin = res.data.role === "admin"
            return (
                axios.get(isAdmin ? url3 : url2, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`
                    }
                }) .then (response =>{
                    console.log(response.data)
                    setUserData(response.data)
                    if(isAdmin) {
                        navigation("/admin")
                    } else {
                    navigation('/profile')
                    }
                })
            )
        })
    }
    const handleChange = (e) =>{
        const {name, value} = e.target
        setUserData({
            ...userData,
            [name]: value
            })
    }

  return (
    <div>
         <div>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container style={{backgroundColor: "pink"}}>
        <Navbar.Brand href="#home" style={{color:"white"}}>Barbie Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"   style={{backgroundColor:"pink"}} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="http://localhost:5173/"  style={{color:"white"}}>Home</Nav.Link>
            <Nav.Link href="#"  style={{color:"white"}}>Iniciar sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
        <h1 style={{color: "pink"}}>Login</h1>

        <input type="text" placeholder='email' name="email" onChange={ handleChange } />
        <input type="text" placeholder='password' name="password" onChange={ handleChange } />
        <button onClick={()=> handleSubmit()} style={{color: "pink"}}>Ingresar</button>
        
      
    </div>
  )
}

export default LoginForm
