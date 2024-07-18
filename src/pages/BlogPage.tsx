import Base from "../component/Base.tsx";
import {Link, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardText, Col, Container, Input, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {createComment, loadPost} from "../services/post_service.tsx";
import {toast} from "react-toastify";
import {BASE_URL} from "../services/helper.tsx";
import {isLoggedIn} from "../auth";

const BlogPage = ()=>{
    const {postId}=useParams()
    const [post,setPost]=useState(null)
    const [comment,setComment] = useState({
        content:''
    })
    useEffect(()=>{
        loadPost(postId).then(data=>{
            console.log(data)
            setPost(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Error loading post")
        })
    },[])

    const printDate = (numbers) => {
        const date = new Date(numbers);
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const submitComment=()=>{
        if(!isLoggedIn()){
            toast.error("You need to login first.")
            return;
        }
        if(comment.content.trim()==""){
            toast.warning("You cannot add blank comment.")
            return
        }
        createComment(comment,post.postId).then(data=>{
            toast.success("Comment posted.")
            setPost({
                ...post,
                comments: [...post.comments, data]
            });
            setComment({ content: '' });
        }).catch(error=>{
            console.log(error)
            toast.error("Error submitting comment.")
        })
    }

    return(
        <Base>
            <Container className={'mt-4'}>
                <Link to={'/home'}>Blogs</Link> / {post && (<Link to={""}>{post.title}</Link>)}
                <Row>
                    <Col md={{size:12}}>
                        <Card className={'mt-3 ps-2 shadow-sm'}>
                            {
                                (post) &&(
                                    <CardBody>
                                        <CardText>Posted By <b>{post.user.name}</b> on <b>{printDate(post.createdDate)}</b></CardText>
                                        <CardText className={'mt-3'}>
                                            <span className={'text-muted'}>{post.category.categoryTitle}</span>
                                        </CardText>

                                        <div className={'divider'} style={{width:'100%',height:'1px',background:'#e2e2e2'}}></div>

                                        <CardText className={'mt-3'}>
                                            <h1>{post.title}</h1>
                                        </CardText>
                                        <div className={'image-container mt-4 border-0'} style={{maxWidth:'100%'}}>
                                            <img className={'img-fluid'} src={BASE_URL+"/post/image/"+post.imageName} alt={""}/>
                                        </div>
                                        <CardText className={'mt-4'} dangerouslySetInnerHTML={{__html:post.content}}>

                                        </CardText>



                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>

                <Row className={'mt-2'}>
                    <Col>
                        <Card className={'shadow-sm'}>
                            <CardBody>
                                <h5 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    Comments ({post ? post.comments.length : 0})
                                </h5>

                                <div className="comment-section">
                                    <Input
                                        type={'textarea'}
                                        className="mt-2 comment-input m-2"
                                        placeholder="Add a comment for this blog"
                                        style={{height: '38px'}}
                                        value={comment.content}
                                        onChange={(event)=>setComment({content:event.target.value})}
                                    />
                                    <Button onClick={submitComment}
                                        className="custom-button" outline>Post</Button>
                                </div>
                                <div className={'divider'}
                                     style={{width: '100%', height: '1px', background: '#e2e2e2'}}></div>
                                {post?.comments && post.comments.map((comment: any, index: number) => (
                                    <Card key={index} className={'border-0'}>
                                        <CardBody>
                                            <div className="d-flex justify-content-between">
                                                <h6>{comment.userName}</h6><span className={'text-muted'}>{printDate(comment.date)}</span>
                                            </div>
                                            <CardText>
                                                <p>{comment.content}</p>
                                            </CardText>
                                        </CardBody>
                                        <div className={'divider'}
                                             style={{
                                                 width: '100%',
                                                 height: '0.5px',
                                                 background: '#e2e2e2'
                                             }}></div>
                                    </Card>


                                ))}
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Base>
    )
}
export default BlogPage