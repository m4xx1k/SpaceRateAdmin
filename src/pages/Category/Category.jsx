import React from 'react';
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import s from './Category.module.css'
import CategoryItem from "../../components/CategoryItem/CategoryItem.jsx";
import NewCategory from "../../components/NewCategory/NewCategory.jsx";
const Category = () => {
    const {data} = useFetchAllQuery()
    return (
        <div className={'container'}>
            <h2 className={s.title}>Category</h2>
            <NewCategory/>
            <div className={s.list}>
                {
                    data?.map(category=><CategoryItem data={category} key={category._id}/>)
                }
            </div>
        </div>
    );
};

export default Category;
