import React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Homepage from './pages/homepage';
import Pospage from './pages/pospage'
import CustomerLogin from './pages/customerLogin';
import { useEffect, useState } from "react"



function App() {

 const  [user ,setUser] =useState([]);

 
  return (

    
      <Router>
        <Routes>
        <Route path='/' element={<CustomerLogin />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/pos' element={<Pospage />} />

        </Routes>
      </Router>
   
  );

}
export default App;
