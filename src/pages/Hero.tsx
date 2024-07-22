import Base from "../component/Base.tsx";
import {Button, Container} from "reactstrap";
import {Link} from "react-router-dom";
import LatestBlogs from "../component/LatestBlogs.tsx";

function Hero() {


    return(
        <Base>
            <div className="landing-page">
                <Container className="text-center mt-3">
                    <h1 className="landing-title">Welcome to Blog31</h1>
                    <p className="landing-subtitle">Discover and share amazing stories with the world.</p>
                    <div className="button-group">
                        <Button  className="custom-button" outline
                                 tag={Link}
                                 to={'/home'}
                        >Explore</Button>
                        <Button className="landing-button"
                                tag={Link}
                                to={'/user/dashboard'}
                        >Create</Button>
                    </div>
                </Container>
            </div>

        </Base>

    )

}

export default Hero