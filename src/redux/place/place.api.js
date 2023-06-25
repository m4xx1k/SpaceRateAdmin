import {api} from "../api.js";

export const placeApi = api.injectEndpoints({
    endpoints: builder=>({
        fetchAllPlaces:builder.query({
            query:()=>'place',
            providesTags:['Place']
        }),
        createPlace: builder.mutation({
            query: body =>({
                url:'place',
                method:'POST',
                body
            }),
            invalidatesTags:['Place']
        }),
        updatePlace:builder.mutation({
            query:({id,body})=>({
                url:`place/${id}`,
                method:'PUT',
                body
            })

        }),
        updatePlacePhoto:builder.mutation({
            query:({id,body})=>({
                url:`place/${id}/photo`,
                method:'PUT',
                body
            })

        }),
        updatePlaceInfo:builder.mutation({
            query:({id,body})=>({
                url:`place/${id}/info`,
                method:'PUT',
                body
            })

        }),
        removePlace:builder.mutation({
            query:  id=>({
                url:`place/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Place']
        })
    })
})

export const { useCreatePlaceMutation, useFetchAllPlacesQuery,useUpdatePlacePhotoMutation,useUpdatePlaceInfoMutation,useUpdatePlaceMutation, useRemovePlaceMutation} = placeApi
