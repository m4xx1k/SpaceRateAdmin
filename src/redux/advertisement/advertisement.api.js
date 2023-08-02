import {api} from "../api.js";

export const advertisementApi = api.injectEndpoints({
    endpoints: builder => ({

        fetchAllAdvertisement: builder.query({
            query: () => '/advertisement',
            providesTags: ['Category']
        }),
        createAdvertisement: builder.mutation({
            query: body => ({
                url: '/advertisement',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Category']
        }),
        updateAdvertisement: builder.mutation({
            query: ({id, body}) => ({
                url: `/advertisement/${id}`,
                method: 'PUT',
                body
            })

        }),
        removeAdvertisement: builder.mutation({
            query: ({id}) => ({
                url: `advertisement/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const {

    useCreateAdvertisementMutation,
    useFetchAllAdvertisementQuery,
    useUpdateAdvertisementMutation,
    useRemoveAdvertisementMutation
} = advertisementApi
