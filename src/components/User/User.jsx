import React from 'react';
import s from './User.module.css'
const User = ({data}) => {
    return (
        <div className={s.container}>
            <img className={s.img} src={data.picture} alt=""/>
            <div>
                <div style={{marginBottom:8}}>{data.name}</div>
                <a href={`https://t.me/${data.username}`}>@{data.username}</a>
            </div>
        </div>
    );
};

export default User;
