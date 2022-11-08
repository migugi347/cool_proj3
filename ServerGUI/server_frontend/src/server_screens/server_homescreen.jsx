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
            {menuItems.map((val) => (
                <button>{val.Name}</button>
            ))}
        </body>
  );
}

export default Server_homescreen;