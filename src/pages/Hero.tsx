import Base from "../component/Base.tsx";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import './Forms.css';

function Hero() {
    return (
        <Base>
            <div className={'hero-section'}>
                <div className={'text-center'}>
                    <h1>Welcome to Blog31</h1>
                    <p>Discover and share amazing stories with the world.</p>
                    <div className={'button-group'}>
                        <Button className="custom-button-landing" outline tag={Link} to={'/home'}>
                            Explore
                        </Button>
                        <Button className="landing-button" tag={Link} to={'/user/dashboard'}>
                            Create
                        </Button>
                    </div>
                </div>
                <div className={'images-container'}>
                    <div className={'image-item'}>
                        <div className={'circle'}></div>
                        <img src={'hero1.jpg'} alt={''} />
                    </div>
                    <div className={'image-item'}>
                        <img src={'/hero2.webp'} alt={''} />
                        <div className={'cylinder'} style={{ backgroundColor: '#81d8d0' }}></div> {/* Tiffany blue */}
                    </div>
                    <div className={'image-item'}>
                        <div className={'cylinder'} style={{ backgroundColor: '#a0d6b4' }}></div> {/* Light greenish Tiffany shade */}
                        <img src={'hero3.webp'} alt={''} />
                        <img src={'hero4.jpeg'} alt={''} />
                    </div>
                    <div className={'image-item'}>
                        <img src={'hero5.jpg'} alt={''} />
                        <div className={'cylinder'} style={{ backgroundColor: '#b2e7e8' }}></div> {/* Light cyan Tiffany shade */}
                    </div>
                    <div className={'image-item'}>
                        <img src={'hero1.jpg'} alt={''} />
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default Hero;
