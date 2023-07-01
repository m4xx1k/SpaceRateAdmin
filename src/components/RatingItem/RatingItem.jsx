import React from 'react';
import dayjs from "dayjs";
import s from './RatingItem.module.scss'
import {useFetchUserQuery} from "../../redux/auth/authApiSlice.js";
import deleteIcon from './../../assets/trash.svg'
import {useDeleteRatingMutation} from "../../redux/place/place.api.js";
const RatingItem = ({data}) => {

    const {data:user} = useFetchUserQuery({telegramId: data.telegramId})
    const [deleteRating] = useDeleteRatingMutation()
    const handleDelete = async id =>{
        try{
            await deleteRating(data._id)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <li className={s.item}>
            {
                user &&  <div className={s.item__top}>
                    <img className={s.item__img} src={user.picture} alt=""/>
                <div className={s.item__user}>
                    <span>{user.name}</span>
                    <a className={s.item__username} target={'_blank'} rel={'noreferrer'} href={`https://t.me/${user.username}`}>@{user.username}</a>
                </div>
                <span className={s.item__rating}>{data.value}/5</span>
                </div>
            }

            <p className={s.item__text}>{data.text}</p>
            <div className={s.item__bottom}>
                <span className={s.item__date}>{dayjs(data.date).format("DD.MM.YYYY HH:mm")}</span>
                <button className={s.item__delete} onClick={handleDelete}>
                    <img src={deleteIcon} alt=""/>
                </button>

            </div>
        </li>
    );
};

export default RatingItem;
