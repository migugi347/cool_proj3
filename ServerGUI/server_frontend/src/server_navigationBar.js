import React, { useState, useEffect} from "react";
import Axios from "axios";
import {Link} from 'react-router-dom';
import "./server_navigationBar.css";

function Server_navigationBar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/server/getCategories").then((response) => {
            setCategories(response.data);
        });
    });

    return (
        <body>
            <nav className="navBar">
                <div className = "logo">
                    <img alt = "" className = "logoPic" src = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"/>
                </div>
                <ul className = "menuCategories">
                    <a><li><Link to = {"/"}>Home</Link></li></a>
                    {categories.map((val) => (
                        <a><li><Link to = {"/" + val.Category}>{val.Category}</Link></li></a>
                    ))}
                </ul>
                <button className = "logOut">
                    Log Out
                </button>
            </nav>
        </body>
  );
}

export default Server_navigationBar