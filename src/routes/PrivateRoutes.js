import { useContext } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UseContext } from "../context/UseContext";

function PrivateRoutes(props) {

    const { user } = useContext(UseContext);
    console.log("Check context route: ", user);
    if (user && user.isAuthenticate === true) {
        return ( 
            <>
                <Route path={props.path} component={props.component}/>
            </>
         );     
    } else {
        return (
            <Redirect to='/login'></Redirect>
        )
    }
}

export default PrivateRoutes;