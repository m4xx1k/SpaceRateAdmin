import {api} from "../api.js";

export const authApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        findAllUsers: builder.query({
            query: () => 'user/all'
        }),

        registerAdmin: builder.mutation({
            query: body => ({url: 'user/admin/register', method: "POST", body})
        })
        ,
        loginAdmin: builder.mutation({
            query: body => ({url: 'user/admin/login', method: "POST", body})
        }),
        fetchUser: builder.query({
            query: body => ({
                url: `user/find`,
                method:"POST",
                body
            })
        })

    })
})

export const {useFindAllUsersQuery, useLoginAdminMutation, useFetchUserQuery} = authApiSlice
