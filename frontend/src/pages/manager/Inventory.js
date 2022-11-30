import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Inventory(){
    const [inventoryitem, inventory] = useState([]);
    const [name, setName] = useState("");
    const [inventoryID, setinvID] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderDate, setOrderDate] = useState("");
    const [onhand, setOnHand] = useState(0);
    const tableRef = useRef(null);
  
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
    
    const getDates =(x) => {
      const date = new Date(x);
      console.log(x);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return [year, month, day].join('/');
   };

    const dels = () =>{
      axios.post("http://localhost:3001/deleteInventory",{
      inventoryID: inventoryID
    }); 
  };


return(
    <Mainlayout>
      <div className = "header">
          <Dropdown style={{}}>
            <Link to='/menu' className='btn btn-primary'> Menu</Link>
            <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: '#00704A', color:"#FFFFFF", marginLeft:"10px"}}>Reports</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item >
                  <Link to='/reports' className='btn btn-primary'style={{width:'150px'}}> Sales Report</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to='/exreports' className='btn btn-primary' style={{width:'150px'}}> Excess Report</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to='/rereports' className='btn btn-primary' style={{width:'150px'}}> Restock Report</Link>
                </Dropdown.Item>
            </Dropdown.Menu>
            <Link to='/orders' className='btn btn-primary'> Orders</Link>
          </Dropdown>
      </div>

      <div className = "anotherContainer">
        <h3>Inventory</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
        <div className="table-responsive bg-secondary rounded"> 
          <table ref={tableRef} className="table" style={{textAlign:'center'}}>
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
                  <td>{getDates(val.OrderDate)}</td>
                  <td>{val.onhand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <DownloadTableExcel
                    filename="Inventory"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button className='btn btn-primary'> Export as Excel Sheet</button>
      </DownloadTableExcel>
      </Mainlayout>
    );
}
export default Inventory;