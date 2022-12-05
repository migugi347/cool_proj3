import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { DownloadTableExcel } from 'react-export-table-to-excel';


function Employees(){
    const [employees, getEmployees] = useState([]);
    const tableRef = useRef(null);
    
    useEffect(() =>{
        axios.get("http://localhost:3001/getEmployees", {params: {}}).then((response) =>{
            getEmployees(response.data);
        });
    });

    const addEmployee = () =>{
        let email = prompt('Enter employee email:')
        let name = prompt('Enter employee name:')
        let phone = prompt('Enter employee phone #:')
        let password = prompt('Enter a password for employee:')
        let type = prompt("Enter employee type:")
        axios.post("http://localhost:3001/addEmployee",{
            email: email,
            name: name,
            phone: phone,
            type: type,
            password: password
        });
    }; 

    const deleteEmployee = () =>{
        let employeeEmail = prompt("Enter employee's email to fire:")
        axios.post("http://localhost:3001/deleteEmployee",{
            employeeEmail: employeeEmail
        });
    };
 
    const updateEmployee = () =>{
        let employeeEmail = prompt("Enter employee's email to update:")
        let type = prompt("Enter new type:")
        axios.post("http://localhost:3001/updateEmployee",{
            email: employeeEmail,
            type:type
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
        <h3>Employees</h3>
        <div style={{height:'40vh', overflowX:'hidden',overflowY:'scroll'}}>
            <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
            <table ref={tableRef} className="table" style={{textAlign:'center'}}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone #</th>
                    <th>Employee Type</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((val) => (
                    <tr>
                    <td style={{fontSize:'var(--sizer)'}}>{val.name}</td>
                    <td style={{fontSize:'var(--sizer)'}}>{val.email}</td>
                    <td style={{fontSize:'var(--sizer)'}}>{val.phone}</td>
                    <td style={{fontSize:'var(--sizer)'}}>{val.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        <button className ='btn' style={{backgroundColor:'var(--primary)', color:'var(--secondary)'}} onClick={()=>addEmployee()}>Add New Employee</button>
        <button style={{margin:'5px', backgroundColor:'var(--primary)', color:'var(--secondary)'}} className ='btn ' onClick={()=>deleteEmployee()}>Fire Employee</button>
        <button style={{margin:'5px', backgroundColor:'var(--primary)', color:'var(--secondary)'}} className ='btn ' onClick={()=>updateEmployee()}>Edit Employee Type</button>

        <DownloadTableExcel
                    filename="Employee Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right', backgroundColor:'var(--primary)', color:'var(--secondary)'}} className='btn '> Export to Excel</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default Employees;