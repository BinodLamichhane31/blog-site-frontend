import Base from "../component/Base.tsx";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './Forms.css';
import {useState} from "react";
import {toast} from "react-toastify";
import {loginUser} from "../services/user_service.tsx";
import {doLogin} from "../auth";
import {useNavigate} from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    const [loginDetail,setLoginDetail] = useState({
        username:'',
        password:''
    })

    const handleChange= (event,field)=>{
        setLoginDetail({...loginDetail,[field]:event.target.value})
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault()
        console.log(loginDetail)

        if(loginDetail.username.trim()==''||loginDetail.password.trim()==""){
            toast.error("Enter email/password.")
            return;
        }

        loginUser(loginDetail).then((data)=>{
            console.log(data)
            doLogin(data,()=>{
                console.log("Login detail is saved to local storage")
                navigate("/user/dashboard")

            })
            toast.success("Login successful")
        }).catch(error=>{
            console.log(error)
            if(error.response.status==500){
                toast.error(error.response.data)
            }
            else {
                toast.error("Something went wrong on server.")

            }
        })




    }


    return(
        <Base>
            <Container className={'align-items-center justify-content-center'} style={{height:"570px"}}>
                <Row className={'mt-4'}>
                    <Col sm={{size:6,offset:3}}>
                        <Card className={'custom-card'} outline>
                            <CardHeader className={'custom-card-header'}>
                                Login
                            </CardHeader >
                            <CardBody >
                                <Form onSubmit={handleFormSubmit}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type={'text'}
                                               id={"email"}
                                               value={loginDetail.username}
                                               onChange={(e)=>handleChange(e,'username')}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password" >Password</Label>
                                        <Input type={'password'}
                                               id={'password'}
                                               value={loginDetail.password}
                                               onChange={(e)=>handleChange(e,'password')}
                                        />
                                    </FormGroup>
                                    <Container className={'text-center'}>
                                        <Button className={'custom-button'} outline>Login</Button>
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

export default Login