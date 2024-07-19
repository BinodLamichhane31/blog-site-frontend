import React, { useEffect, useState } from 'react';
import CustomNavBar from './CustomNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { getSocialLinks, getContactDetails } from '../services/ContactService';
import "./base.css"
const Base = ({ title = "Welcome to our website", children }) => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [contacts, setContacts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSocialLinks = await getSocialLinks();
                const fetchedContactDetails = await getContactDetails();
                setSocialLinks(fetchedSocialLinks);
                setContacts(fetchedContactDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Function to map icon name to FontAwesomeIcon component
    const getIcon = (iconName) => {
        switch(iconName) {
            case 'fa-facebook':
                return faFacebook;
            case 'fa-instagram':
                return faInstagram;
            default:
                return null;
        }
    };

    return (
        <div className="wrapper"> {/* Use the wrapper class */}
            <CustomNavBar />
            <div className="content"
                 style={{paddingTop: '56px'}}> {/* Adjust the padding-top to the height of your navbar */}
                {children}
            </div>
            <footer className="text-white py-4" style={{backgroundColor: '#81d8d0'}}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Blog31</h3>
                            <p><b>Transform Thoughts into Connections</b></p>
                        </div>
                        <div className="col-md-4">
                            <h5>Social Links</h5>
                            <ul className="list-unstyled">
                                {socialLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={getIcon(link.icon)}/> {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contacts</h5>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faEnvelope} /> Email: {contacts.email}</li>
                                <li><FontAwesomeIcon icon={faPhone} /> Phone: {contacts.phone}</li>
                                <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {contacts.address}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Base;
