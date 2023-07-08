import {api} from "../api.js";

export const categoryApi = api.injectEndpoints({
    endpoints: builder => ({
        fetchAll: builder.query({
            query: () => 'category',
            providesTags: ['Category']
        }),
        create: builder.mutation({
            query: body => ({
                url: 'category',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Category']
        }),
        update: builder.mutation({
            query: ({id, body}) => ({
                url: `category/${id}`,
                method: 'PUT',
                body
            })

        }),
        remove: builder.mutation({
            query: ({id}) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
        fetchAllCategoryAdvertisement: builder.query({
            query: () => '/categoryAdvertisement',
            providesTags: ['Category']
        }),
        createCategoryAdvertisement: builder.mutation({
            query: body => ({
                url: '/categoryAdvertisement',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Category']
        }),
        updateCategoryAdvertisement: builder.mutation({
            query: ({id, body}) => ({
                url: `/categoryAdvertisement/${id}`,
                method: 'PUT',
                body
            })

        }),
        removeCategoryAdvertisement: builder.mutation({
            query: ({id}) => ({
                url: `categoryAdvertisement/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const {
    useCreateMutation,
    useFetchAllQuery,
    useUpdateMutation,
    useRemoveMutation,
    useCreateCategoryAdvertisementMutation,
    useFetchAllCategoryAdvertisementQuery,
    useUpdateCategoryAdvertisementMutation,
    useRemoveCategoryAdvertisementMutation
} = categoryApi
