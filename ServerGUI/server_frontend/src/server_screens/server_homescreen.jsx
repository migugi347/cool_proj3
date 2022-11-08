import React, { useState, useEffect} from "react";
import Axios from "axios";
import "./server_homeScreen.css";

function Server_homescreen() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/server/getMenuItems").then((response) => {
            setMenuItems(response.data);
        });
    });

    return (
        <body className = "homeScreen">
            <div className = "menuItems">
                {menuItems.map((val) => (
                    <button>{val.Name}</button>
                ))}
            </div>
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
  );
}

export default Server_homescreen;