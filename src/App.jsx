import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Card, Button, Col, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { ProductContext } from './context/ProductContext'
import axios from "axios"
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
    <div>
      <div>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container style={{backgroundColor: "pink"}}>
        <Navbar.Brand href="#home" style={{color:"white", fontSize: "60px"}}>Barbie Signature Collection</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"   style={{backgroundColor:"pink"}} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"  style={{color:"white"}}>Home</Nav.Link>
            <Nav.Link href="http://localhost:5173/login"  style={{color:"white"}}>Iniciar sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
      <Container>
        <Row>
          {
            product.length > 0 ?
            product.map((pr,i) =>(
              <Col md={6} key={i}>
                <Card style={{width: "10rem"}}>
                  <Card.Img src={pr.image} />
                  <Card.Body>
                    <Card.Title>{pr.name}</Card.Title>
                    <Card.Text> {pr.description} </Card.Text>
                    <Card.Text> ${pr.price} MX </Card.Text>
                    <Button onClick={buyProduct} style={{backgroundColor: "pink", border: "pink"}}>Comprar</Button>
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
  )
}

export default App