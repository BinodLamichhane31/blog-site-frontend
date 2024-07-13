import React from "react";
import Base from "../../component/Base.tsx";
import AddBlog from "../../component/AddBlog.tsx";
import {Container} from "reactstrap";
const Dashboard =()=>{
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