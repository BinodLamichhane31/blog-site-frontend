import React, { useState, useEffect } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { doLogOut, getCurrentUserDetails, isLoggedIn } from "../auth";
import { toast } from "react-toastify";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";

function CustomNavBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const toggleLoginModal = () => setLoginModal(!loginModal);
    const toggleSignupModal = () => setSignupModal(!signupModal);

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetails());
    }, [login]);

    function logout() {
        const confirmDelete = window.confirm("Are you sure you want to logout?");
        if (confirmDelete) {
            doLogOut(() => {
                setLogin(false);
                navigate("/");
            });
            toast('Logged out.');
        }
    }

    return (
        <div>
            <Navbar style={{ backgroundColor: '#81d8d0' }} expand={"md"} className={"px-4 ps-3 shadow rounded-bottom-4"} fixed="top">
                <NavbarBrand tag={ReactLink} to="/">
                    <img
                        alt="logo"
                        src="/logo.png"
                        style={{ height: 40, width: 60 }}
                    />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/home">Blogs</NavLink>
                        </NavItem>
                        {login && (
                            <>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/user/dashboard">
                                        Create
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav navbar>
                        {login && (
                            <>
                                <NavLink className={'text-muted'} tag={ReactLink} to="/user/profile">
                                    {user.name}
                                </NavLink>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img
                                            src={user?.profilePicture || '/default-profile.png'}
                                            alt="Profile"
                                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
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
                                        <DropdownItem divider />
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
                        )}
                        {!login && (
                            <>
                                <NavItem>
                                    <Button className={'btn-col rounded-4 me-2 mb-1'} onClick={toggleLoginModal}>
                                        Login
                                    </Button>
                                </NavItem>
                                <NavItem>
                                    <Button className={'btn-col-1 shadow-lg rounded-4'} onClick={toggleSignupModal}>
                                        Signup
                                    </Button>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
            <Modal centered={true} isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader className={'custom-card-header'} toggle={toggleLoginModal}>Login</ModalHeader>
                <ModalBody>
                    <Login closeModal={toggleLoginModal} />
                </ModalBody>
            </Modal>
            <Modal centered={true} isOpen={signupModal} toggle={toggleSignupModal}>
                <ModalHeader className={'custom-card-header'} toggle={toggleSignupModal}>Create an Account</ModalHeader>
                <ModalBody>
                    <Signup closeModal={toggleSignupModal} />
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CustomNavBar;
