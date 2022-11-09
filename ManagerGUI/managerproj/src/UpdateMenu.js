import React, {useState} from "react";
import "./Menu.css";
import axios from "axios";
import logo from './logo.png';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';

function UpdateMenu(){
    const [image, images] = useState([]);
    const [recipe, recipes] = useState([]);
    const [recID, setrecID] = useState(0);
    const [name, setName] = useState(image.Name);
    const [price, setPrice] = useState(image.Price);
    const [category, setCategory] = useState(image.Category);
   

    const subs = () =>{
        axios.get("http://localhost:3001/getMenuItem", {params: {recID: recID}}).then((response) =>{
            images(response.data);
        });
        axios.get("http://localhost:3001/getItemRecipe", {params: {recID: recID}}).then((response) =>{
            recipes(response.data);
        });  
    };

    const updateItem = () =>{
       var a,b,c;
        image.map(val => {
           a = val.Name;
           b = val.Price;
           c = val.Category;
        });
        if(name != null)
            a = name;
        if(price != null)
            b = price;
        if(category != null)
            c = category;
        axios.put("http://localhost:3001/updateItem", {recID: recID,name: a, price:b, category: c}).then((response) =>{}); 
    };

    const recipeInsert = () =>{
        let id = prompt("Please enter inventory id:");
        let quantity = prompt("Please enter the quantity");
        axios.post("http://localhost:3001/addRecipeItem",{
            recipeID: recID,
            invenID: id,
            quantity: quantity
        }); 
    };

    const recipeDelete = () =>{
        let id = prompt("Please enter inventory id:");
        axios.post("http://localhost:3001/deleteRecipeItem",{
            recipeID: recID,
            invenID: id
        }); 
    };

    const recipeUpdate = () =>{
        let id = prompt("Please enter inventory id:");
        let val = prompt("Please enter new quantity:");
        axios.post("http://localhost:3001/updateRecipeItem",{
            recipeID: recID,
            invenID: id,
            quantity: val
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
                    <button id = "sub" type = "button" onClick={()=>subs()}>SELECT</button>
                </form>
            </div>

            <div className = "image">
                {image.map((val) => (
                    <img src = {val.image}></img>
                ))}
            </div>
            <div className = "updateForm">
                {image.map((val) => (
                    <form>
                        <label>Name:</label>
                        <input type="text" name="name" placeholder={val.Name} onChange = {(e)=>{setName(e.target.value);}}></input>
                        <label>Price:</label>
                        <input type="text" name="price" placeholder={val.Price} onChange = {(e)=>{setPrice(e.target.value);}}></input>
                        <label>Category:</label>
                        <input type="text" name="category" placeholder={val.Category} onChange = {(e)=>{setCategory(e.target.value);}}></input>
                        <button id = "sub" type = "button" onClick={()=>updateItem()} >Update Menu Item</button>
                    </form>
                ))}
            </div>
            <h3>Recipe Table</h3>
            <div className="recipetable"> 
                <table>
                    <thead>
                    <tr>
                        <th>INVENTORY ID</th>
                        <th>INGREDIENT NAME</th>
                        <th>QUANTITY</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recipe.map((val) => (
                        <tr>
                            <td>{val.inventory_id}</td>
                            <td>{val.Inventory}</td>
                            <td>{val.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick = {()=>recipeInsert()}>Insert</button>
                <button onClick = {()=>recipeDelete()}>Delete</button>
                <button onClick = {()=>recipeUpdate()}>Update</button>
            </div>
        </body>
    )
};
export default UpdateMenu;