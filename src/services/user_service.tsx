import {myAxios} from "./helper.tsx";
export const signUp = (user)=>{
    return myAxios.post("/v1/auth/register",user)
        .then((response)=>response.data);
}