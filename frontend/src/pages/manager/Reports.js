import React, {useState} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';

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
      <Mainlayout>
          <div className = "header">
            <ul>
              <Link to='/menu' className='btn btn-primary'> Menu</Link>
              <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
              <Link to='/reports' className='btn btn-primary'> Reports</Link>
            </ul>
          </div>
        <div className = "anotherContainer">
        <h3>Sales Report</h3>
        <div className="table-responsive bg-secondary rounded"> 
          <table className="table">
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
        <button className='btn btn-primary' onClick={()=>getSales()}>Sales Report</button>
        <button className='btn btn-primary' onClick={()=>getRestock()}>Restock Report</button>
        <button className='btn btn-primary' onClick={()=>getExcess()}>Excess Report</button>
        </div>
        </Mainlayout>
    );
}
export default Reports;