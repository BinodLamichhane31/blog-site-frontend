import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import {loadAllCategories} from "../services/category_service.tsx";
function Category() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadAllCategories().then(response => {
            console.log("loading categories ", response.data);
            setCategories([...response.data]);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading categories");
        });
    }, []);



    return (
        <div className={'text-center'}>
            <Button className={'me-2 category-button'} outline>All</Button>
            {categories && categories.map((category, index) => (
                <Button key={index} className={'me-2 category-button'} outline>{category.categoryTitle}</Button>
            ))}
        </div>
    )
}

export default Category