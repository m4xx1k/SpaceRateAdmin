import React, {useEffect} from 'react';
import {useFindAllUsersQuery} from "../redux/auth/authApiSlice.js";
import User from "../components/User/User.jsx";

const Users = () => {
    const {data, isSuccess} = useFindAllUsersQuery()
    if (!isSuccess || !data?.length) return null
    return (
        <div style={{marginTop: 8, padding: 32}}>
            <h2 className={'title'}>Пользователи ({data?.length})</h2>
            <ul className={'row-wrap'}>
                {
                    data.map(user => <User key={user._id} data={user}/>)
                }
            </ul>

        </div>
    );
};

export default Users;
