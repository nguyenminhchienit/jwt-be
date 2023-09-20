import { useState,useEffect } from 'react';
import './Navigation.scss'
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router';

function Navigation(props) {
    let location = useLocation();
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false);
        }
    }, [])

    return (
        <>
            { isShow &&
            <div className="nav-container">
                <div className='nav-list'>
                    <NavLink to="/" exact className='nav-item'>Home</NavLink>
                    <NavLink to= "/about" className='nav-item'>About</NavLink>
                    <NavLink to= '/gallery' className='nav-item'>Gallery</NavLink>
                    <NavLink to='/user' className='nav-item'>Users</NavLink>
                </div>
            </div>
        }
        </>
     );
}

export default Navigation;