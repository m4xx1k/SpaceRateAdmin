import React from 'react';
import s from './EventItem.module.css'
import replace from '../../assets/replace.svg'
import deleteIcon from '../../assets/delete.svg'
import eye from '../../assets/eye.svg'
import {useDeleteEventMutation, useToggleVisibleMutation} from "../../redux/event/event.api.js";
import {Link} from "react-router-dom";
import clsx from "clsx";
const EventItem = ({event}) => {
    const [removeEvent] = useDeleteEventMutation()
    const [toggleVisible] = useToggleVisibleMutation()
    const handleToggleVisible = async ()=>{
        await toggleVisible(event._id)
    }
    const handleDeleteEvent = async ()=>{
        try{
            await removeEvent({id:event._id})
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={s.item}>
            <div className={s.info}>
                <div className={s.name}>{event.name}</div>
                <div className=""></div>
            </div>
            <div className={s.controls}>
                <button  onClick={handleToggleVisible} className={clsx(s.eye,!event.isVisible && s.notVisible)}>
                    <img src={eye} alt=""/>
                </button>
                <Link to={`/event/edit/${event._id}`} className={s.edit}>
                    <img src={replace} alt=""/>
                </Link>
                <button  onClick={handleDeleteEvent} className={s.delete}>
                    <img src={deleteIcon} alt=""/>
                </button>

            </div>
        </div>
    );
};

export default EventItem;
