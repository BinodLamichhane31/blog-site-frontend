import React, { useState } from "react";
import { useQuery } from "react-query";
import { deletePostService, loadAllPosts } from "../services/post_service";
import { Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import Blog from "./Blog";
import { toast } from "react-toastify";
import _ from "lodash";
import './blog.css';
import Category from "./Category";

function BlogsFeed() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchPosts = async (page, categoryId, query) => {
        return loadAllPosts(page, 12, categoryId, query.toLowerCase());
    };

    const { data: postContent, isLoading, isError, refetch } = useQuery(
        ["posts", currentPage, selectedCategory, searchQuery],
        () => fetchPosts(currentPage, selectedCategory, searchQuery),
        { keepPreviousData: true, staleTime: 5000 }
    );

    const handleSearch = _.debounce((event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(0);
    }, 300);

    function deletePost(post) {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            deletePostService(post.postId)
                .then((res) => {
                    toast.success("Post deleted.");
                    refetch();
                })
                .catch((error) => {
                    toast.error("Post deletion failure.");
                });
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage < 0 || newPage >= (postContent?.totalPages || 1)) {
            return;
        }
        setCurrentPage(newPage);
    };

    return (
        <div className='container-fluid mt-5'>
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <div>
                        <h5>Total blogs: {postContent ? postContent.totalElements : 'Loading...'}</h5>
                        <Input type={'search'} placeholder={"Enter here to search"} onChange={handleSearch} />
                    </div>
                    <div className={'mt-3'}>
                        <Category onCategorySelect={(categoryId) => {
                            setCurrentPage(0);
                            setSelectedCategory(categoryId);
                        }} />
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : isError ? (
                            <p>Error loading posts.</p>
                        ) : postContent.content.length > 0 ? (
                            postContent.content.map((post) => (
                                <Blog key={post.postId} post={post} deletePost={deletePost} />
                            ))
                        ) : (
                            <p className={'mt-5'}>No posts available in this category.</p>
                        )}
                    </div>
                    {postContent && postContent.content.length > 0 && (
                        <Container className="mt-3 d-flex justify-content-center">
                            <Pagination>
                                <PaginationItem
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 0}>
                                    <PaginationLink previous>
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>

                                {[...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem
                                        onClick={() => handlePageChange(index)}
                                        active={index === currentPage}
                                        key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= (postContent?.totalPages || 1) - 1}>
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
