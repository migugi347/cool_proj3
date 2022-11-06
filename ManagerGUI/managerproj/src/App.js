import Inventory from './inventory';
import Menu from './Menu';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path = '/menu' element = {<Menu/>}/>
          <Route path='/inventory' element={<Inventory/>} />
        </Routes>
      </Router>
    
  );
}

export default App;
