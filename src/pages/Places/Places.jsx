import React, {useEffect} from 'react';
import {
    useFetchAllFullPlacesQuery,

    useFetchPlacesByCategoriesQuery, useFindMainPlacesByCategoriesQuery
} from "../../redux/place/place.api.js";
import NewPlace from "../../components/NewPlace/NewPlace.jsx";
import PlaceItem from "../../components/PlaceItem/PlaceItem.jsx";
import {useFetchAllQuery} from "../../redux/category/category.api.js";
import s from './Places.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectAllCategories, toggleCategories} from "../../redux/place/place.slice.js";
import PlaceMainItem from "../../components/PlaceMainItem/PlaceMainItem.jsx";

const Places = () => {
    const {data: categories} = useFetchAllQuery()
    const dispatch = useDispatch()
    const {selectedCategories} = useSelector(state => state.place)
    // const {data: places} = useFetchPlacesByCategoriesQuery({categories: selectedCategories})
    const {data:mainPlaces,isSuccess,isFetching} = useFindMainPlacesByCategoriesQuery({categories: selectedCategories})
    useEffect(() => {

        console.log({isSuccess, mainPlaces,isFetching})
    }, [mainPlaces,isFetching,isSuccess])
    const handleSelectCategory = id => {
        if (id === 'all') {
            dispatch(selectAllCategories())
        } else dispatch(toggleCategories(id))
    }
    return (
        <div className={'container'}>
            <h2 className={'title'}>Места</h2>
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
            {/*<ul>*/}
            {/*    {*/}
            {/*        places?.length ? places?.map(data => <PlaceItem key={data.place._id} data={data}/>) : <></>*/}
            {/*    }*/}
            {/*</ul>*/}
            <ul>
                {
                    mainPlaces?.length ? mainPlaces?.map(data => <PlaceMainItem key={data?._id} place={data}/>) : (
                        isFetching ? <>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        <div className={'skeleton-loading'} style={{width:'100%',height:50}}></div>
                        </> :<></>
                    )
                }
            </ul>
        </div>
    );
};

export default Places;
