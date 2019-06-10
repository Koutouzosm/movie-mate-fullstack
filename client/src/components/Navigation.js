import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from 'reactstrap';

const Navigation = props => {
  const [isOpen, toggle] = useState(false);

  return (
    <div>
      <Navbar color="faded" expand="md" dark>
        <NavbarBrand href="" className="mr-auto">
          Movie-Mate
        </NavbarBrand>
        <NavbarToggler onClick={() => toggle(!isOpen)} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            {/* <a className="nav-link" href="http://localhost:3001/auth/google">
                Login
              </a> */}
              {/* <NavLink className="nav-link" to="/search">
                Home
              </NavLink> */}
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/search">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/saved">
                Saved
              </NavLink>
            </NavItem>
            <NavItem>
              <a className="nav-link" href="http://localhost:3001/auth/logout">
                Logout
              </a>
            </NavItem>
            {props.search && (
            <NavItem>
              {' '}
              <InputGroup>
                <Input
                  name="searchTerm"
                  value={props.searchTerm}
                  onChange={props.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button disabled={props.searchTerm === '' || props.searchTerm === "Rush Hour".toLowerCase()} color="success" onClick={props.mainSearch}>
                    Search
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
            )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;

