import{
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ServerHomeScreen from './server_screens/server_homescreen';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<ServerHomeScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
