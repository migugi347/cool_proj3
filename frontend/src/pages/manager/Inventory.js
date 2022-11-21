import React, {useState,useEffect} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';

function Inventory(){
    const [inventoryitem, inventory] = useState([]);
    const [name, setName] = useState("");
    const [inventoryID, setinvID] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderDate, setOrderDate] = useState("");
    const [onhand, setOnHand] = useState(0);
  
    useEffect(() =>{
      axios.get("http://localhost:3001/getInventory").then((response) =>{
        inventory(response.data);
      });
    });
  
    const subs = () =>{
        axios.post("http://localhost:3001/addInventory",{
        inventoryID: inventoryID,
        name: name,
        quantity: quantity,
        orderDate: orderDate,
        onhand:onhand
      }); 
    };
  
    const dels = () =>{
      axios.post("http://localhost:3001/deleteInventory",{
      inventoryID: inventoryID
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

      <div className = "anotherContainer">
        <h3>Inventory</h3>
        <div className="table-responsive bg-secondary rounded"> 
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>QUANTITY</th>
                <th>ACQUIRED DATE</th>
                <th>ON HAND</th>
              </tr>
            </thead>
            <tbody>
              {inventoryitem.map((val) => (
                <tr>
                  <td>{val.Inventory_ID}</td>
                  <td>{val.Inventory}</td>
                  <td>{val.Quantity}</td>
                  <td>{val.OrderDate}</td>
                  <td>{val.onhand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className = "addForm">
            <form>
              <label>Inventory_ID:</label>
              <input type="text" name="invID" onChange = {(e)=>{setinvID(e.target.value);}}></input>
              <label>Name:</label>
              <input type="text" name="name" onChange = {(e)=>{setName(e.target.value);}}></input>
              <label>Quantity:</label>
              <input type="text" name="quantity" onChange = {(e)=>{setQuantity(e.target.value);}}></input>
              <label>Order Date:</label>
              <input type="text" name="orderDate" onChange = {(e)=>{setOrderDate(e.target.value);}}></input>
              <label>On Hand:</label>
              <input type="text" name="onHand" onChange = {(e)=>{setOnHand(e.target.value);}}></input>
              <button className='btn btn-primary' onClick={()=>subs()}>Add New Inv Item</button>
            </form>
        </div>
        <div className = "deleteForm">
            <form>
              <label>Inventory_ID:</label>
              <input type="text" name="recID" onChange = {(e)=>{setinvID(e.target.value);}}></input>
              <button className='btn btn-primary' onClick={()=>dels()}>Delete Inventory Item</button>
            </form>
        </div>
      </div>
      </Mainlayout>
    );
}
export default Inventory;