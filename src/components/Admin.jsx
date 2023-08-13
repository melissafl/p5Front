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
        {userData ? 
        (
            <div style={{margin:"5rem",  fontFamily: "Bricolage Grotesque"}}>
             <h1  style={{color: "pink", display:"flex"}}>Bienvenid@ admin {userData.name} </h1>
             <button onClick={ handleOut } style={{backgroundColor:"pink", borderRadius:"50px", borderColor:"white", color: "rgb(254, 70, 165)", display:"flex",  marginTop:"50px"}}> Cerrar sesión</button>

             <div style={{ marginTop:"50px"}}>

             <input style={{marginBottom:"2rem",}} type="text" placeholder='Nombre' name='name' onChange={handleChange} />
             <input  type="text" placeholder='Descripción' name='descrption' onChange={handleChange} />
             <input type="text" placeholder='Precio' name='price' onChange={handleChange} />
             <input style={{marginRight:"2rem"}} type="text" placeholder='Imagen' name='image' onChange={handleChange} />
             
             
             <button onClick={()=> PostProduct()}  style={{marginRight:"5rem", backgroundColor:"pink",color: "white", borderRadius:"50px",  borderColor:"pink"}}>Enviar</button>


             </div>

            
             <table>
                <thead style={{ fontSize:"16pt", color:"rgb(116, 203, 235)", height:"3rem" }} >
                <tr >
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th style={{textAlign:"center"}} >Precio</th>
                    <th style={{textAlign:"center"}} >Imagen</th>
                    <th style={{textAlign:"center"}}  >Opciones</th>
                </tr>
                </thead>
                {
                    product.map(producto =>
                    (
                        <tbody key={producto._id}>
                            <tr>
                                <td style={{ paddingBottom:"2rem" , color: "rgb(254, 70, 165)",paddingRight:"2rem"}}>{producto.name}</td>
                                <td style={{ paddingBottom:"2rem" , paddingRight:"2rem"}}>{producto.description}</td>
                                <td style={{ paddingBottom:"2rem" , color: "rgb(254, 70, 165)", paddingLeft:"2rem", paddingRight:"2rem"}}>{producto.price}</td>
                                <td><img src={producto.image} style={{paddingTop:"1rem", paddingBottom:"1rem", width: "5rem", marginLeft:"2rem", marginRight:"2rem"}} /> </td>
                                <td>
                                    <button style={{marginLeft:"2rem", backgroundColor:"rgba(246,242,165,255)", borderColor:"rgba(246,242,165,255)", color: "rgb(254, 70, 165)", borderRadius:"50px", marginRight:"2rem"}}>Editar</button>
                                    <button style={{backgroundColor:"rgb(254, 70, 165)", color: "white", borderRadius:"50px", borderColor:"rgb(254, 70, 165)"}}>Eliminar</button>

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
