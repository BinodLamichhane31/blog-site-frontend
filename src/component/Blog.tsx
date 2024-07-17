import {Button, Card, CardBody, CardText} from "reactstrap";

function Blog({post={title:"Default title",content:"Default content"}}) {
    return(
        <Card className={'border-0 shadow-sm mt-3'}>
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,50)+"..."}}>
                </CardText>
                <div>
                    <Button className={'custom-button'} outline>Read More</Button>
                </div>
            </CardBody>
        </Card>
    )

}
export default Blog