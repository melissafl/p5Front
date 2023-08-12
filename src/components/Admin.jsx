import React, { useContext, useEffect } from 'react'
import { UserDataContex } from '../context/UserDataContext'
import { ProductContext } from '../context/ProductContext'
import axios from "axios"
import {Container, Row, Card, Button, Col, Nav, Navbar, NavDropdown} from "react-bootstrap"


const Admin = () => {
    const {userData, logout} = useContext(UserDataContex)
    const handleOut = ()=>
    {
        logout()
        navigation('/login')
    }

        const  {product, setProduct, formProduct, setFormProduct } = useContext(ProductContext)
        const handleChange = (e) =>{
            const {name, value} = e.target
            setFormProduct({
                ...formProduct,
                [name]: value
            })
            console.log(formProduct)
        }

    //obtener products
    const getProducts = async ()=>{
        const url = "http://localhost:4003/api/v1/products"
        const response = await axios.get(url)
        setProduct(response.data)
    }

    //Publicar productos
    const PostProduct = async () =>{
        const productData = {
            name: formProduct.name,
            description: formProduct.description,
            price: formProduct.price,
            image: formProduct.image
        }

        const url = 'http://localhost:4003/api/v1/products'
        const response = await axios.post(url, productData)
        console.log(response.data)
        getProducts()
    }

    //Editar productos

    const EditProduct = async (id) =>{
        const url = `http://localhost:4003/api/v1/products/${id}`
        const response = await axios.get(url)
        const productEdit = response.data
        setFormProduct({
            name: productEdit.name,
            description: productEdit.description,
            price: productEdit.price,
            image: productEdit.image
        })
        const newProductEdit = {
            name: formProduct.name,
            description: formProduct.description,
            price: formProduct.price,
            image: formProduct.image
        }
        axios.put(url, newProductEdit)
        getProducts()
    }

    //Eliminar productos

    const DeleteProduct = async (id) =>{
        const url = `http://localhost:4003/api/v1/products/${id}`
        const response = await axios.delete(url)
        console.log("Eliminado", response.data)
        getProducts()
    }

    useEffect(()=>{
        getProducts()
    }, []);



    return (
    <div>
         <Navbar expand="lg" className="bg-body-tertiary" >
      <Container style={{backgroundColor: "pink"}}>
        <Navbar.Brand href="#home" style={{color:"white"}}>Barbie Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"   style={{backgroundColor:"pink"}} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="http://localhost:5173/"  style={{color:"white"}}>Home</Nav.Link>
            <Nav.Link href="#"  style={{color:"white"}}>Mi perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        {userData ? 
        (
            <div>
             <h1  style={{background: "pink"}}>Bienvenid@ admin {userData.name} </h1>
             <button onClick={ handleOut } style={{color: "pink"}}> Cerrar sesión</button>

             <input type="text" placeholder='Nombre' name='name' onChange={handleChange} />
             <input type="text" placeholder='Descripción' name='descrption' onChange={handleChange} />
             <input type="text" placeholder='Precio' name='price' onChange={handleChange} />
             <input type="text" placeholder='Imagen' name='image' onChange={handleChange} />
             
             <button onClick={()=> PostProduct()}  style={{color: "pink"}}>Enviar</button>

             <table>
                <thead>
                <tr>
                    <th style={{color: "pink", textAlign: "center"}} >Nombre</th>
                    <th style={{color: "pink", textAlign: "center"}} >Descripción</th>
                    <th style={{color: "pink", textAlign: "center"}} >Precio</th>
                    <th style={{color: "pink", textAlign: "center"}} >Imagen</th>
                    <th style={{color: "pink", textAlign: "center"}} >Opciones</th>
                </tr>
                </thead>
                {
                    product.map(producto =>
                    (
                        <tbody key={producto._id}>
                            <tr>
                                <td>{producto.name}</td>
                                <td>{producto.description}</td>
                                <td>{producto.price}</td>
                                <td><img src={producto.image} style={{width: "5rem"}} /> </td>
                                <td>
                                    <button style={{color: "pink"}}>Editar</button>
                                    <button style={{color: "pink"}}>Eliminar</button>

                                </td>

                            </tr>
                            
                        </tbody>
                    ))
                }               
             </table>
            </div>
        ) : (
                 <h1>
                     No estas logueado :c
                 </h1>
            )
        }
      
    </div>
  )
}

export default Admin
