import React, {useState, useEffect} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function UpdateInventory(){
    const [data, setData] = useState([]);
    const [invID, setInvID] = useState(0);
    const [name, setName] = useState(data.Name);
    const [quantity, setQuantity] = useState(data.Price);
    const [date, setDate] = useState(data.Category);
    const [onHand, setOnhand] = useState(data.Category);
    
    const subs = () =>{
        axios.get("http://localhost:3001/getInvItem", {params: {invID: invID}}).then((response) =>{
            setData(response.data);
        });
    };

    const getDates =(x) => {
        const date = new Date(x);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return [year, month, day].join('-');
    };

    const updateItem = () =>{
       var a,b,c,d;
       // eslint-disable-next-line 
        data.map(val => {
           a = val.Inventory;
           b = val.Quantity;
           c = val.OrderDate;
           d = val.onhand;
        });
        if(name != null)
            a = name;
        if(quantity != null)
            b = quantity;
        if(date != null)
            c = date;
        if(onHand != null)
            d = onHand;
        axios.put("http://localhost:3001/updateInvItem", {invID: invID, name: a, quantity:b, date: c, onHand: d}).then((response) =>{});
        alert("Updated"); 
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
                        <Link to='/reports' className='btn btn-primary' style={{width:'150px'}}> Sales Report</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/exreports' className='btn btn-primary' style={{width:'150px'}}> Excess Report</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/rereports' className='btn btn-primary' style={{width:'150px'}}> Restock Report</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
                <Link to='/orders' className='btn btn-primary'> Orders</Link>
                <Link to='/employees' className='btn btn-primary'> Employees</Link>
                </Dropdown>
            </div>
            
            <div style={{marginTop:'3vh'}}>
                <Form>
                    <label>Inventory ID:</label>
                    <input type="text" name="invID" onChange = {(e)=>{setInvID(e.target.value);}}></input>
                </Form>
                <Button className='btn btn-primary' onClick={()=>subs()}> SELECT</Button>
            </div>
            
            <div style={{display:'flex', justifyContent:'center', marginTop:'5vh'}}>
                {data.map((val) => (
                    <form>
                        <label>Name:</label>
                        <input style={{margin:'10px'}} type="text" name="name" placeholder={val.Inventory} onChange = {(e)=>{setName(e.target.value);}}></input>
                        <label>Quantity:</label>
                        <input style={{margin:'10px'}} type="text" name="quantity" placeholder={val.Quantity} onChange = {(e)=>{setQuantity(e.target.value);}}></input>
                        <label>Date:</label>
                        <input style={{margin:'10px'}} type="text" name="date" placeholder={getDates(val.OrderDate)} onChange = {(e)=>{setDate(e.target.value);}}></input>
                        <label>On Hand:</label>
                        <input style={{margin:'10px'}} type="text" name="onhand" placeholder={val.onhand} onChange = {(e)=>{setOnhand(e.target.value);}}></input>
                        <button className='btn btn-primary' onClick={()=>updateItem()}>Update Inventory Item</button>
                    </form>
                ))}
            </div>
        </Mainlayout>
    )
};
export default UpdateInventory;