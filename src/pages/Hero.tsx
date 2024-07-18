import Base from "../component/Base.tsx";
import {Button, Container} from "reactstrap";

function Hero() {


    return(
        <Base>
            <div className="landing-page">
                <Container className="text-center mt-3">
                    <h1 className="landing-title">Welcome to Blog31</h1>
                    <p className="landing-subtitle">Discover and share amazing stories with the world.</p>
                    <div className="button-group">
                        <Button color="primary" className="landing-button">Create Post</Button>
                        <Button color="secondary" className="landing-button">Explore Posts</Button>
                    </div>
                </Container>
            </div>
        </Base>

    )

}

export default Hero