import React, {useEffect, useState} from "react";
import Base from "./Base.tsx";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row
} from "reactstrap";
import {toast} from "react-toastify";
import Blog from "./Blog.tsx";
import {getCurrentUserDetails} from "../auth";
import {deletePost, deletePostService, loadPostsByUser} from "../services/post_service.tsx";
import {parse} from "@fortawesome/fontawesome-svg-core";
const MyBlogs =()=>{
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        changePage(currentPage, selectedCategory);
    }, [currentPage, selectedCategory]);

    const changePage = (pageNumber = 0, categoryId = null, pageSize = 12) => {

        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return;
        }
        loadPostData(pageNumber,pageSize)

    };
    function loadPostData(pageNumber,pageSize){
        loadPostsByUser(getCurrentUserDetails()?.id,pageNumber, pageSize).then((data) => {
            setPostContent(data);
            window.scroll(0, 0);
        }).catch((error) => {
            toast.error("Error loading blogs.");
        });
    }

    function deletePost(post) {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            deletePostService(post.postId)
                .then((res) => {
                    console.log(res);
                    toast.success("Post deleted.");
                    // changePage(currentPage, selectedCategory);
                    setPostContent(prevState => ({
                        ...prevState,
                        content: prevState.content.filter(p => p.postId !== post.postId)
                    }));
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Post deletion failure.");
                });
        }
    }


    return(
                <Card className={'mb-5 shadow'}>
                    <CardHeader className={"custom-card-header"}>
                        <h3>My Blogs</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col >
                                <div>
                                    <h5 className={'text-center'}>Total blogs: {postContent ? postContent.totalElements : 'Loading...'}</h5>
                                    {/*<Input type={'search'} placeholder={"Enter here to search"}/>*/}
                                </div>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {postContent.content.length > 0 ? (
                                        postContent.content.map((post,index) => (
                                            <Blog key={index} post={post} deletePost={deletePost}/>
                                        ))
                                    ) : (
                                        <p className={'mt-3'}>No posts available.</p>
                                    )}
                                </div>
                                {postContent.content.length > 0 && (
                                    <Container className="mt-3 d-flex justify-content-center">
                                        <Pagination>
                                            <PaginationItem
                                                onClick={() => changePage(postContent.pageNumber - 1, selectedCategory)}
                                                disabled={postContent.pageNumber === 0}>
                                                <PaginationLink previous>
                                                    Previous
                                                </PaginationLink>
                                            </PaginationItem>

                                            {[...Array(postContent.totalPages)].map((item, index) => (
                                                <PaginationItem onClick={() => changePage(index, selectedCategory)}
                                                                active={index === postContent.pageNumber}
                                                                key={index}>
                                                    <PaginationLink>
                                                        {index + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem
                                                onClick={() => changePage(postContent.pageNumber + 1, selectedCategory)}
                                                disabled={postContent.lastPage}>
                                                <PaginationLink next>
                                                    Next
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </Container>
                                )}
                            </Col>
                        </Row>

                    </CardBody>
                </Card>

    )
}
export default MyBlogs