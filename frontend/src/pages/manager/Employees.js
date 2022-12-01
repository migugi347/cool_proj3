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
              <Link to='/employees' className='btn btn-primary'> Employees</Link>
            </Dropdown>
        </div>
        <div className = "anotherContainer">
        <h3>Employees</h3>
        <div style={{height:'40vh', overflowX:'hidden',overflowY:'scroll'}}>
            <div className="table-responsive bg-secondary rounded"> 
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
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                    <td>{val.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        <button className ='btn btn-primary' onClick={()=>addEmployee()}>Add New Employee</button>
        <button style={{margin:'5px'}} className ='btn btn-primary' onClick={()=>deleteEmployee()}>Fire Employee</button>
        <button style={{margin:'5px'}} className ='btn btn-primary' onClick={()=>updateEmployee()}>Edit Employee Type</button>

        <DownloadTableExcel
                    filename="Employee Report"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right'}} className='btn btn-primary'> Export to Excel</button>
        </DownloadTableExcel>
        </Mainlayout>
    );
}
export default Employees;