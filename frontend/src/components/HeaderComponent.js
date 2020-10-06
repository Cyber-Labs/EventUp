import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { isAuth } from './shared/helpers';
import { useHistory } from 'react-router-dom';
import { signout } from './shared/helpers';

const Header = (props) => {
    const [isNavOpen,setIsNavOpen] = useState(false);
    const toggleNav = () => {
            setIsNavOpen(!isNavOpen)
    }

    
        const history = useHistory();
        return(
            <>
            
                <div className="row topOfNav">
                    <dic className="col-12 writeup">
                        <h3>Discover the events you are interested in...</h3>
                    </dic>
                </div>
            
            <Navbar color="dark" dark expand="md">
                <div className="container navHeight">
                    <NavbarBrand href="/">EventUp</NavbarBrand>
                    <NavbarToggler onClick={toggleNav}  />
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/users/events/create">
                                    <span> Create Event</span>
                                </NavLink>
                            </NavItem>
                            {isAuth() ? 
                               <>
                               <NavItem>
                                    <NavLink className="nav-link" to="/users/dashboard">
                                        <span> Dashboard</span>
                                    </NavLink>
                                </NavItem>
                                <Button
                                    onClick={() => {
                                        signout(() => {
                                            history.push("/");
                                        });
                                    }}            
                                >
                                    Sign Out
                                </Button>
                                </>
                                :
                                <>
                                <NavItem>
                                    <NavLink className="nav-link" to="/users/login">
                                        <span> Log in</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/users/register">
                                        <span> Sign up</span>
                                    </NavLink>
                                </NavItem>
                                </>
                            }
                            
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            </>
        )
    
}

export default Header