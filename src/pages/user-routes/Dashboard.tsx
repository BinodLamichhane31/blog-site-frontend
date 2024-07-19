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
import MyBlogs from "../../component/MyBlogs.tsx";
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

        loadPostsByUser(getCurrentUserDetails()?.id,pageNumber, pageSize).then((data) => {
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
                <MyBlogs/>

            </Container>
        </Base>
    )
}
export default Dashboard