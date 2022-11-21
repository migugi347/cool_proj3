import React, {useState, useEffect} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {Link} from 'react-router-dom';

function UpdateMenu(){
    const [image, images] = useState([]);
    const [recipe, recipes] = useState([]);
    const [recID, setrecID] = useState(0);
    const [name, setName] = useState(image.Name);
    const [price, setPrice] = useState(image.Price);
    const [category, setCategory] = useState(image.Category);
   

    useEffect(() =>{
        var x = document.getElementById("recipeTable");
        x.style.display = "none";
    },[]);

    const displayRecipe = () =>{
        var x = document.getElementById("recipeTable");
        x.style.display = "block";
    };
    
    const subs = () =>{
        axios.get("http://localhost:3001/getMenuItem", {params: {recID: recID}}).then((response) =>{
            images(response.data);
        });
        axios.get("http://localhost:3001/getItemRecipe", {params: {recID: recID}}).then((response) =>{
            recipes(response.data);
        });
        displayRecipe();  
    };

    const updateItem = () =>{
       var a,b,c;
       // eslint-disable-next-line 
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
       <Mainlayout>
            <div className = "header">
                <ul>
                <Link to='/menu' className='btn btn-primary'> Menu</Link>
                <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
                <Link to='/reports' className='btn btn-primary'> Reports</Link>
                </ul>
            </div>
            
            <div>
                <Form>
                    <label>Recipe_ID:</label>
                    <input type="text" name="recID" onChange = {(e)=>{setrecID(e.target.value);}}></input>
                </Form>
                <Button className='btn btn-primary' onClick={()=>subs()}> SELECT</Button>
            </div>
            <div>
                {image.map((val) => (
                    // eslint-disable-next-line 
                    <img src = {val.image} className="img"></img>
                ))}
            </div>
            
            <div>
                {image.map((val) => (
                    <form>
                        <label>Name:</label>
                        <input type="text" name="name" placeholder={val.Name} onChange = {(e)=>{setName(e.target.value);}}></input>
                        <label>Price:</label>
                        <input type="text" name="price" placeholder={val.Price} onChange = {(e)=>{setPrice(e.target.value);}}></input>
                        <label>Category:</label>
                        <input type="text" name="category" placeholder={val.Category} onChange = {(e)=>{setCategory(e.target.value);}}></input>
                        <button className='btn btn-primary' onClick={()=>updateItem()}>Update Menu Item</button>
                    </form>
                ))}
            </div>

            <div className = "recipeTable" id ="recipeTable">
                <h3>Recipe Table</h3>
                <div className="table-responsive bg-secondary rounded"> 
                    <table className="table">
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
                </div>
                <button className='btn btn-primary' onClick={()=>recipeInsert()}>Insert</button>
                <button className='btn btn-primary' onClick={()=>recipeDelete()}>Delete</button>
                <button className='btn btn-primary' onClick={()=>recipeUpdate()}>Update</button>
            </div>
        </Mainlayout>
    )
};
export default UpdateMenu;