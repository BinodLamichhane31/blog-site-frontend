import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Container
} from "reactstrap";
import { useState } from "react";
import { signUp, checkEmailExists } from "../services/user_service.tsx";
import { toast } from "react-toastify";
import '../App.css';

function Signup({ closeModal }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    });

    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    const [emailChecked, setEmailChecked] = useState(false);

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    const checkEmail = async () => {
        if (data.email) {
            try {
                const response = await checkEmailExists(data.email);
                if (response.exists) {
                    setError(prev => ({
                        ...prev,
                        errors: { ...prev.errors, email: 'Email is already taken' },
                        isError: true
                    }));
                    setEmailChecked(true);
                } else {
                    setError(prev => ({
                        ...prev,
                        errors: { ...prev.errors, email: '' },
                        isError: false
                    }));
                    setEmailChecked(false);
                }
            } catch (error) {
                console.log(error);
                setError(prev => ({
                    ...prev,
                    errors: { ...prev.errors, email: 'Error checking email' },
                    isError: true
                }));
            }
        }
    };

    const submitForm = async (event) => {
        event.preventDefault();

        if (!emailChecked && data.email) {
            await checkEmail();
        }

        if (error.isError || emailChecked) return;

        signUp(data).then((response) => {
            console.log(response);
            toast.success("Registration Successful!!");
            setData({
                name: '',
                email: '',
                password: '',
                about: ''
            });
            closeModal();
        }).catch((error) => {
            console.log(error);
            setError({
                errors: error.response?.data || {},
                isError: true
            });
        });
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="name">Full Name</Label>
                <Input
                    type="text"
                    id="fullName"
                    className="custom-input shadow-sm"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    invalid={!!error.errors.name}
                />
                <FormFeedback>
                    {error.errors.name}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    type="text"
                    id="email"
                    className="custom-input shadow-sm"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    invalid={!!error.errors.email}
                    onBlur={checkEmail}
                />
                <FormFeedback>
                    {error.errors.email}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    className="custom-input shadow-sm"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    invalid={!!error.errors.password}
                />
                <FormFeedback>
                    {error.errors.password}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="about">About</Label>
                <Input
                    type="textarea"
                    id="about"
                    className="custom-input shadow-sm"
                    style={{ height: "150px" }}
                    onChange={(e) => handleChange(e, "about")}
                    value={data.about}
                    invalid={!!error.errors.about}
                />
                <FormFeedback>
                    {error.errors.about}
                </FormFeedback>
            </FormGroup>
            <Container className="text-center">
                <Button className="custom-button shadow-sm" outline>Sign Up</Button>
            </Container>
        </Form>
    );
}

export default Signup;
