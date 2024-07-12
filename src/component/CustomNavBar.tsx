import React, { useState } from 'react';
import {NavLink as ReactLink} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';

function CustomNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar  style={{ backgroundColor: '#0ABAB5' }}
            expand={"md"}>
                <NavbarBrand tag={ReactLink} to="/">BlogEcho</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag = {ReactLink} to="/login">
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag = {ReactLink} to="/signup">
                                Signup
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag = {ReactLink} to="/about">
                                About
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to={"/services"}>Services</DropdownItem>
                                <DropdownItem>Contact Us</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavBar;