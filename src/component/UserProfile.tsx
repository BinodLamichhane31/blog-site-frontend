import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Label, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import './UserProfile.css';
import { updateUserDetails } from '../services/user_service';

import {doLogin, doReLogin, getCurrentUserDetails} from '../auth';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        about: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = await getCurrentUserDetails(); // Fetch user details
                setUser(userDetails);
                setFormData({
                    name: userDetails.name,
                    email: userDetails.email,
                    about: userDetails.about,
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { ...formData, id: user.id };
            await updateUserDetails(updatedUser);
            // localStorage.setItem("data",JSON.stringify(updatedUser));
            toast.success("Updated Successfully.")

            doReLogin({ ...JSON.parse(localStorage.getItem("data")), user: updatedUser });

            setUser(updatedUser); // Update the user state with fresh details
            setEditMode(false);
        } catch (error) {
            console.error("Error updating user details:", error);
            alert("Failed to update user details. Please try again.");
        }
    };

    return (
        <Card className="mb-5 shadow-sm">
            <CardHeader className="custom-card-header">
                <h3>My Details</h3>
            </CardHeader>
            <CardBody className="d-flex justify-content-center align-items-center">
                <Row className=" mb-4 row-custom">
                    <Col className="col-profile">
                        <img src="/public/default-profile.png" alt="Profile" className="profile-pic mb-3" />
                        <div>
                            <h4>{user.name}</h4>
                            <p className="text-muted">{user.email}</p>
                        </div>
                        <div className="col-about mt-1">
                            <Label for="about">About</Label>
                            <p id="about" className="text-muted">
                                {user.about}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Button className='custom-button' outline onClick={() => setEditMode(!editMode)}>
                    {editMode ? 'Cancel' : 'Edit Profile'}
                </Button>
                {editMode && (
                    <Form onSubmit={handleSubmit} className="mt-4">
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} readOnly />
                        </FormGroup>
                        <FormGroup>
                            <Label for="about">About</Label>
                            <Input type="textarea" name="about" id="about" value={formData.about} onChange={handleChange} />
                        </FormGroup>
                        <div className={'text-center'}>
                            <Button type="submit" className='custom-button' outline>Save Changes</Button>
                        </div>
                    </Form>
                )}
            </CardBody>
        </Card>
    );
}

export default UserProfile;
