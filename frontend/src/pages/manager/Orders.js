import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { API_URL } from "../../API";

/**
 * Page that displays the last 1000 orders made between two specific dates.
 * These dates are chosen and inputted by the manager in order them to analyze the 
 * orders as they please. Also, allows managers to export the orders table to 
 * Excel if desired. All orders information is stored in the database and, as a result, 
 * pulled  directly from the database in order to populate the table.
 * @returns {HTML} - code displaying Orders page in Manager Graphical User Interface
 */
function Orders(){
    const [order, setOrders] = useState([]);

    const [date, setDate] = useState("");
    const date1 = new Date('September 1, 2022 00:00:00');
    const date2 = new Date();
    const [startDate, setStartDate] = useState(date1);
    const [endDate, setEndDate] = useState(date2);
    const tableRef = useRef(null);

    useEffect(() =>{
      axios.get(API_URL + "/getOrders", {params: {date1: startDate, date2:endDate}}).then((response) =>{
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
        <h3>Orders (Last 1000 Made Between Selected Dates)</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
        <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
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
                  <td style={{fontSize:'var(--sizer)'}}>{val.Line_Num}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Order_ID}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Cust_Name}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Recipe_ID}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.orderQuantity}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{getDates(val.Date)}</td>
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
             <button style={{float:'right', marginTop:'1vh'}} className='btn1'>Export to Excel</button>
        </DownloadTableExcel>
        </div>
        <div style={{marginBottom:'-20vh'}}>
          <h3>Start Date:</h3><DatePicker selected={startDate} maxDate={new Date()} onChange={(date) => setStartDate(date)}/>
          <h3>End Date:</h3><DatePicker selected={endDate} maxDate={new Date()} onChange={(date) => setEndDate(date)}/>
        </div>
        </Mainlayout>
    );
}
export default Orders;