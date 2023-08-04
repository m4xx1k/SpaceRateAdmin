import React from 'react';

import s from "./../Ratings/Ratings.module.scss";
import {months} from '../../utils'
import {useFindAllRatingsQuery} from "../../redux/event/event.api.js";
import EventRatingItem from "./EventRatingItem.jsx";
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
                            <EventRatingItem key={rating._id} data={rating} /> // Ваш компонент для відгуку
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

const Ratings = () => {
    const {data:ratings} = useFindAllRatingsQuery()

    return (
        <div className={'container'}>
            <h2 className={'title'}>Отзывы</h2>

            {
                ratings?.length && <GroupedRatings ratings={ratings}/>
            }

        </div>
    );
};

export default Ratings;
