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
import Menu from './pages/manager/Menu';
import Reports from './pages/manager/Reports';
import Orders from './pages/manager/Orders';
import ServerHomeScreen from './pages/server/server_homescreen';

/**
 * Main page for Starbucks POS web application.
 * Used to route to different links (web pages) within the web application.
 * @returns {HTML} - HTML code containing all the routes within the web application.
 */
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
          <Route path ='/reports' element={<Reports/>} />
          <Route path = "/server" element = {<ServerHomeScreen/>} />
        </Routes>
      </Router>
      </>
  );
}
export default App;
