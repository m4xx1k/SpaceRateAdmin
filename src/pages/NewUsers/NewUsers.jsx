import React, {useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useGetUsersWithinDateRangeMutation} from "../../redux/auth/authApiSlice.js";
import * as rdrLocales from 'react-date-range/dist/locale';
import User from "../../components/User/User.jsx";
import s from './NewUsers.module.css'

function NewUsers() {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const [users, setUsers] = useState([]);
    const [getUsersWithinDateRange] = useGetUsersWithinDateRangeMutation();

    const handleSelect = async (ranges) => {
        try {
            const start = ranges.selection.startDate.toLocaleDateString('uz-UZ');
            const end = ranges.selection.endDate.toLocaleDateString('uz-UZ');
            console.log({start, end}); // перевіряємо дати у місцевому часовому поясі
            const {data} = await getUsersWithinDateRange({start, end});
            console.log({start, end, data})
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
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={(ranges) => {
                    setSelectionRange(ranges.selection);
                }}
                locale={rdrLocales.ru}
            />
            <button onClick={() => handleSelect({selection: selectionRange})}>Get Users</button>
            <div>
                {Object.keys(users).length > 0 ? (
                    Object.entries(users)
                        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                        .map(([date, usersByDate]) => (
                            <div key={date}>
                                <h3>{date}</h3>
                                <ul>
                                    {usersByDate.map((user, i) => (
                                        <User data={user} key={i}/>
                                    ))}
                                </ul>
                            </div>
                        ))
                ) : (
                    <p>No users found in the selected date range.</p>
                )}
            </div>
        </div>);
}

export default NewUsers;
