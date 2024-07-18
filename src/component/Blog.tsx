import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/helper.tsx";

function Blog({ post = { title: "Default title", content: "Default content" } }) {
    return (
        <Card className="border-0 shadow-sm mt-4" style={{background:"rgba(200,251,247,0.59)"}}>
            <CardBody>
                <h6>{post.title}</h6>
                <div className="image-container mt-2">
                    <img className="img-fluid" src={BASE_URL + "/post/image/" + post.imageName} alt="" />
                </div>
                <div className="text-center mt-2">
                    <Link className="btn custom-button" to={"/post/" + post.postId}>Click Here to Read</Link>
                </div>
            </CardBody>
        </Card>
    );
}

export default Blog;
