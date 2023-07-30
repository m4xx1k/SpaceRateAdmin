import React from 'react';
import s from './User.module.css'
const User = ({data,dates}) => {
    const date = new Date(data.date)
    return (
        <div className={s.container}>
            <img className={s.img} src={data.picture} alt=""/>
            <div>
                <div style={{marginBottom:4}}>{data.name}</div>
                <a className={s.username} href={`https://t.me/${data.username}`}>@{data.username}</a>
                <div>{date.toISOString().split('T')[0]}</div>
            </div>
            {
                data.registeredSameDay &&
                <div className={s.new}>
                    НОВЬІЙ
                </div>
            }

        </div>
    );
};

export default User;
