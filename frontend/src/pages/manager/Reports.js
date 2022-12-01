import React, { useState } from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { API_URL } from "../../API";

function Reports() {
  const [sale, sales] = useState([]);

  const getSales = () => {
    let date1 = prompt("Please enter date one:");
    let date2 = prompt("Please enter date two:");

    axios.get(API_URL + "/getSales", { params: { date1: date1, date2: date2 } }).then((response) => {
      sales(response.data);
    });
  }
  const getRestock = () => {
    axios.get(API_URL + "/getRestock", { params: {} }).then((response) => {
      sales(response.data);
    });
  }
  const getExcess = () => {
    // let date1 = prompt("Please enter date one:");
    // let date2 = prompt("Please enter date two:");

    // axios.get("http://localhost:3001/getSales", {params: {date1: date1, date2:date2}}).then((response) =>{
    //     sales(response.data);
    // });
  }

  return (
    <Mainlayout>
      <div className="header">
        <Dropdown style={{}}>
          <Link to='/menu' className='btn btn-primary'> Menu</Link>
          <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#00704A', color: "#FFFFFF", marginLeft: "10px" }}>Reports</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to='/reports' className='btn btn-primary' style={{ width: '150px' }}> Sales Report</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/exreports' className='btn btn-primary' style={{ width: '150px' }}> Excess Report</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to='/rereports' className='btn btn-primary' style={{ width: '150px' }}> Restock Report</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
          <Link to='/orders' className='btn btn-primary'> Orders</Link>
        </Dropdown>
      </div>
      <div className="anotherContainer">
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
      </div>
    </Mainlayout>
  );
}
export default Reports;