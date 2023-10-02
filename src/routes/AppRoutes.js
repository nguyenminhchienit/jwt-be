import Login from '../component/Login/Login';
import { Route, Switch} from "react-router-dom";
import Register from '../component/Register/Register';
import User from '../component/ManageUser/User';
import PrivateRoutes from './PrivateRoutes';
import Role from '../component/Role/Role';

function AppRoutes() {
    return ( 
        <>
            <Switch>
                <Route exact path="/">
                    HOME PAGE
                </Route>
                
                <PrivateRoutes path='/role' component={Role} />
                
                <Route path="/gallery">
                    GALLERY
                </Route>
                
                <PrivateRoutes path='/user' component={User}/>

                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="*">
                    <h1>404 Not found</h1>
                </Route>
          </Switch>
        </>
     );
}

export default AppRoutes;