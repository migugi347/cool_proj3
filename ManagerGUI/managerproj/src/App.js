import Inventory from './Inventory';
import UpdateMenu from './UpdateMenu';
import Menu from './Menu';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path = '/' element = {<Menu/>}/>
          <Route path='/inventory' element={<Inventory/>} />
          <Route path='/updateMenu' element={<UpdateMenu/>} />
        </Routes>
      </Router>
    
  );
}

export default App;
