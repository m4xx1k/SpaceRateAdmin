import {createSlice} from '@reduxjs/toolkit';

let user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

let token = localStorage.getItem('token') || null;

const initialState = { user, token };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        auth(state, action) {
            const token = action.payload;
            console.log( token)
            state.user = {user:null,token}
            localStorage.setItem('token', token)
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            window.location.replace('https://admin.goodjoy.uz/login')
        },
    },
});

export const { auth, logout } = userSlice.actions;




export default userSlice.reducer;
