import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import '../pages/Forms.css';
import {useState} from "react";
import {toast} from "react-toastify";
import {loginUser} from "../services/user_service.tsx";
import {doLogin} from "../auth";
import {useNavigate} from "react-router-dom";

function Login({ closeModal }) {

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
        if(loginDetail.username.trim()==='' || loginDetail.password.trim() === ""){
            toast.error("Enter email/password.")
            return;
        }

        loginUser(loginDetail).then((data)=>{
            console.log(data)
            doLogin(data,()=>{
                console.log("Login detail is saved to local storage")
                closeModal();
                navigate("/home")
            })
            toast.success("Login successful")
        }).catch(error=>{
            console.log(error)
            if(error.response.status === 500){
                toast.error(error.response.data)
            } else {
                toast.error("Something went wrong on server.")
            }
        })
    }

    return(
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type={'text'}
                       id={"email"}
                       className={'custom-input shadow-sm'}
                       value={loginDetail.username}
                       onChange={(e)=>handleChange(e,'username')}/>
            </FormGroup>
            <FormGroup>
                <Label for="password" >Password</Label>
                <Input type={'password'}
                       id={'password'}
                       className={'bg-transparent custom-input shadow-sm'}
                       value={loginDetail.password}
                       onChange={(e)=>handleChange(e,'password')}
                />
            </FormGroup>
            <Container className={'text-center'}>
                <Button className={'custom-button shadow-sm'} outline>Login</Button>
            </Container>
        </Form>
    )
}

export default Login;
