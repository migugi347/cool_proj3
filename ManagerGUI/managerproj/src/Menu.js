import React, {useState,useEffect} from "react";
import "./Menu.css";
import axios from "axios";
import logo from './logo.png';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';

function Menu(){
    const [menuitem, menu] = useState([]);
    const [name, setName] = useState("");
    const [recID, setrecID] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
  
    function myFunction(){
        console.log('Button is clicked')
    }
  
    useEffect(() =>{
      axios.get("http://localhost:3001/getMenu").then((response) =>{
        menu(response.data);
      });
    });
  
    const subs = () =>{
        axios.post("http://localhost:3001/addMenu",{
        recipeID: recID,
        name: name,
        price: price,
        category: category
      }); 
    };
  
    const dels = () =>{
      axios.post("http://localhost:3001/deleteMenu",{
      recipeID: recID
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

      <div className = "anotherContainer">
        <h3>Menu</h3>
        <div className="app-container"> 
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {menuitem.map((val) => (
                <tr>
                  <td>{val.Recipe_ID}</td>
                  <td>{val.Name}</td>
                  <td>${val.Price}</td>
                  <td>{val.Category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className = "addForm">
            <form>
              <label>Recipe_ID:</label>
              <input type="text" name="recID" onChange = {(e)=>{setrecID(e.target.value);}}></input>
              <label>Name:</label>
              <input type="text" name="name" onChange = {(e)=>{setName(e.target.value);}}></input>
              <label>Price:</label>
              <input type="text" name="price" onChange = {(e)=>{setPrice(e.target.value);}}></input>
              <label>Category:</label>
              <input type="text" name="category" onChange = {(e)=>{setCategory(e.target.value);}}></input>
              <button id = "sub" type = "button" onClick={()=>subs()} >Add New Menu Item</button>
            </form>
        </div>
        <div className = "deleteForm">
            <form>
              <label>Recipe_ID:</label>
              <input type="text" name="recID" onChange = {(e)=>{setrecID(e.target.value);}}></input>
              <button id = "sub" type = "button" onClick={()=>dels()}>Delete Menu Item</button>
            </form>
        </div>
        <div className = "updateForm">
            <form>
              <button id = "sub" type = "button"><Link to = '/updateMenu'>Update Menu Item</Link></button>
            </form>
        </div>
      </div>
    </body>
    );
}
export default Menu;