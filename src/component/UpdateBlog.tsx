import React, {useEffect, useRef, useState} from 'react';
import Base from './Base.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import {loadPost, updatePostService} from '../services/post_service.tsx';
import { getCurrentUserDetails } from '../auth';
import { toast } from 'react-toastify';
import {Button, Card, CardBody, CardHeader, Container, Form, Input, Label} from "reactstrap";
import JoditEditor from "jodit-react";
import {loadAllCategories} from "../services/category_service.tsx";

function UpdateBlog() {
    const editor = useRef(null)
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setUser(getCurrentUserDetails())
        loadAllCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const currentUser = getCurrentUserDetails();
        setUser(currentUser);
    }, []);

    useEffect(() => {
        if (postId) {
            loadAllCategories()
                .then((response) => {
                    setCategories(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            loadPost(postId)
                .then(data => {
                    setPost({...data,categoryId:data.category.categoryId});
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Error loading post');
                });
        }
    }, [postId]);

    useEffect(() => {
        if (post && user) {
            if (post.user.id !== user.id) {
                console.log('You do not have access to this URL.');
                toast.warning('You do not have access to this URL.');
                navigate('/home');
            }
        }
    }, [post, user, navigate]);

    const handleChange=(event,fieldName)=>{
        setPost({
            ...post,[fieldName]:event.target.value
        })

    }

    const updatePost=(event)=>{
        event.preventDefault()
        updatePostService({...post,category:{categoryId:post.categoryId}},post.postId)
            .then(response=>{
                console.log(response)
                toast.success("Post updated.")
            })
            .catch(error=>{
                console.log(error)
                toast.error("Error in updating post.")

            })

    }

    const updateHtml=()=>{
        return (
            <div className='wrapper mt-5'>
                <Card className={'shadow'}>
                    <CardHeader className={"custom-card-header"}><h3>Update Post</h3>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={updatePost}>
                            <div className={'my-3'}>
                                <Label for={'title'}>Title</Label>
                                <Input type={'text'} id={'title'}
                                       placeholder={'Enter here'}
                                       name={'title'}
                                       value={post.title}
                                       onChange={(event)=>handleChange(event,'title')}

                                />
                            </div>
                            <div className={'my-3'}>
                                <Label for={'content'}>Content</Label>
                                {/*<Input type={'textarea'} id={'content'}*/}
                                {/*       placeholder={'Enter here'}*/}
                                {/*style={{height:'300px'}}*/}
                                {/*/>*/}
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    onChange={newContent=>setPost({...post,content:newContent})}
                                />
                                <div className={'mt-3'}>
                                    <Label for={'image'}>Select Post Banner</Label>
                                    <Input id={'image'} type={'file'} onChange={""}/>
                                </div>
                            </div>
                            <div className={'my-3'}>
                                <Label for={'category'}>Category</Label>
                                <Input type={'select'} id={'category'}
                                       placeholder={'Enter here'}
                                       name={'categoryId'}
                                       value={post.categoryId}
                                       onChange={(event)=>handleChange(event,'categoryId')}
                                >

                                    <option disabled>--Select Category--</option>
                                    {
                                        categories.map((category) => (
                                            <option value={category.categoryId} key={category.categoryId}>
                                                {category.categoryTitle}
                                            </option>
                                        ))
                                    }

                                </Input>
                            </div>
                            <Container className={'text-center mb-5'}>
                                <Button type="submit" className={'custom-button'} outline>Update</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>

            </div>
        )
    }

    return (
        <Base>
            {post && (
                <Container className={'mb-5'}>
                    {updateHtml()}
                </Container>
            )}
        </Base>
    );
}

export default UpdateBlog;
