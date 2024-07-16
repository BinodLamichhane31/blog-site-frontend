import {privateAxios} from "./helper.tsx";

export const createPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data);
};