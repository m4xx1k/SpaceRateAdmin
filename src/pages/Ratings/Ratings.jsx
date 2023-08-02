import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchAllPlacesQuery, useFetchRatingsByPlacesQuery} from "../../redux/place/place.api.js";
import s from "./Ratings.module.scss";
import {selectAllPlaces, togglePlaces} from "../../redux/place/place.slice.js";
import RatingItem from "../../components/RatingItem/RatingItem.jsx";
import {months} from '../../utils'
function GroupedRatings({ ratings }) {
    // Сортуємо відгуки за датою
    const sortedRatings = [...ratings].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Групуємо відгуки за датою (день, місяць, рік)
    const groupedRatings = sortedRatings.reduce((acc, rating) => {
        const date = new Date(rating.date);
        const key = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г.`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(rating);
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedRatings).map((date) => (
                <div key={date}>
                    <h3 className={s.rating__date}>{date}</h3> {/* Заголовок з датою */}
                    <ul>
                        {groupedRatings[date].map((rating) => (
                            <RatingItem key={rating._id} data={rating} /> // Ваш компонент для відгуку
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

const Ratings = () => {
    const {selectedPlaces} = useSelector(state=>state.place)
    const {data:places}  = useFetchAllPlacesQuery()
    const {data:ratings} = useFetchRatingsByPlacesQuery({places:selectedPlaces})
    const dispatch = useDispatch()
    console.log(ratings?.slice(0,3))
    const handleSelectPlace =id=>{
        if (id === 'all') {
            dispatch(selectAllPlaces())
        } else dispatch(togglePlaces(id))
    }
    return (
        <div className={'container'}>
            <h2 className={'title'}>Отзывы</h2>
            <div className={s.places__container}>
                <h2 className="subtitle">
                    Места
                </h2>
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
            </div>
            {
                ratings?.length && <GroupedRatings ratings={ratings}/>
            }

        </div>
    );
};

export default Ratings;
