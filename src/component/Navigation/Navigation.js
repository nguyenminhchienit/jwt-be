import './Navigation.scss'
import { NavLink } from "react-router-dom";

function Navigation(props) {
    return ( 
        <div className="nav-container">
            <div className='nav-list'>
                <NavLink to="/" exact className='nav-item'>Home</NavLink>
                <NavLink to= "/about" className='nav-item'>About</NavLink>
                <NavLink to= '/gallery' className='nav-item'>Gallery</NavLink>
                <NavLink to='/user' className='nav-item'>Users</NavLink>
            </div>
        </div>
     );
}

export default Navigation;