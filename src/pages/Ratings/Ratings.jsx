import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchAllPlacesQuery, useFetchRatingsByPlacesQuery} from "../../redux/place/place.api.js";
import s from "./Ratings.module.scss";
import {selectAllPlaces, togglePlaces} from "../../redux/place/place.slice.js";
import RatingItem from "../../components/RatingItem/RatingItem.jsx";

const Ratings = () => {
    const {selectedPlaces} = useSelector(state=>state.place)
    const {data:places}  = useFetchAllPlacesQuery()
    const {data:ratings} = useFetchRatingsByPlacesQuery({places:selectedPlaces})
    const dispatch = useDispatch()
    const handleSelectPlace =id=>{
        if (id === 'all') {
            dispatch(selectAllPlaces())
        } else dispatch(togglePlaces(id))
    }
    return (
        <div className={'container'}>
            <h2 className={'title'}>Отзывы</h2>
            <ul className={s.places}>
                <li onClick={() => handleSelectPlace('all')}
                    className={` ${!selectedPlaces.length ? s.places__active : ''} ${s.places__item}`}
                >Все
                </li>
                {
                    places?.length ? places.map(c => (
                        <li onClick={() => handleSelectPlace(c._id)}
                            className={` ${selectedPlaces.includes(c._id) ? s.places__active : ''} ${s.places__item}`}
                            key={c._id}>{c.name}</li>
                    )) : <></>
                }
            </ul>
            {

            }
            <ul className={s.ratings}>
                {
                    ratings?.length ? ratings.map(rating=><RatingItem key={rating._id} data={rating}/>) : <span>Нет Отзывов:/</span>
                }
            </ul>
        </div>
    );
};

export default Ratings;
