import React from 'react';
import {LineChart, XAxis, YAxis, Tooltip, Line, BarChart, Bar, PieChart, Pie} from 'recharts';
import {useAnalitics} from "../utils.js";
import s from '../pages/NewUsers/NewUsers.module.css'
const Analytics = ({data}) => {
    const {usersArray} = useAnalitics(data)
    return (
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 32}}>
            <div className={s.barchart}>
                {/*<h1>Active Users Over Time</h1>*/}
                <BarChart width={600} height={312} data={usersArray}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar  radius={2} dataKey="totalUsers" fill="#22262b" name="ВСЕГО"/>
                    <Bar  radius={2} dataKey="newUsers" fill="rgb(61, 145, 255)" name="НОВЬІX"/>
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
