import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout} from "./auth/authSlice.js";
const baseQuery = fetchBaseQuery({
    baseUrl:import.meta.env.VITE__API,
    // baseUrl:"http://localhost:5001",
    prepareHeaders: (headers) =>{
        const token = localStorage.getItem('token')
        if(!!token) headers.set('authorization', `Bearer ${token}`)
        return headers
    }
})
const baseQueryWithReauth = async (args, api,extraOption)=>{
    let result = await baseQuery(args, api,extraOption)
    console.log(result)
    if(result?.error?.status === 403){
        api.dispatch(logout())
        return
    }
    return result
}
export const api = createApi({
    reducerPath:"appApi",
    baseQuery: baseQueryWithReauth,
    tagTypes:['Place','Rating','EventType','Event'],
    endpoints:build=>({})
})
