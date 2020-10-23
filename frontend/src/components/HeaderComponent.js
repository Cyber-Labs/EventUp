import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
} from "reactstrap";
import { useAppState } from "../state/state.js";
import { NavLink } from "react-router-dom";
import { isAuth } from "./shared/helpers";
import { useHistory } from "react-router-dom";
import { signout } from "./shared/helpers";

const Header = ({ isLoggedOut }) => {
  const [loggedout, setloggedout] = useState(localStorage.getItem("user"));

  const [isNavOpen, setIsNavOpen] = useState(false);
  const { getUser } = useAppState();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSignout = () => {
    signout(() => {
      history.push("/");
    });
    setloggedout(null);
  };

  const history = useHistory();
  return (
    <React.Fragment>
      <div className="row topOfNav">
        <div className="col-12 writeup">
          <h3>Discover the events you are interested in...</h3>
        </div>
      </div>
      <Navbar color="dark" dark expand="md">
        <div className="container navHeight">
          <NavbarBrand href="/">EventUp</NavbarBrand>
          <NavbarToggler onClick={toggleNav} />
          <Collapse isOpen={isNavOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/users/events/create">
                  <span> Create Event</span>
                </NavLink>
              </NavItem>
              {isAuth() ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink className="nav-link" to="/users/dashboard">
                      <span> Dashboard</span>
                    </NavLink>
                  </NavItem>
                  {console.log(getUser())}
                  {getUser && loggedout && (
                    <Button
                      onClick={() => {
                        handleSignout();
                      }}
                    >
                      Sign Out
                    </Button>
                  )}
                </React.Fragment>
              ) : (
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
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </React.Fragment>
  );
};
export default Header;
