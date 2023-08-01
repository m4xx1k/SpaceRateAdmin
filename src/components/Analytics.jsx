import React from 'react';
import {XAxis, YAxis, Tooltip, BarChart, Bar} from 'recharts';
import {useAnalitics} from "../utils.js";
import s from '../pages/NewUsers/NewUsers.module.scss'

const Analytics = ({data}) => {
    const {usersArray, newCount, allCount} = useAnalitics(data)
    return (
        <div>
            <div className={s.stat}>
                <div className={s.statElem}>
                    <span className={s.statNameActive}>НОВЬІX:</span>
                    <span className={s.statValue}>{newCount}</span>
                </div>
                <div className={s.statElem}>
                    <span className={s.statName}>ВСЕГО:</span>
                    <span className={s.statValue}>{allCount}</span>
                </div>

            </div>
            <div className={s.barchart}>
                {/*<h1>Active Users Over Time</h1>*/}
                <BarChart width={600} height={312} data={usersArray}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar radius={2} dataKey="totalUsers" fill="#22262b" name="ВСЕГО"/>
                    <Bar radius={2} dataKey="newUsers" fill="rgb(61, 145, 255)" name="НОВЬІX"/>
                </BarChart>
            </div>
            {/*<div>*/}
            {/*    <h1>User Entries</h1>*/}
            {/*    <BarChart width={800} height={400} data={userEntriesArray}>*/}
            {/*        <XAxis dataKey="username" />*/}
            {/*        <YAxis />*/}
            {/*        <Tooltip />*/}
            {/*        <Bar dataKey="count" fill="#8884d8" />*/}
            {/*    </BarChart>*/}
            {/*</div>*/}


        </div>
    );
};

export default Analytics;
