import './App.scss';
import Login from './component/Login/Login';
import Navigation from './component/Navigation/Navigation';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Register from './component/Resgister/Register';
  

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navigation/> */}
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
          <Route path="/contact-us">
            CONTACT US
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
