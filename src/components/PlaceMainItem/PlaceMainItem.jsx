import React from 'react';
import s from './PlaceMainItem.module.css'
import replace from '../../assets/replace.svg'
import deleteIcon from '../../assets/delete.svg'
import {useRemovePlaceMutation} from "../../redux/place/place.api.js";
import {Link} from "react-router-dom";
import clsx from "clsx";
const PlaceMainItem = ({place}) => {

    const [removePlace] = useRemovePlaceMutation()

    const handleDeleteEvent = async ()=>{
        try{
            const deleted = await removePlace(place._id)
            console.log({deleted})
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={s.item}>
            <div className={s.info}>
                <div className={s.name}>{place.name}</div>
                <div className=""></div>
            </div>
            <div className={s.controls}>

                <Link to={`/place/edit/${place._id}`} className={s.edit}>
                    <img src={replace} alt=""/>
                </Link>
                <button  onClick={handleDeleteEvent} className={s.delete}>
                    <img src={deleteIcon} alt=""/>
                </button>

            </div>
        </div>
    );
};

export default PlaceMainItem;
