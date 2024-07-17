import {myAxios, privateAxios} from "./helper.tsx";

export const createPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data);
};

export const loadAllPosts = (pageNumber,pageSize) => {
    return myAxios.get(`posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdDate&sortDir=dsc`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error loading posts:', error);
            throw error;
        });
};

export const loadPost = (postId) => {
    return myAxios.get("/posts/"+postId)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error loading post:', error);
            throw error;
        });
};

export const createComment = (comment,postId) => {
    return privateAxios.post(`/post/${postId}/comments`,comment)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error creating comment:', error);
            throw error;
        });
};


