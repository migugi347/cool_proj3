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
    },[]);

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
        <h3>Restock Report</h3>
        <div style={{height:'40vh', overflowX:'hidden',overflowY:'scroll'}}>
            <div className="table-responsive bg-secondary rounded"> 
            <table ref={tableRef} className="table" style={{textAlign:'center'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QUANTITY</th>
                    <th>LAST ORDER DATE</th>
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
        <DownloadTableExcel
                    filename="Restock Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button className='btn btn-primary'> Export as Excel Sheet</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default ReReports;