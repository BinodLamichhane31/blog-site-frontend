import {Button, Card, CardBody, CardHeader, Container, Form, Input, Label} from "reactstrap";
import {loadAllCategories} from "../services/category_service.tsx";
import {useEffect, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {c} from "vite/dist/node/types.d-aGj9QkWt";


const AddBlog = ()=>{
    const editor = useRef(null)
    const [content, setContent] = useState("")
    const config = {
        placeholder:"Start typing..."
    }
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadAllCategories()
            .then((response) => {
                setCategories(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return(
        <div className='wrapper mt-3'>
            <Card className={'shadow'}>
                <CardHeader className={"custom-card-header"}><h3>What's on your mind?</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                        <div className={'my-3'}>
                            <Label for={'title'}>Title</Label>
                            <Input type={'text'} id={'title'}
                                   placeholder={'Enter here'}/>
                        </div>
                        <div className={'my-3'}>
                            <Label for={'content'}>Content</Label>
                            {/*<Input type={'textarea'} id={'content'}*/}
                            {/*       placeholder={'Enter here'}*/}
                            {/*style={{height:'300px'}}*/}
                            {/*/>*/}
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onChange={newContent=>{setContent(newContent)}}
                            />
                        </div>
                        <div className={'my-3'}>
                            <Label for={'category'}>Category</Label>
                            <Input type={'select'} id={'category'}
                                   placeholder={'Enter here'}
                            >
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
                            <Button className={'custom-button'} outline>Post</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}
export default AddBlog