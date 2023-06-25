import {createSlice} from '@reduxjs/toolkit';


let user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

let token = localStorage.getItem('token') || null;

const initialState = {
    user, token,
    error: null,
    isLoading: false,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
        logout(state) {
            state.isLoading = false;
            state.user = null;
            state.error = null;
        },
    },
});

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;
