import {Button, Card, CardBody, CardHeader, Container, Form, Input, Label} from "reactstrap";
import {loadAllCategories} from "../services/category_service.tsx";
import {useEffect, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {createPost as doCreatePost} from "../services/post_service.tsx";
import {getCurrentUserDetails} from "../auth";
import {toast} from "react-toastify";


const AddBlog = ()=>{
    const editor = useRef(null)
    const [post,setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    })
    
    const [user,setUser] = useState(undefined)
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

    const fieldChanged = (event)=>{
        setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChanged = (data)=>{
        setPost({...post,'content':data})
    }

    const createPost =(event)=>{
        event.preventDefault()
        if(post.title.trim()==''){
            toast.error("Title is required.")
            return;
        }
        if(post.content.trim()==''){
            toast.error("Content is required.")
            return;
        }
        if(post.categoryId.trim()==''){
            toast.error("Select the catagory.")
            return;
        }
        post['userId'] = user.id
        doCreatePost(post).then((data)=>{
            toast.success("Post created.")
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch((error)=>{
            toast.error("Error creating post.")
        })

    }

    return(
        <div className='wrapper mt-3'>
            <Card className={'shadow'}>
                <CardHeader className={"custom-card-header"}><h3>What's on your mind?</h3>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={createPost}>
                        <div className={'my-3'}>
                            <Label for={'title'}>Title</Label>
                            <Input type={'text'} id={'title'}
                                   placeholder={'Enter here'}
                                   name={'title'}
                                   onChange={fieldChanged}

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
                                onChange={contentFieldChanged}
                            />
                        </div>
                        <div className={'my-3'}>
                            <Label for={'category'}>Category</Label>
                            <Input type={'select'} id={'category'}
                                   placeholder={'Enter here'}
                                   name={'categoryId'}
                                   onChange={fieldChanged}
                            >

                                <option disabled>--Select Category--</option>
                                {
                                    categories.map((category)=>(
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }

                            </Input>
                        </div>
                        <Container className={'text-center'}>
                            <Button type="submit" className={'custom-button'} outline>Post</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}
export default AddBlog