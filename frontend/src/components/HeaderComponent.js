
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { isAuth } from './shared/helpers';
import { useHistory } from 'react-router-dom';
import { signout } from './shared/helpers';

const Header = (props) => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSignout = () => {
    signout(() => {
      history.push('/');
    });
  };

  const history = useHistory();
  return (
    <React.Fragment>
      <Navbar className='color-nav' light expand='md'>
        <div className='container navHeight'>
          <NavbarBrand href='/'>EventUp</NavbarBrand>
          <NavbarToggler onClick={toggleNav} />
          <Collapse isOpen={isNavOpen} navbar>
            <Nav className='ml-auto' navbar>
              {isAuth() ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink className='nav-link' to='/users/dashboard'>
                      <span> Dashboard</span>
                    </NavLink>
                  </NavItem>
                    <NavLink
                      className='nav-link'
                      to='/'
                      onClick={() => {
                        handleSignout();
                      }}
                    >
                      Sign Out
                    </NavLink>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink className='nav-link' to='/users/login'>
                      <span> Log in</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='nav-link' to='/users/register'>
                      <span> Sign up</span>
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </React.Fragment>
  );
};
export default Header;

