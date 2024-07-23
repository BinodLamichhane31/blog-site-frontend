import {myAxios, privateAxios} from "./helper.tsx";

export const createPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data);
};

export const loadAllPosts = (pageNumber, pageSize, categoryId, query) => {
    let url = `posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdDate&sortDir=dsc`;
    if (categoryId !== null) {
        url = `category/${categoryId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdDate&sortDir=dsc`;
    }
    if (query) {
        url += `&query=${query}`;
    }
    console.log('API request URL:', url);
    return privateAxios.get(url)
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

export const uploadImage = (image,postId) => {
    const formDate = new FormData()
    formDate.append("image",image)
    return privateAxios.post(`/post/image/upload/${postId}`,formDate,{
        headers:{
            'Content-Type':'multipart/form-data'
        }

    })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error creating comment:', error);
            throw error;
        });
};

export const loadPostsByUser = (userId,pageNumber, pageSize) => {
    let url = `/user/${userId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=createdDate&sortDir=dsc`;

    return privateAxios.get(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error loading posts:', error);
            throw error;
        });
};


export const deletePostService = (postId) => {
    let url = `/posts/${postId}`;

    return privateAxios.delete(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error deleting post:', error);
            throw error;
        });
};

export const updatePostService = (post,postId) => {
    console.log(post)
    let url = `/posts/${postId}`;

    return privateAxios.put(url,post)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error updating post:', error);
            throw error;
        });
};



