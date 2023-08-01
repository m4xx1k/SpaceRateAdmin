import React, {useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useGetUsersWithinDateRangeMutation} from "../../redux/auth/authApiSlice.js";
import * as rdrLocales from 'react-date-range/dist/locale';
import User from "../../components/User/User.jsx";
import s from './NewUsers.module.scss'
import Analytics from "../../components/Analytics.jsx";
import {formatDate} from "../../utils.js";

function NewUsers() {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const [users, setUsers] = useState([]);
    const [analData, setAnalData] = useState([])
    const [getUsersWithinDateRange] = useGetUsersWithinDateRangeMutation();

    const handleSelect = async (ranges) => {
        try {
            const start = ranges.selection.startDate.toLocaleDateString('uz-UZ');
            const end = ranges.selection.endDate.toLocaleDateString('uz-UZ');
            const {data} = await getUsersWithinDateRange({start, end});
            console.log({start,end,data})
            setAnalData(data)
            const groupedUsers = data.reduce((acc, user) => {
                const date = new Date(user.date).toISOString().split('T')[0];
                if (!acc[date]) acc[date] = [];
                acc[date].push(user);
                return acc;
            }, {});
            setUsers(groupedUsers);

        } catch (error) {
            console.error("An error occurred while fetching users:", error);
        }
    };

    return (
        <div className={'container'}>
            <h1 className="title">
                Пользователи
            </h1>
            <div className={s.top}>
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={(ranges) => {
                        setSelectionRange(ranges.selection);
                    }}
                    locale={rdrLocales.ru}
                />
                {analData.length && <Analytics data={analData}/>}

            </div>

            <button className={s.find} onClick={() => handleSelect({selection: selectionRange})}>Найти</button>
            <div className={s.users_list}>
                {Object.keys(users).length > 0 ? (
                    Object.entries(users)
                        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                        .map(([date, usersByDate]) => {
                            const sortedUsersByDate = usersByDate.sort((a, b) => b.registeredSameDay - a.registeredSameDay);
                            return <div className={s.date} key={date}>
                                    <h3 className={s.date_title}>{formatDate(date)}</h3>
                                    <ul className={s.date_users}>
                                        {sortedUsersByDate.map((user, i) => (
                                            <User data={user} key={i}/>
                                        ))}
                                    </ul>
                                </div>
                            }
                        )
                ) : (
                    <p>Нету информации за это время</p>
                )}
            </div>
        </div>);
}

export default NewUsers;
