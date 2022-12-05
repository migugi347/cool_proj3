import React, {useState,useRef,useEffect} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadTableExcel } from 'react-export-table-to-excel';

function ExReports(){
    const [sale, sales] = useState([]);
    const date1 = new Date('October 28, 2022 00:00:00');
    const [startDate, setStartDate] = useState(date1);
    const tableRef = useRef(null);

    useEffect(() =>{
      axios.get("http://localhost:3001/getExcess", {params: {date1: startDate}}).then((response) =>{
        sales(response.data);
      }); 
    },[startDate]); 

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
        <h3>Excess Report</h3>
          <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
            <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
              <table ref={tableRef} className="table" style={{textAlign:'center'}}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QUANTITY USED SINCE DATE</th>
                    <th>CURRENT QUANTITY IN INVENTORY</th>
                  </tr>
                </thead>
                <tbody>
                  {sale.map((val) => (
                    <tr>
                      <td style={{fontSize:'var(--sizer)'}}>{val.inventory_id}</td>
                      <td style={{fontSize:'var(--sizer)'}}>{val.Inventory}</td>
                      <td style={{fontSize:'var(--sizer)'}}>{val.total}</td>
                      <td style={{fontSize:'var(--sizer)'}}>{val.Quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{marginBottom:'-8vh'}}>
          <h3>Date:</h3><DatePicker maxDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)}/>
        </div>
        <DownloadTableExcel
                    filename="Excess Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right',backgroundColor:'var(--primary)', color:'var(--secondary)'}} className='btn'> Export to Excel</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default ExReports;