import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/helper.tsx";
import './blog.css';
import { getCurrentUserDetails, isLoggedIn } from "../auth";
import { toast } from "react-toastify";

function Blog({ post = { id: -1, title: "Default title", content: "Default content" }, deletePost }) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        setUser(getCurrentUserDetails());
    }, []);

    return (
        <Card className="border-0 shadow-sm mt-4 blog-component" style={{ background: "rgba(200,251,247,0.59)" }}>
            <CardBody className="card-body">
                <div>
                    <h6>{post.title}</h6>
                    <div className="image-container mt-2">
                        <img className="blog-image" src={BASE_URL + "/post/image/" + post.imageName} alt="" />
                    </div>
                </div>
                <div className="text-center mt-2">
                    {
                        <Link className="btn custom-button" to={"/post/" + post.postId}>Read Full Blog</Link>

                    }
                    {
                        isLoggedIn() && (user && user.id === post.user.id ?
                            <Button className={'ms-3'} color={'danger'} outline
                                    onClick={() => deletePost(post)}>
                                <img
                                    src={'/delete.png'}
                                    style={{width: '16px', height: '20px'}}
                                />
                            </Button>
                            : "")
                    }
                    {
                        isLoggedIn() && (user && user.id === post.user.id ?
                            <Button className={'ms-3'} color={'warning'} outline
                                    tag={Link} to={`/user/update-blog/${post.postId}`}
                                    >
                                <img
                                    src={'/edit.png'}
                                    style={{width: '16px', height: '20px'}}
                                />
                            </Button>
                            : "")
                    }
                </div>
            </CardBody>
        </Card>
    );
}

export default Blog;
