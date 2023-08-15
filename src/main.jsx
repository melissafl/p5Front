import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from "./components/Profile.jsx"
import LoginForm from './components/LoginForm.jsx'
import Admin from "./components/Admin.jsx"
import { UserDataProvider } from './context/UserDataContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductProvider> <App /> </ProductProvider> 
  },


  {
    path: "/login",
    element: <UserDataProvider>
      <LoginForm /> 
    </UserDataProvider>
  },
  
  {
    path: '/profile',
    element: (<UserDataProvider> <PayPalScriptProvider
    options={{
      "clientId": "test",
      components: "buttons",
      currency: "MXN"
    }}
    > <Profile />
    </PayPalScriptProvider> 
    </UserDataProvider>
)},
  {
    path: "/profile",
    element: <UserDataProvider> <Profile /> </UserDataProvider>
  },
  {
    path: "/admin",
    element: (<UserDataProvider> <ProductProvider> <Admin /> </ProductProvider>  </UserDataProvider>)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
