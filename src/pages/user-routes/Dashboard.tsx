import React, {useEffect, useState} from "react";
import Base from "../../component/Base.tsx";
import AddBlog from "../../component/AddBlog.tsx";
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
import {getCurrentUserDetails} from "../../auth";
import {loadAllPosts, loadPostsByUser} from "../../services/post_service.tsx";
import {toast} from "react-toastify";
import Category from "../../component/Category.tsx";
import Blog from "../../component/Blog.tsx";
const Dashboard =()=>{
    const [user,setUser] = useState([])
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

        loadPostsByUser(getCurrentUserDetails()?.id,pageNumber, pageSize,categoryId).then((data) => {
            setPostContent(data);
            window.scroll(0, 0);
        }).catch((error) => {
            toast.error("Error loading blogs.");
        });
    };

    return(
        <Base>
            <Container>
                <AddBlog/>
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
                                            postContent.content.map((post) => (
                                                <Blog key={post.postId} post={post}/>
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

            </Container>
        </Base>
    )
}
export default Dashboard