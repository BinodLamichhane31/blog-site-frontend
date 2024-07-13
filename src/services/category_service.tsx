import {myAxios} from "./helper.tsx";

export const loadAllCategories = () => {
    return myAxios.get("/categories/");
};