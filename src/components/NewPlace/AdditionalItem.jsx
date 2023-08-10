import React, {useEffect, useState} from 'react';
import s from "./NewPlace.module.css";

const AdditionalItem = ({name, value = {ru:'',uz:''}, handleChange}) => {
    const [input, setInput] = useState(value.ru)
    const [inputUz, setInputUz] = useState(value.uz)
    useEffect(() => {
            handleChange(prev => ({...prev, [name]: value}))
        },
        [])
    const onChange = e => {
        setInput(e.target.value)
        handleChange(prev => {
            return {...prev, [name]: {...prev[name],ru:e.target.value}}
        })
    }
    const onChangeUz = e => {
        setInputUz(e.target.value)
        handleChange(prev => {
            return {...prev, [name]: {...prev[name],uz:e.target.value}}
        })
    }

    return (<div className={s["form_group"]}>
        <label htmlFor="" style={{textTransform: 'capitalize'}}>{name?.replaceAll('_',' ')}</label>
        <input value={input} placeholder={'RU'} onChange={onChange} type="text" className={s.input}/>
        <input value={inputUz} placeholder={'UZ'} onChange={onChangeUz} type="text" className={s.input}/>
    </div>);
};

export default AdditionalItem;
