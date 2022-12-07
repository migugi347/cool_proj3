import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { API_URL } from "../../API";

/**
 * Page that displays the store's current inventory. This includes all menu items, 
 * their name, quantity, on hand quantity, and acquired date. Furthermore, managers
 * have the options to add new inventory items, delete current inventory items, update
 * current inventory items, or export the Inventory table to Excel. All inventory information
 * is stored in the system's database and, as a result, is pulled directly from the database
 * and modified as needed.
 * @returns {HTML} - code that displays Inventory page for Manager Graphical User Interface
 */
function Inventory(){
    const [inventoryitem, inventory] = useState([]);
    const [name, setName] = useState("");
    const [inventoryID, setinvID] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderDate, setOrderDate] = useState("");
    const [onhand, setOnHand] = useState(0);
    const tableRef = useRef(null);
  
    useEffect(() =>{
      axios.get(API_URL + "/getInventory").then((response) =>{
        inventory(response.data);
      });
    });
  
    const subs = () =>{
        axios.post(API_URL + "/addInventory",{
        inventoryID: inventoryID,
        name: name,
        quantity: quantity,
        orderDate: orderDate,
        onhand:onhand
      }); 
    };
    
    const getDates =(x) => {
      const date = new Date(x);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return [year, month, day].join('/');
   };

    const dels = () =>{
      let inventoryID = prompt('Enter Inventory ID to be deleted:')
      axios.post(API_URL + "/deleteInventory",{
      inventoryID: inventoryID
    }); 
  };


return(
    <Mainlayout>
    <div className = "header" style={{backgroundColor:'var(--primary)'}}>
          <Dropdown style={{}}>
            <Link to='/menu' className='btn1'> Menu</Link>
            <Link to='/inventory' className='btn1'> Inventory</Link>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'var(--primary)', color:"var(--secondary)"}}>Reports</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item >
                  <Link to='/reports' className='btn1' style={{width:'150px'}}> Sales Report</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to='/exreports' className='btn1' style={{width:'150px'}}> Excess Report</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to='/rereports' className='btn1' style={{width:'150px'}}> Restock Report</Link>
                </Dropdown.Item>
            </Dropdown.Menu>
            <Link to='/orders' className='btn1'> Orders</Link>
            <Link to='/employees' className='btn1'> Employees</Link>
          </Dropdown>
      </div>

      <div className = "anotherContainer">
        <h3>Inventory</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
        <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
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
                  <td style={{fontSize:'var(--sizer)'}}>{val.Inventory_ID}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Inventory}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Quantity}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{getDates(val.OrderDate)}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.onhand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <DownloadTableExcel
                    filename="Inventory"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right', width:'175px', marginTop:'1vh'}} className='btn1'>Export to Excel</button>
        </DownloadTableExcel>
        
        <div style={{display:'flex', marginTop:'6vh', marginBottom:'-20vh', justifyContent:'center', width:'80vw'}}>
          <div className = "addForm" style={{display:'flex', textAlign:'center', alignSelf:'flex-end'}}>
              <form>
                <div style={{textAlign:'right'}}>
                <label>Inventory_ID:</label>
                <input style={{margin:'7.5px'}} type="text" name="invID" onChange = {(e)=>{setinvID(e.target.value);}}></input><br></br>
                <label>Name:</label>
                <input style={{margin:'7.5px'}} type="text" name="name" onChange = {(e)=>{setName(e.target.value);}}></input><br></br>
                <label>Quantity:</label>
                <input style={{margin:'7.5px'}} type="text" name="quantity" onChange = {(e)=>{setQuantity(e.target.value);}}></input><br></br>
                <label>Acquired Date:</label>
                <input style={{margin:'7.5px'}} type="text" name="orderDate" onChange = {(e)=>{setOrderDate(e.target.value);}}></input><br></br>
                <label>On Hand:</label>
                <input style={{margin:'7.5px'}} type="text" name="onHand" onChange = {(e)=>{setOnHand(e.target.value);}}></input><br></br>
                </div>
                <button style={{width:'175px',marginTop:'7.5px'}} className='btn1' onClick={()=>subs()}>Add New Inv Item</button>
              </form>
          </div>
          <div className = "deleteForm" style={{alignSelf:'flex-end', marginLeft:'10vw',marginRight:'10vw'}}>
            <button style={{width:'auto'}} className='btn1' onClick={()=>dels()}>Delete Inventory Item</button>
          </div>
          <div className = "updateForm" style={{alignSelf:'flex-end'}}>
              <Link to='/updateInventory' style={{width:'auto'}} className='btn1'> Update An Inventory Item</Link>
          </div>          
        </div>
      </div>
      </Mainlayout>
    );
}
export default Inventory;