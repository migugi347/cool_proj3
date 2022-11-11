import React, {useState,useEffect} from "react";
import "./Menu.css";
import axios from "axios";
import logo from './logo.png';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';

function Reports(){
    const [sale, sales] = useState([]);
    
    const getSales = ()=>{
        let date1 = prompt("Please enter date one:");
        let date2 = prompt("Please enter date two:");

        axios.get("http://localhost:3001/getSales", {params: {date1: date1, date2:date2}}).then((response) =>{
            sales(response.data);
        });
    }
    const getRestock = ()=>{
        axios.get("http://localhost:3001/getRestock", {params: {}}).then((response) =>{
            sales(response.data);
        });
    }
    const getExcess = ()=>{
        // let date1 = prompt("Please enter date one:");
        // let date2 = prompt("Please enter date two:");

        // axios.get("http://localhost:3001/getSales", {params: {date1: date1, date2:date2}}).then((response) =>{
        //     sales(response.data);
        // });
    }

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
                <h1>Starbucks</h1>
            </div>
        <div className = "anotherContainer">
        <h3>Sales Report</h3>
        <div className="app-container"> 
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {sale.map((val) => (
                <tr>
                  <td>{val.Recipe_ID}</td>
                  <td>{val.Name}</td>
                  <td>{val.quantity}</td>
                  <td>${val.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick ={()=>getSales()}>Sales Report</button>
        <button onClick ={()=>getRestock()}>Restock Report</button>
        <button onClick ={()=>getExcess()}>Excess Report</button>
        </div>
        </body>
    );
}
export default Reports;