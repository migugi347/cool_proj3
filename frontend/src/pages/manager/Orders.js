import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Orders(){
    const [order, setOrders] = useState([]);

    const [date, setDate] = useState("");
    const date1 = new Date('September 1, 2022 00:00:00');
    const date2 = new Date('September 15, 2022 00:00:00');
    const [startDate, setStartDate] = useState(date1);
    const [endDate, setEndDate] = useState(date2);
    const tableRef = useRef(null);

    useEffect(() =>{
      axios.get("http://localhost:3001/getOrders", {params: {date1: startDate, date2:endDate}}).then((response) =>{
        setOrders(response.data);
      });
    },[startDate,endDate]);
    
    const getDates =(x) => {
        const date = new Date(x);
        console.log(x);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return [year, month, day].join('/');
    };

    return(
      <Mainlayout>
        <div className = "header">
            <Dropdown>
              <Link to='/menu' className='btn btn-primary'> Menu</Link>
              <Link to='/inventory' className='btn btn-primary'> Inventory</Link>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{color:"#FFFFFF", marginLeft:"10px"}}>Reports</Dropdown.Toggle>
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
        <div className = "anotherContainer">
        <h3>Orders (Last 1000 Made Between Selected Dates)</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
        <div className="table-responsive bg-secondary rounded"> 
          <table ref={tableRef} className="table" style={{textAlign:'center'}}>
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
                  <td>{getDates(val.Date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
        <DownloadTableExcel
                    filename="Orders"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right', marginTop:'1vh'}} className='btn btn-primary'>Export to Excel</button>
        </DownloadTableExcel>
        </div>
        <div style={{marginBottom:'-20vh'}}>
          <h3>Start Date:</h3><DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
          <h3>End Date:</h3><DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
        </div>
        </Mainlayout>
    );
}
export default Orders;