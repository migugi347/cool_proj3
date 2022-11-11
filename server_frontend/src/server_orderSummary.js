import React, {useState} from 'react'
import CancelPopUp from './cancelPopUp';
import "./server_orderSummary.css";
import SubmitPopUp from './submitPopUp';

function Server_orderSummary() {
    const[submitOpen, setSubmitOpen] = useState(false);
    const[cancelOpen, setCancelOpen] = useState(false);

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
                            <td>Chocolate</td>
                            <td>$5.00</td>
                        </tr>
                    </tbody>
                </table> 
                <p className = "totalCost">Total Cost:</p>
                <div className = "submitButton">
                    <button onClick={() => setSubmitOpen(true)}>Submit Order</button>
                    <SubmitPopUp open={submitOpen} onClose={() => setSubmitOpen(false)}>
                        Order Submitted!
                    </SubmitPopUp>
                </div>
                <div className = "cancelButton">
                <button onClick={() => setCancelOpen(true)}>Cancel Order</button>
                    <CancelPopUp open={cancelOpen} onClose={() => setCancelOpen(false)}>
                        Order Cancelled!
                    </CancelPopUp>
                </div>
            </div>
        </body>
    )
}

export default Server_orderSummary