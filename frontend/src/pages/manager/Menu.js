import React, {useState,useEffect} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';

function Menu(){
    const [menuitem, menu] = useState([]);
    const [name, setName] = useState("");
    const [recID, setrecID] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
  
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
  <Mainlayout>
      <div className = "header">
      
        <ul>
          <Link to='/menu' className='btn btn-primary'> Menu</Link>
          <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
          <Link to='/reports' className='btn btn-primary'> Reports</Link>
          <Link to='/orders' className='btn btn-primary'> Orders</Link>
        </ul>
      </div>

      <div className = "anotherContainer">
        <h3>Menu</h3>
        <div className="table-responsive bg-secondary rounded"> 
          <table className="table">
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
              <button className='btn btn-primary' onClick={()=>subs()}> Add New Menu Item</button>
            </form>
        </div>
        <div className = "deleteForm">
            <form>
              <label>Recipe_ID:</label>
              <input type="text" name="recID" onChange = {(e)=>{setrecID(e.target.value);}}></input>
              <button className='btn btn-primary' onClick={()=>dels()}> Delete Menu Item</button>
            </form>
        </div>
        <div className = "updateForm">
            <form>
              <Link to='/updateMenu' className='btn btn-primary'> Update Menu Item</Link>
            </form>
        </div>
      </div>
    </Mainlayout>
    );
}
export default Menu;