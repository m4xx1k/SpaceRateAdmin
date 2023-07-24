import {api} from "../api.js";

export const placeApi = api.injectEndpoints({
    endpoints: builder=>({
        fetchAllFullPlaces:builder.query({
            query:()=>'place',
            providesTags:['Place']
        }),
        fetchAllPlaces:builder.query({
           query:()=>'place/findAll',
           providesTags:['Place']
        }),
        fetchRatingsByPlaces:builder.query({
            query:body=>({
                url:'place/ratingsByPlaces',
                method:"POST",
                body
            }),
            providesTags:['Rating']
        }),
        fetchPlacesByCategories:builder.query({
            query:body=>({
                url:'place/categories',
                method:"POST",
                body
            }),
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
        createPlacePhoto:builder.mutation({
            query:({id,body})=>({
                url:`place/addphoto/${id}`,
                method:'POST',
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
        deletePhoto:builder.mutation({
            query:id=>({
                url:`place/deletephoto/${id}`,
                method:'DELETE',
            })

        }),
        removePlace:builder.mutation({
            query:  id=>({
                url:`place/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Place']
        }),
        deleteRating:builder.mutation({
            query:id=>({
                url:`place/deleterating/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['Rating']
        })
    })
})

export const {useDeleteRatingMutation,
    useFetchRatingsByPlacesQuery,
    useFetchAllPlacesQuery,
    useFetchPlacesByCategoriesQuery,
    useDeletePhotoMutation,
    useCreatePlacePhotoMutation,
    useCreatePlaceMutation,
    useFetchAllFullPlacesQuery,
    useUpdatePlacePhotoMutation,
    useUpdatePlaceInfoMutation,
    useUpdatePlaceMutation,
    useRemovePlaceMutation
} = placeApi
