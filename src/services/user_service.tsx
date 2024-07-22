import {myAxios, privateAxios} from "./helper.tsx";
export const signUp = (user)=>{
    return myAxios.post("/v1/auth/register",user)
        .then((response)=>response.data);
}
export const loginUser = (loginDetail)=>{
    return myAxios.post("/v1/auth/login",loginDetail)
        .then((response)=>response.data);
}

export const updateUserDetails = (user) => {
    const allowedFields = {
        name: user.name,
        email: user.email,
        about: user.about,
        id: user.id,
    };

    return privateAxios.put(`/users/${user.id}`, allowedFields)
        .then(response => response.data);
}

export const checkEmailExists = (email: string) => {
    return myAxios.get(`/users/check-email?email=${email}`)
        .then(response => response.data);
}


