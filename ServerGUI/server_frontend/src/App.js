import React from "react";
import{
  Routes,
  Route,
} from 'react-router-dom';
import ServerHomeScreen from './server_screens/server_homescreen';
import ServerCategoriesScreen from './server_screens/server_categoryitemsscreen';
import ServerNavigationBar from './server_navigationBar';
import ServerOrderSummary from './server_orderSummary';

function App() {  
  return(
    <>
      <ServerNavigationBar/>
      <ServerOrderSummary/>
      <Routes>
        <Route path = "/" element = {<ServerHomeScreen/>} />
        <Route path = "/:category" element = {<ServerCategoriesScreen/>} />
      </Routes>
    </>
  );
}

export default App;
