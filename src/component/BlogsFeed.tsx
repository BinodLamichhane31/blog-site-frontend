// BlogsFeed.tsx
import React, { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post_service.tsx";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import Blog from "./Blog.tsx";
import { toast } from "react-toastify";
import './blog.css'; // Import the CSS file

function BlogsFeed() {
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    });
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        changePage(currentPage);
    }, [currentPage]);

    const changePage = (pageNumber = 0, pageSize = 12) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
            return;
        }

        loadAllPosts(pageNumber, pageSize).then((data) => {
            setPostContent(data);
            window.scroll(0, 0);
        }).catch((error) => {
            toast.error("Error loading blogs.");
        });
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col md={{ size: 10, offset:1 }}>
                    <h5>Total blogs: {postContent ? postContent.totalElements : 'Loading...'}</h5>
                        <div className="d-flex flex-wrap justify-content-center">
                            {postContent.content.map((post) => (
                                <Blog post={post} key={post.id}/>
                            ))}
                        </div>
                    <Container className="mt-3 d-flex justify-content-center">
                        <Pagination>
                            <PaginationItem onClick={() => changePage(postContent.pageNumber - 1)} disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {[...Array(postContent.totalPages)].map((item, index) => (
                                <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                    <PaginationLink>
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem onClick={() => changePage(postContent.pageNumber + 1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default BlogsFeed;
