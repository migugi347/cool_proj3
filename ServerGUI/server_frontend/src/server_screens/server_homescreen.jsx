import React, { useState, useEffect} from "react";
import Axios from "axios";

function Server_homescreen() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/server/getCategories").then((response) => {
            setCategories(response.data);
        });
    });

    return (
        <body>
            <div className = "header">
                <div className = "logo">
                    <img alt = "" src = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                    width = "80" height = "80" />
                </div>
            </div>
            <div className = "categoryButtons">
                {categories.map((val) => (
                    <h1> Category: {val.Category} </h1>
                ))}
            </div>
        </body>
  );
}

export default Server_homescreen;