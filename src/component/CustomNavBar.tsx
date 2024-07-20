import React, {useEffect, useState} from 'react';
import {NavLink as ReactLink, useNavigate} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,
} from 'reactstrap';
import {doLogOut, getCurrentUserDetails, isLoggedIn} from "../auth";
import {toast} from "react-toastify";

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


    function logout() {
        const confirmDelete = window.confirm("Are you sure you want to logout?");
        if (confirmDelete) {
            doLogOut(()=>{
                setLogin(false)
                navigate("/home")
            })
            window.location.reload()
            toast('Logged out.')
        }
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

                    </Nav>
                    <Nav navbar>
                        {
                            login && (
                                <>
                                    <NavLink className={'text-muted'} tag={ReactLink} to="/user/profile">
                                        {user.name}
                                    </NavLink>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            <img
                                                src={user?.profilePicture || '/default-profile.png'}
                                                alt="Profile"
                                                style={{width: '30px', height: '30px', borderRadius: '50%'}}
                                            />
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavItem>
                                                    <NavLink tag={ReactLink} to="/user/profile">
                                                        Profile
                                                    </NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>
                                                <NavItem>
                                                    <NavLink onClick={logout}>
                                                        Logout
                                                    </NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

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