import './App.scss';
import Navigation from './component/Navigation/Navigation';
import {  BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

  

function App() {
  const [account, setAccount] = useState({})

  useEffect(() => {
    let data = sessionStorage.getItem("account");
    if (data) {
      setAccount(JSON.parse(data));
    }
  },[])
  return (
    <>
      <Router>
        <div className='app-header'>
          <Navigation/>
        </div>
        <div className="app-container">         
          <AppRoutes/>          
        </div>
      </Router>
    </>
  );
}

export default App;
