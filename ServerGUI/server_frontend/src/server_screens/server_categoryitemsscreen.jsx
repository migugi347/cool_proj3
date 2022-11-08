import React, { useEffect} from "react";
import Axios from "axios";
import {useParams} from 'react-router-dom'

function Server_categoryitemsscreen() {
    let { category } = useParams();

    {/*useEffect(() => {
        Axios.post("http://localhost:3001/");
    });*/}

    return (
        <h1>Category: {category}</h1>
      )
}

export default Server_categoryitemsscreen;