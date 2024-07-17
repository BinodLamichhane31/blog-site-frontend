import { Card, CardBody, CardText} from "reactstrap";
import {Link} from "react-router-dom";

function Blog({post={title:"Default title",content:"Default content"}}) {
    return(
        <Card className={'border-0 shadow-sm mt-3'}>
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,50)+"..."}}>
                </CardText>
                <div>
                    <Link className={'btn custom-button'} to={'/post/'+post.postId}>Read More</Link>
                </div>
            </CardBody>
        </Card>
    )

}
export default Blog