import React, { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post_service.tsx";
import { Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import Blog from "./Blog.tsx";
import { toast } from "react-toastify";
import './blog.css';
import Category from "./Category.tsx";

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

        loadAllPosts(pageNumber, pageSize, categoryId).then((data) => {
            setPostContent(data);
            window.scroll(0, 0);
        }).catch((error) => {
            toast.error("Error loading blogs.");
        });
    };

    return (
        <div className='container-fluid'>
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <div>
                        <h5>Total blogs: {postContent ? postContent.totalElements : 'Loading...'}</h5>
                        <Input type={'search'} placeholder={"Enter here to search"} />
                    </div>
                    <div className={'mt-3'}>
                        <Category onCategorySelect={(categoryId) => {
                            console.log('Category selected in BlogsFeed:', categoryId);  // Log the category ID selected
                            setCurrentPage(0);
                            setSelectedCategory(categoryId);
                        }} />
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {postContent.content.length > 0 ? (
                            postContent.content.map((post) => (
                                <Blog key={post.postId} post={post} />
                            ))
                        ) : (
                            <p className={'mt-5'}>No posts available in this category.</p>
                        )}
                    </div>
                    {postContent.content.length > 0 && (
                        <Container className="mt-3 d-flex justify-content-center">
                            <Pagination>
                                <PaginationItem onClick={() => changePage(postContent.pageNumber - 1, selectedCategory)} disabled={postContent.pageNumber === 0}>
                                    <PaginationLink previous>
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>

                                {[...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index, selectedCategory)} active={index === postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem onClick={() => changePage(postContent.pageNumber + 1, selectedCategory)} disabled={postContent.lastPage}>
                                    <PaginationLink next>
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </Container>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default BlogsFeed;
