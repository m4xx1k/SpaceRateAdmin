import React, {useEffect, useState} from 'react';
import s from "./NewPlace.module.css";

const AdditionalItem = ({name, value = '', handleChange}) => {
    const [input, setInput] = useState(value)
    useEffect(() => handleChange(prev => ({...prev, [name]: {value}})), [])
    const onChange = e => {
        setInput(e.target.value)
        handleChange(prev => {
            return {...prev, [name]: e.target.value}
        })
    }

    return (<div className={s["form_group"]}>
        <label htmlFor="" style={{textTransform: 'capitalize'}}>{name}</label>
        <input value={input} onChange={onChange} type="text" className={s.input}/>
    </div>);
};

export default AdditionalItem;
