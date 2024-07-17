import React, {useEffect, useState} from "react";
import { loadAllPosts } from "../services/post_service.tsx";
import {Col, Container, Pagination, PaginationItem, PaginationLink, Row} from "reactstrap";
import Blog from "./Blog.tsx";
import {toast} from "react-toastify";

function BlogsFeed() {

    const [postContent, setPostContent] = useState(
        { content: [],
            totalPages: '',
            totalElements: '',
            pageSize: '',
            lastPage: false,
            pageNumber: ''
        });
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        changePage(currentPage)
    }, [currentPage]);

    const changePage = (pageNumber=0,pageSize=5) => {

        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
            return;
        }

        loadAllPosts(pageNumber,pageSize).then((data) => {
            setPostContent(data)
            window.scroll(0,0)
        }).catch((error) => {
            toast.error("Error loading blogs.");
        });
    }

    return (
        <div className={'container-fluid'}>
            <Row>
                <Col md={{size:10,offset:1}}>
                    <h1>Blogs Count {postContent ? postContent.totalElements : 'Loading...'}</h1>
                    {
                        postContent.content.map((post)=>(
                            <Blog key={post.postId} post={post} />
                        ))
                    }
                    {<Container className='mt-3'>
                        <Pagination >
                            <PaginationItem onClick={() => changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => (


                                    <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                        <PaginationLink>

                                            {index + 1}

                                        </PaginationLink>
                                    </PaginationItem>

                                ))
                            }


                            <PaginationItem onClick={() => changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>

                    </Container>}

                </Col>
            </Row>

        </div>

    );
}

export default BlogsFeed;
