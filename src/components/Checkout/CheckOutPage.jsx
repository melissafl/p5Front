import React from "react";
import BtnCheckout from "./BtnCheckout";

import React from 'react'

const CheckOutPage = () => {
    const currency = "MXN"
  return (
    <div>
        <h1>CheckoutPage</h1>

        <BtnCheckout currency={currency} showSpinner={false} />
      
    </div>
  )
}

export default CheckOutPage
