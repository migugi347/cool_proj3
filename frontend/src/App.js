import React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Homepage from './pages/customer/homepage';
import Pospage from './pages/customer/pospage'
import CustomerLogin from './pages/customer/customerLogin';
import Inventory from "./pages/manager/Inventory";
import Menu from "./pages/manager/Menu";
import UpdateMenu from "./pages/manager/UpdateMenu";
import Reports from "./pages/manager/Reports";

// const theme = createTheme({

//   palette: {
//     primary: {
//       main: '#00704A',
//     },
//     secondary: {
//       main: '#eac784',
//     },
//   },

// });

function App() {



  return (
    <>
      {/* <ServerNavigationBar/>
    <ServerOrderSummary/> */}
      <Router>
        <Routes>
          <Route path='/' element={<CustomerLogin />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/pos' element={<Pospage />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/updateMenu' element={<UpdateMenu />} />
          <Route path='/reports' element={<Reports />} />
          {/* <Route path = "/server" element = {<ServerHomeScreen/>} />
          <Route path = "/:category" element = {<ServerCategoriesScreen/>} /> */}
        </Routes>
      </Router>
    </>
  );

}
export default App;
