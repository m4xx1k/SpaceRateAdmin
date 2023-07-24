import React from 'react'
import s from "./Events.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAllEventTypes,
    toggleEventTypes
} from "../../redux/event/event.slice.js";
import {useFindAllEventTypesQuery, useFindByTypesQuery} from "../../redux/event/event.api.js";
import EventItem from "../../components/EventItem/EventItem.jsx";
const Events = () => {
    const {data: eventTypes} = useFindAllEventTypesQuery()
    const dispatch = useDispatch()
    const {selectedEventTypes} = useSelector(state => state.event)
    const {data: events} = useFindByTypesQuery({types: selectedEventTypes})
    console.log({events})
    const handleSelectEventType = id => {
        if (id === 'all') {
            dispatch(selectAllEventTypes())
        } else dispatch(toggleEventTypes(id))
    }
  return (
	<div className={'container'}>
        <h2 className="title">События</h2>
        <ul className={s.eventTypes}>
            <li onClick={() => handleSelectEventType('all')}
                className={` ${!selectedEventTypes.length ? s.eventTypes__active : ''} ${s.eventTypes__item}`}
            >Все
            </li>
            {
                eventTypes?.length ? eventTypes.map(c => (
                    <li onClick={() => handleSelectEventType(c._id)}
                        className={` ${selectedEventTypes.includes(c._id) ? s.eventTypes__active : ''} ${s.eventTypes__item}`}
                        key={c._id}>{c.name}</li>
                )) : <></>
            }
        </ul>
        <div className={s.events}>
            {events?.map(event=>(
                <EventItem event={event} key={event._id}/>
            ))}
        </div>
    </div>
  )
}

export default Events
