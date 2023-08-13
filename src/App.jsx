import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Card, Button, Col, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { ProductContext } from './context/ProductContext'
import axios from "axios"
import "./App.css"
import { useNavigate } from 'react-router-dom'



const App = () => {

   const {product, setProduct} = useContext(ProductContext)

   const getProducts = async() =>{
    const url = "http://localhost:4003/api/v1/products"
    const productos = await axios.get(url)
    setProduct(productos.data)
   }
   const navigation = useNavigate()
   const buyProduct = () =>{
    navigation("/login")
   }

   console.log(product)

   useEffect(()=>{
    getProducts();
   }, []);

 //const [data, setData] = useState (Datos)


  return (
    <div >
      <div className='navBar'>
      <Navbar expand="lg">
      <Container>    
        <Navbar.Brand href="#home" style={{fontSize: "35px", color: "rgb(254, 70, 165)", fontFamily: "Pacifico"}}>BarbieShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor:"pink"}} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"  style={{color:"rgb(254, 70, 165)", paddingLeft: "50px"}}>Home</Nav.Link>
            <Nav.Link href="http://localhost:5173/login"  style={{color:"rgb(254, 70, 165)"}}>Iniciar sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
      <div className='products'>
      <Container style={{textAlign:"center"}}>
        <Row >
          {
            product.length > 0 ?
            product.map((pr,i) =>(
              <Col md={3} key={i} style={{height: "35rem"}}>
                <Card style={{width: "17rem", height:"30rem", backgroundColor:"white", color:"pink"}}>
                  <Card.Img src={pr.image} style={{height: "17rem"}} />
                  <Card.Body >
                    <Card.Title style={{color:"rgb(254, 70, 165)"}} >{pr.name}</Card.Title>
                    <Card.Text > {pr.description} </Card.Text>
                    <Card.Text > ${pr.price} MX </Card.Text>
                    <Button onClick={buyProduct} style={{backgroundColor: "rgb(254, 70, 165)", border: "pink", borderRadius:"50px"}}>Comprar</Button>
                  </Card.Body>
                </Card>
              </Col>
            )) :
            <div>
              <h1>Sin productos</h1>
            </div>
          }
        </Row>
      </Container>

      </div>
      

    </div>
  )
}

export default App