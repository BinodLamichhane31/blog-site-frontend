
import {myAxios} from "./helper.tsx";

export const getSocialLinks = () => {
    return myAxios.get('/social-links')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching social links:', error);
            throw error;
        });
};

export const getContactDetails = () => {
    return myAxios.get('/contacts')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching contact details:', error);
            throw error;
        });
};
