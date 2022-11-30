import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Reports(){
    const [sale, sales] = useState([]);
    const date1 = new Date('September 1, 2022 00:00:00');
    const date2 = new Date('September 15, 2022 00:00:00');
    const [startDate, setStartDate] = useState(date1);
    const [endDate, setEndDate] = useState(date2);
    const tableRef = useRef(null);

    useEffect(() =>{
      axios.get("http://localhost:3001/getSales", {params: {date1: startDate, date2:endDate}}).then((response) =>{
        sales(response.data);
      });
    },[startDate,endDate]);

    return(
      <Mainlayout>
        <div className = "header">
            <Dropdown style={{}}>
              <Link to='/menu' className='btn btn-primary'> Menu</Link>
              <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: '#00704A', color:"#FFFFFF", marginLeft:"10px"}}>Reports</Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item>
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
        <h3>Sales Report</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
          <div className="table-responsive bg-secondary rounded"> 
            <table  ref={tableRef} className="table" style={{textAlign:'center'}}>
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
                    <td>${val.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        <div style={{marginBottom:'-20vh'}}>
          <h3>Start Date:</h3><DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
          <h3>End Date:</h3><DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
        </div>
        <DownloadTableExcel
                    filename="Sales Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button className='btn btn-primary'> Export as Excel Sheet</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default Reports;