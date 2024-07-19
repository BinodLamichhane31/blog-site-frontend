import React, {useEffect, useState} from "react";
import Base from "../../component/Base.tsx";
import AddBlog from "../../component/AddBlog.tsx";
import {Container} from "reactstrap";
import {getCurrentUserDetails} from "../../auth";
const Dashboard =()=>{
    const [user,serUser] = useState([])
    useEffect(()=>{
        console.log(getCurrentUserDetails())
        serUser(getCurrentUserDetails())
    },[])
    return(
        <Base>
            <Container>
                <AddBlog>
                </AddBlog>
            </Container>
        </Base>
    )
}
export default Dashboard