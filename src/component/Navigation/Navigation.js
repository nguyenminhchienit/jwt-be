import './Navigation.scss'
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from 'react-router';
import { useContext } from 'react';
import { UseContext } from '../../context/UseContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logoutUser } from '../../service/userService';
import { toast } from 'react-toastify';

function Navigation(props) {
    let location = useLocation();
    const { user, logoutContext } = useContext(UseContext);
    const history = useHistory();

    const handleLogout = async () => {
        let data = await logoutUser();
        if (data && data.EC === 0) {
            toast.success("Đăng xuất thành công");
            logoutContext();
            history.push('/login');
        } else {
            toast.error("Không thể đăng xuất");
        }
    }
    if ((user && user.isAuthenticate === true) || location.pathname === '/') {
        return (
            <Navbar bg='light' expand="lg" className="bg-body-tertiary nav-container">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className='navbar'>
                        <Nav className="nav-list">
                            <NavLink to="/" exact className='nav-item'>Home</NavLink>
                            <NavLink to= "/about" className='nav-item'>About</NavLink>
                            <NavLink to= '/gallery' className='nav-item'>Gallery</NavLink>
                            <NavLink to='/user' className='nav-item'>Users</NavLink>
                        </Nav>
                        {(user && user.isAuthenticate === true) && 
                            <Nav className='nav-link'>
                                <Nav.Item href="#home">Welcome, {user.account.username}</Nav.Item>
                                <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Thông tin cá nhân</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        <span onClick={() => handleLogout()}>
                                            Đăng xuất
                                        </span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
         );
    } else {
       return <></>
    }
    
}

export default Navigation;