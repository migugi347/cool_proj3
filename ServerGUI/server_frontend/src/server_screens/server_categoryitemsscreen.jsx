import React, { useState, useEffect} from "react";
import Axios from "axios";
import {useParams} from 'react-router-dom'
import "./server_categories.css";

function Server_categoryitemsscreen() {
    let { category } = useParams();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/server/getMenuItems").then((response) => {
            setMenuItems(response.data);
        });
    });

    return (
        <body>
            <h1>{category}</h1>
            <div className = "menuItems">
                {menuItems.filter((val) => val.Category === category).map((val) => (
                    <button>{val.Name}</button>
                ))}
            </div>
        </body>
      )
}

export default Server_categoryitemsscreen;