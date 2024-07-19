import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { loadAllCategories } from "../services/category_service.tsx";
import './category.css';  // Import the CSS file for styling

function Category() {

    const [categories, setCategories] = useState([]);

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
        <div className='category-container'>
            <Button className='category-button mt-2' outline>All</Button>
            {categories && categories.map((category, index) => (
                <Button key={index} className='category-button mt-2' outline>{category.categoryTitle}</Button>
            ))}
        </div>
    );
}

export default Category;
