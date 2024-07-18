import App from "../App.tsx";
import CustomNavBar from "./CustomNavBar.tsx";

const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div className="container-fluid p-0 m-0">
            <CustomNavBar/>
            {children}
            <footer className="text-white mt-5 py-4" style={{ backgroundColor: '#81d8d0'}}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>About Us</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Social Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Instagram</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact Us</h5>
                            <ul className="list-unstyled">
                                <li>Email: contact@example.com</li>
                                <li>Phone: +1234567890</li>
                                <li>Address: 123 Street, City, Country</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Base;
