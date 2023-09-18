import './App.scss';
import Navigation from './component/Navigation/Navigation';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
  

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
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
        </Switch>
      </Router>,
    </div>
  );
}

export default App;
