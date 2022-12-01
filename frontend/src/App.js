import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Homepage from './pages/customer/homepage';
import Pospage from './pages/customer/pospage'
import CustomerLogin from './pages/customer/customerLogin';
import Inventory from './pages/manager/Inventory';
import UpdateMenu from './pages/manager/UpdateMenu';
import UpdateInventory from './pages/manager/UpdateInventory';
import Menu from './pages/manager/Menu';
import Reports from './pages/manager/Reports';
import ExReports from './pages/manager/ExReports';
import ReReports from './pages/manager/ReReports';
import Orders from './pages/manager/Orders';
import Employees from './pages/manager/Employees';
import ServerHomeScreen from './pages/server/server_homescreen';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ='/' element={<CustomerLogin />} />
          <Route path ='/home' element={<Homepage />} />
          <Route path ='/pos' element={<Pospage />} />
          <Route path = '/menu' element = {<Menu/>}/>
          <Route path = '/orders' element = {<Orders/>}/>
          <Route path ='/inventory' element={<Inventory/>} />
          <Route path ='/updateMenu' element={<UpdateMenu/>} />
          <Route path ='/updateInventory' element={<UpdateInventory/>} />
          <Route path ='/reports' element={<Reports/>} />
          <Route path ='/exreports' element={<ExReports/>} />
          <Route path ='/rereports' element={<ReReports/>} />
          <Route path = "/server" element = {<ServerHomeScreen/>} />
          <Route path = "/Employees" element = {<Employees/>} />
        </Routes>
      </Router>
      </>
  );
}
export default App;
