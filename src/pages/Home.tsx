import Base from "../component/Base.tsx";
import BlogsFeed from "../component/BlogsFeed.tsx";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import Category from "../component/Category.tsx";

function Home() {


    return(
        <Base>
            <Container className={'mt-3'}>
                <BlogsFeed/>
            </Container>
        </Base>

    )

}

export default Home