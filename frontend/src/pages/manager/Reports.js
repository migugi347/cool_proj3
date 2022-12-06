import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { API_URL } from "../../API";

function Reports(){
    const [sale, sales] = useState([]);
    const date1 = new Date('September 1, 2022 00:00:00');
    const date2 = new Date();
    const [startDate, setStartDate] = useState(date1);
    const [endDate, setEndDate] = useState(date2);
    const tableRef = useRef(null);

    useEffect(() =>{
      axios.get(API_URL + "/getSales", {params: {date1: startDate, date2:endDate}}).then((response) =>{
        sales(response.data);
      });
    },[startDate,endDate]);

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
        <h3>Sales Report</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
          <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
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
                    <td style={{fontSize:'var(--sizer)'}}>{val.Recipe_ID}</td>
                    <td style={{fontSize:'var(--sizer)'}}>{val.Name}</td>
                    <td style={{fontSize:'var(--sizer)'}}>{val.quantity}</td>
                    <td style={{fontSize:'var(--sizer)'}}>${val.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        <div style={{marginBottom:'-15vh'}}>
          <h3>Start Date:</h3><DatePicker selected={startDate} maxDate={new Date()} onChange={(date) => setStartDate(date)}/>
          <h3>End Date:</h3><DatePicker selected={endDate} maxDate={new Date()} onChange={(date) => setEndDate(date)}/>
        </div>
        <DownloadTableExcel
                    filename="Sales Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right'}} className='btn1'> Export to Excel</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default Reports;