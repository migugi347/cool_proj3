import React, {useState,useEffect} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Orders(){
    const [order, setOrders] = useState([]);
    const [date, setDate] = useState("");
    
    useEffect(() =>{
        axios.get("http://localhost:3001/getOrders", {}).then((response) =>{
            setOrders(response.data);
        });
      },[]);
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
            </Dropdown>
        </div>
        <div className = "anotherContainer">
        <h3>Orders (Last 100 Made)</h3>
        <div className="table-responsive bg-secondary rounded"> 
          <table className="table">
            <thead>
              <tr>
                <th>LINE#</th>
                <th>ORDER_ID</th>
                <th>CUSTOMER</th>
                <th>RECIPE_ID</th>
                <th>QUANTITY</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {order.map((val) => (
                <tr>
                  <td>{val.Line_Num}</td>
                  <td>{val.Order_ID}</td>
                  <td>{val.Cust_Name}</td>
                  <td>{val.Recipe_ID}</td>
                  <td>{val.orderQuantity}</td>
                  <td>{val.Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </Mainlayout>
    );
}
export default Orders;