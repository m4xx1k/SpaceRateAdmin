import React from 'react';
import s from './User.module.css'
import clsx from "clsx";
const User = ({data}) => {
    return (
        <div className={clsx(s.container, data.registeredSameDay && s.new_container)}>
            <img className={s.img} src={data.picture} alt=""/>
            <div>
                <div style={{marginBottom:2}}>{data.name}</div>
                <a className={s.username} href={`https://t.me/${data.username}`}>@{data.username}</a>
                {/*<div>{date.toISOString().split('T')[0]}</div>*/}
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
