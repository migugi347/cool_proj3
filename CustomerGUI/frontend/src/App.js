import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Homepage from './pages/homepage';
import Pospage from './pages/pospage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/pos' element={<Pospage />} />

      </Routes>
    </Router>
  );

}
export default App;
