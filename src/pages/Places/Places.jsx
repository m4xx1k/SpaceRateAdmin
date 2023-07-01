import React, {useEffect} from 'react';
import {useFetchAllPlacesQuery, useFetchPlacesByCategoriesQuery} from "../../redux/place/place.api.js";
import NewPlace from "../../components/NewPlace/NewPlace.jsx";
import PlaceItem from "../../components/PlaceItem/PlaceItem.jsx";
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import s from './Places.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectAllCategories, toggleCategories} from "../../redux/place/place.slice.js";

const Places = () => {
    const {data} = useFetchAllPlacesQuery()
    const {data: categories} = useFetchAllQuery()
    const dispatch = useDispatch()
    const {selectedCategories} = useSelector(state => state.place)
    const {data: places} = useFetchPlacesByCategoriesQuery({categories: selectedCategories})
    useEffect(() => console.log(places), [places])
    const handleSelectCategory = id => {
        if (id === 'all') {
            dispatch(selectAllCategories())
        } else dispatch(toggleCategories(id))
    }
    return (
        <div className={'container'}>
            <NewPlace/>
            <ul className={s.categories}>
                <li onClick={() => handleSelectCategory('all')}
                    className={` ${!selectedCategories.length ? s.categories__active : ''} ${s.categories__item}`}
                >Все
                </li>
                {
                    categories?.length ? categories.map(c => (
                        <li onClick={() => handleSelectCategory(c._id)}
                            className={` ${selectedCategories.includes(c._id) ? s.categories__active : ''} ${s.categories__item}`}
                            key={c._id}>{c.name}</li>
                    )) : <></>
                }
            </ul>
            <ul>
                {
                    places?.length ? places?.map(data => <PlaceItem key={data.place._id} data={data}/>) : <></>
                }
            </ul>
        </div>
    );
};

export default Places;
