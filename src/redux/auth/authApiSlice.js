import {api} from "../api.js";

export const authApiSlice = api.injectEndpoints({
    endpoints: builder=>({
        findAllUsers: builder.query({
            query: ()=>'user/all'
        })

    })
})

export const { useFindAllUsersQuery} = authApiSlice
