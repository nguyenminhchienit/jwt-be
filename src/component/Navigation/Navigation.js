import './Navigation.scss'
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router';
import { useContext } from 'react';
import { UseContext } from '../../context/UseContext';

function Navigation(props) {
    let location = useLocation();
    const { user } = useContext(UseContext);
    console.log("Check context: ", user);
    if ((user && user.isAuthenticate === true) || location.pathname === '/') {
        return (
            <>       
                <div className="nav-container">
                    <div className='nav-list'>
                        <NavLink to="/" exact className='nav-item'>Home</NavLink>
                        <NavLink to= "/about" className='nav-item'>About</NavLink>
                        <NavLink to= '/gallery' className='nav-item'>Gallery</NavLink>
                        <NavLink to='/user' className='nav-item'>Users</NavLink>
                    </div>
                </div>
            </>
         );
    } else {
       return <></>
    }
    
}

export default Navigation;