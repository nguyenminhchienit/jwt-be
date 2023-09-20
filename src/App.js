import './App.scss';
import Login from './component/Login/Login';
import Navigation from './component/Navigation/Navigation';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Register from './component/Resgister/Register';
import { useEffect, useState } from 'react';
import _ from 'lodash'
import User from './component/ManageUser/User';
  

function App() {
  const [account, setAccount] = useState({})

  useEffect(() => {
    let data = sessionStorage.getItem("account");
    if (data) {
      setAccount(JSON.parse(data));
    }
  },[])
  return (
    <div className="App">
      <Router>
        {account && !_.isEmpty(account) && account.isLogin && <Navigation/>}
        <Switch>
          <Route exact path="/">
            HOME PAGE
          </Route>
          <Route path="/about">
            ABOUT
          </Route>
          <Route path="/gallery">
            GALLERY
          </Route>
          <Route path="/user">
            <User/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
