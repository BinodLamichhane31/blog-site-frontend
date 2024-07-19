import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { loadAllCategories } from "../services/category_service.tsx";
import './category.css';  // Import the CSS file for styling

function Category({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        loadAllCategories().then(response => {
            console.log("loading categories ", response.data);
            setCategories([...response.data]);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading categories");
        });
    }, []);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        onCategorySelect(categoryId);
    };

    return (
        <div className='category-container'>
            <Button
                className={`category-button mt-2 ${selectedCategory === null ? 'selected' : ''}`}
                outline
                onClick={() => handleCategoryClick(null)}
            >
                All
            </Button>
            {categories.map((category, index) => (
                <Button
                    key={index}
                    className={`category-button mt-2 ${selectedCategory === category.categoryId ? 'selected' : ''}`}
                    outline
                    onClick={() => handleCategoryClick(category.categoryId)}
                >
                    {category.categoryTitle}
                </Button>
            ))}
        </div>
    );
}

export default Category;
