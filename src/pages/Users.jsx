import React, {useEffect} from 'react';
import {useFindAllUsersQuery} from "../redux/auth/authApiSlice.js";
import User from "../components/User/User.jsx";

const Users = () => {
    const {data, isSuccess} = useFindAllUsersQuery()
    if(!isSuccess || !data?.length) return null
    return (
        <div  style={{marginTop:8, padding:32}}>
            <h2 style={{fontSize:24, fontWeight:700}}>Users ({data?.length})</h2>
            {
                data.map(user=><User data={user}/>)
            }
        </div>
    );
};

export default Users;
