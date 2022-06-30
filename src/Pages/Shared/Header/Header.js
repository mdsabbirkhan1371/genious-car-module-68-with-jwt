import React from 'react';
import './Header.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../images/logo/logo-black.png'
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth)
    const handleSignout = () => {
        signOut(auth)
    }


    return (
        <header>

            <Navbar collapseOnSelect expand="lg" sticky='top' bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <img height="35px" src={logo} alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="home">Home</Nav.Link>
                            <Nav.Link href="home#services">Services</Nav.Link>
                            <Nav.Link href="home#experts">Experts</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to='/about'>About</Nav.Link>
                            {
                                user && <>
                                    <Nav.Link as={Link} to='/addservice'>AddService</Nav.Link>
                                    <Nav.Link as={Link} to='/manage'>Manage</Nav.Link>

                                </>
                            }
                            {
                                user ?
                                    <button onClick={handleSignout} className='btn btn-outline-success text-white'>SignOut</button>
                                    :
                                    <Nav.Link as={Link} to='/login'>
                                        Login
                                    </Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </header>
    );
};

export default Header;