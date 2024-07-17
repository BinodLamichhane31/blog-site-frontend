import {myAxios, privateAxios} from "./helper.tsx";

export const createPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data);
};

export const loadAllPosts = (pageNumber,pageSize) => {
    return myAxios.get(`posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error loading posts:', error);
            throw error;
        });
};

