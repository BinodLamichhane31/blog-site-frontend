import {Button, Card, CardBody, CardHeader, Container, Form, Input, Label} from "reactstrap";
import {loadAllCategories} from "../services/category_service.tsx";
import {useEffect, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {createPost as doCreatePost, uploadImage} from "../services/post_service.tsx";
import {getCurrentUserDetails} from "../auth";
import {toast} from "react-toastify";



const AddBlog = ()=>{
    const editor = useRef(null)
    const [post,setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    })
    const [image,setImage] = useState(null)


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

        if (!image) {
            toast.error("Please select an image.")
            return;
        }
        if(post.categoryId.trim()==''){
            toast.error("Select the catagory.")
            return;
        }
        post['userId'] = user.id
        doCreatePost(post).then((data)=>{
            uploadImage(image,data.postId).then(data=>{
                toast.success("Post created successfully.")
                setPost({
                    title: '',
                    content: '',
                    categoryId: ''
                })
                setImage(null)
            }).catch(error=>{
                toast.error("Error uploading image.")
                console.log(error)
            })
        }).catch((error)=>{
            toast.error("Error creating post.")
            console.log(error)

        })

    }
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setImage(file)
        } else {
            toast.error("Please select a valid image file (png, jpg, jpeg).")
        }

    }
    const resetFormFields = () => {
        setPost({
            title: '',
            content: '',
            categoryId: ''
        })
        setImage(null)
    }

    return(
        <div className='wrapper mt-5'>
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
                        <div  className={'my-3'}>
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
                            <div className={'mt-3'}>
                                <Label for={'image'}>Select Post Banner</Label>
                                <Input id={'image'} type={'file'} onChange={handleFileChange}/>
                            </div>
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