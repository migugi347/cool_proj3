import React, {useState,useEffect,useRef} from "react";
import Mainlayout from '../../layouts/Mainlayout';
import axios from "axios";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Menu(){
    const [menuitem, menu] = useState([]);
    const [name, setName] = useState("");
    const [recID, setrecID] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const tableRef = useRef(null);
  
    useEffect(() =>{
      axios.get("http://localhost:3001/getMenu").then((response) =>{
        menu(response.data);
      });
    });
  
    const subs = () =>{
        axios.post("http://localhost:3001/addMenu",{
        recipeID: recID,
        name: name,
        price: price,
        category: category,
        image:image
      }); 
    };
  
    const dels = () =>{
      let recID = prompt('Enter Recipe ID to be deleted:')
      axios.post("http://localhost:3001/deleteMenu",{
      recipeID: recID
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
        <h3>Menu</h3>
        <div style={{height:'80vh', overflowX:'hidden',overflowY:'scroll'}}>
        <div className="table-responsive rounded" style={{backgroundColor:'var(--secondary)'}}> 
          <table ref={tableRef} className="table" style={{textAlign:'center'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {menuitem.map((val) => (
                <tr>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Recipe_ID}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Name}</td>
                  <td style={{fontSize:'var(--sizer)'}}>${val.Price.toFixed(2)}</td>
                  <td style={{fontSize:'var(--sizer)'}}>{val.Category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        <DownloadTableExcel
                    filename="Menu"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                >
             <button style={{float:'right', width:'175px', marginTop:'1vh'}} className='btn1'>Export to Excel</button>
        </DownloadTableExcel>
        
        <div style={{display:'flex', marginTop:'6vh', marginBottom:'-20vh', justifyContent:'center', width:'80vw'}}>
          <div className = "addForm" style={{display:'flex', textAlign:'center', alignSelf:'flex-end'}}>
              <form>
                <div style={{textAlign:'right'}}>
                <label>Recipe_ID:</label>
                <input style={{margin:'7.5px'}} type="text" name="recID" onChange = {(e)=>{setrecID(e.target.value);}}></input><br></br>
                <label>Name:</label>
                <input style={{margin:'7.5px'}} type="text" name="name" onChange = {(e)=>{setName(e.target.value);}}></input><br></br>
                <label>Price:</label>
                <input style={{margin:'7.5px'}} type="text" name="price" onChange = {(e)=>{setPrice(e.target.value);}}></input><br></br>
                <label>Category:</label>
                <input style={{margin:'7.5px'}} type="text" name="category" onChange = {(e)=>{setCategory(e.target.value);}}></input><br></br>
                <label>Image URL:</label>
                <input style={{margin:'7.5px'}} type="text" name="image" onChange = {(e)=>{setImage(e.target.value);}}></input><br></br>
                </div>
                <button style={{width:'175px',marginTop:'7.5px'}} className='btn1' onClick={()=>subs()}> Add New Menu Item</button><br></br>
              </form>
          </div>

          <div className = "deleteForm" style={{alignSelf:'flex-end', marginLeft:'10vw',marginRight:'10vw'}}>
              <button style={{width:'175px'}} className='btn1' onClick={()=>dels()}> Delete Menu Item</button>
          </div>

          <div className = "updateForm" style={{alignSelf:'flex-end'}}>
            <form>
              <Link to='/updateMenu' style={{width:'175px',backgroundColor:'var(--primary)', color:'var(--secondary)'}} className='btn1'> Update A Menu Item</Link>
            </form>
          </div>
        </div>

      </div>
    </Mainlayout>
    );
}
export default Menu;