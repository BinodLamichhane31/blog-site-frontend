import React, {useEffect, useState} from 'react';
import {NavLink as ReactLink, useNavigate} from 'react-router-dom'
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
import {doLogOut, getCurrentUserDetails, isLoggedIn} from "../auth";

function CustomNavBar() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    useEffect(()=>{
        setLogin(isLoggedIn())
        setUser(getCurrentUserDetails())

    },[login])

    const logout=()=>{
        doLogOut(()=>{
            setLogin(false)
            navigate("/home")
        })
    }
    return (
        <div>
            <Navbar  style={{ backgroundColor: '#81d8d0'}}
            expand={"md"} className={"px-3 shadow"} fixed="top">
                <NavbarBrand tag={ReactLink} to="/">BlogEcho</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/home">Blogs</NavLink>
                        </NavItem>
                        {
                            login &&(
                                <>
                                    <NavItem>
                                        <NavLink tag = {ReactLink} to="/user/dashboard">
                                            Create
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                        {/*<UncontrolledDropdown nav inNavbar>*/}
                        {/*    <DropdownToggle nav caret>*/}
                        {/*        Options*/}
                        {/*    </DropdownToggle>*/}
                            {/*<DropdownMenu right>*/}
                            {/*    <DropdownItem>Contact Us</DropdownItem>*/}
                            {/*    <DropdownItem divider />*/}
                            {/*    <DropdownItem>Reset</DropdownItem>*/}
                            {/*</DropdownMenu>*/}
                        {/*</UncontrolledDropdown>*/}
                    </Nav>
                    <Nav navbar>
                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag = {ReactLink} to="/user/profile">
                                            Profile
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink onClick={logout}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                        {
                            !login && (
                                <>
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
                                </>
                            )
                        }

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavBar;