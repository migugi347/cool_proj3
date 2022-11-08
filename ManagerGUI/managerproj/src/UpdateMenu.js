import React, {useState,useEffect} from "react";
import "./Menu.css";
import axios from "axios";
import logo from './logo.png';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';

function UpdateMenu(){
    const [image, images] = useState([]);
    const [recID, setrecID] = useState(0);

    const subs = () =>{
        axios.get("http://localhost:3001/getMenuImage",{
            recID: recID
        }); 
    };

    return(
        <body>
            <div className = "header">
            <ul>
                <li><Link style={{ textDecoration: 'none', color: 'white' }}to = '/'>Menu</Link></li>
                <li><Link style={{ textDecoration: 'none', color: 'white' }}to = '/inventory'>Inventory</Link></li>
                <li><Link style={{ textDecoration: 'none', color: 'white' }}to = '/reports'>Reports</Link></li>
            </ul>
            </div>
            <div className = "logoname">
                <img alt=""  className = "logo" src={logo} />
                <h1 >Starbucks</h1>
            </div>
            
            <div className = "mid">
                <form>
                    <label>Recipe_ID:</label>
                    <input type="text" name="recID" onChange = {(e)=>{setrecID(e.target.value);}}></input>
                    <button id = "sub" type = "button" onClick={()=>subs()}>Update Menu Item</button>
                </form>
            </div>
        </body>
    )
};
export default UpdateMenu;