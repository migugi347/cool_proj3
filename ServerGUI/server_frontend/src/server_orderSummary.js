import React from 'react'
import "./server_orderSummary.css";

function Server_orderSummary() {
  return (
    <body>
        <div className = "orderSummary">
            <p contentEditable = "true" className = "customerName">Enter Customer's Name:</p>
            <table>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Menu Item</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Chocloate</td>
                        <td>$5.00</td>
                    </tr>
                </tbody>
            </table> 
            <p className = "totalCost">Total Cost:</p>
            <div className = "submitButton">
                <button>Submit Order</button>
            </div>
            <div className = "cancelButton">
                <button>Cancel Order</button>
            </div>
        </div>
    </body>
  )
}

export default Server_orderSummary