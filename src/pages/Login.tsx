import Base from "../component/Base.tsx";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './Forms.css';
function Login() {
    return(
        <Base>
            <Container>
                <Row className={'mt-3'}>
                    <Col sm={{size:6,offset:3}}>
                        <Card className={'custom-card'} outline>
                            <CardHeader className={'custom-card-header'}>
                                Login
                            </CardHeader >
                            <CardBody >
                                <Form>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type={'email'} id={"email"}></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password" >Password</Label>
                                        <Input type={'password'} id={'password'}></Input>
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