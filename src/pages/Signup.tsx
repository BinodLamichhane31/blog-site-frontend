import Base from "../component/Base.tsx";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import {useEffect, useState} from "react";
import '../App.css';
import {signUp} from "../services/user_service.tsx";
import {toast} from "react-toastify";

function Signup() {
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        about:''
    })

    const [error,setError] = useState({
        errors:{},
        isError:false
    })

    const handleChange= (event,property)=>{
        setData({...data,[property]:event.target.value})
    }

    const submitForm =(event)=>{
        event.preventDefault()

        console.log(data)
        signUp(data).then((response)=>{
            console.log(response)
            console.log("success log")
            toast.success("Registration Successful!!")
            setData({
                name:'',
                email:'',
                password:'',
                about:''
            })
        }).catch((error)=>{
            console.log(error)
            console.log("Error Log");
            setError({
                errors: error,
                isError: true
            })
        });
    };
    return(
        <Base>
            <Container className={'mb-5'}>
                <Row className={'mt-5'}>
                    <Col sm={{size:6,offset:3}}>
                        <Card className="custom-card" >
                            <CardHeader className={'custom-card-header'}
                                        >
                                Fill information to register!!
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Full Name</Label>
                                        <Input type={'text'}
                                               id={'fullName'}
                                               onChange={(e)=>handleChange(e,"name")}
                                               value={data.name}
                                               invalid={error.errors?.response?.data?.name ?true:false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type={'text'} id={"email"}
                                               onChange={(e)=>handleChange(e,'email')}
                                               value={data.email}
                                               invalid={error.errors?.response?.data?.email ?true:false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password" >Password</Label>
                                        <Input type={'password'} id={'password'}
                                               onChange={(e)=>handleChange(e,'password')}
                                               value={data.password}
                                               invalid={error.errors?.response?.data?.password ?true:false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.password}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="about" >About</Label>
                                        <Input type={'textarea'} id={'about'}
                                               style={{height:"150px"}}
                                               onChange={(e)=>handleChange(e,'about')}
                                               value={data.about}
                                               invalid={error.errors?.response?.data?.about ?true:false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.about}
                                        </FormFeedback>
                                    </FormGroup>
                                    <Container className={'text-center'}>
                                        <Button className="custom-button" outline>Sign Up</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>

    )

}

export default Signup