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
        findById:builder.query({
           query:id=>`place/findById/${id}`,
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
        findMainPlacesByCategories:builder.query({
            query:body=>({
                url:'place/findMainPlacesByCategories',
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
        }),
        createRatingAnswer:builder.mutation({
            query:body=>({
                url:`place/ratingAnswer/create`,
                method:"POST",
                body
            }),
            invalidatesTags:['Rating']
        }),
        updateRatingAnswer:builder.mutation({
            query:body=>({
                url:`place/ratingAnswer/update`,
                method:"PUT",
                body
            }),
            invalidatesTags:['Rating']
        }),
        deleteRatingAnswer:builder.mutation({
            query:body=>({
                url:`place/ratingAnswer/delete`,
                method:"DELETE",
                body
            }),
            invalidatesTags:['Rating']
        })
    })
})

export const {useDeleteRatingMutation,
    useCreateRatingAnswerMutation,
    useUpdateRatingAnswerMutation,
    useDeleteRatingAnswerMutation,
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
    useRemovePlaceMutation,
    useFindMainPlacesByCategoriesQuery,
    useFindByIdQuery
} = placeApi
