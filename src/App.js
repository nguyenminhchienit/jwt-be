import './App.scss';
import Navigation from './component/Navigation/Navigation';
import {  BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Dna } from 'react-loader-spinner'
import { useContext } from 'react';
import { UseContext } from './context/UseContext';
  

function App() {

  const { user } = useContext(UseContext);
  return (
    <>
      {user && user.isLoading === true ?
        <div className='loading-app'>
          <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <div className='loading-text'>Loading...</div>
        </div>
        :
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
      }
    </>
  );
}

export default App;
