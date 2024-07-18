// Base.js

import React, { useEffect, useState } from 'react';
import CustomNavBar from './CustomNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { getSocialLinks, getContactDetails } from '../services/ContactService';

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
        <div className="container-fluid p-0 m-0">
            <CustomNavBar />
            {children}
            <footer className="text-white mt-5 py-4" style={{ backgroundColor: '#81d8d0' }}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Connect with the developer</h5>
                            <p>Here are my contact details and social links. Feel free to hit me up.</p>
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
