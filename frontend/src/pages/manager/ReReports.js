import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { DownloadTableExcel } from 'react-export-table-to-excel';


function ReReports(){
    const [sale, sales] = useState([]);
    const tableRef = useRef(null);
    
    useEffect(() =>{
        axios.get("http://localhost:3001/getRestock", {params: {}}).then((response) =>{
            sales(response.data);
        });
    });

    const getDates =(x) => {
        const date = new Date(x);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return [year, month, day].join('/');
    };

    const updateQuantity = () => {
        let date1 = prompt("Please Enter Inventory ID:");
        let date2 = prompt("Please Enter Quantity Arrived:");
        axios.get("http://localhost:3001/updateInventoryAmt", {params: {date1: date1, date2:date2}}).then((response) =>{
            sales(response.data);
        });
    };

    const updateMinimum = () => {
        let date1 = prompt("Please Enter Inventory ID:");
        let date2 = prompt("Please Enter New Minimum Amount:");
        axios.get("http://localhost:3001/newMin", {params: {date1: date1, date2:date2}}).then((response) =>{
            sales(response.data);
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
        <h3>Restock Report</h3>
        <div style={{height:'40vh', overflowX:'hidden',overflowY:'scroll'}}>
            <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
            <table ref={tableRef} className="table" style={{textAlign:'center'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QUANTITY</th>
                    <th>LAST RESTOCK DATE</th>
                    <th>MIN REQUIRED AMOUNTS</th>
                </tr>
                </thead>
                <tbody>
                {sale.map((val) => (
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
        </div>
        <button className ='btn1' onClick={()=>updateQuantity()}>Restock Inventory Item</button>
        <button style={{margin:'5px'}} className ='btn1' onClick={()=>updateMinimum()}>Change Minimum Amount</button>
        <DownloadTableExcel
                    filename="Restock Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right'}} className='btn1'> Export to Excel</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default ReReports;