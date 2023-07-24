import {api} from "../api.js";

export const eventApi = api.injectEndpoints({
    endpoints: builder=>({

        findAllEventTypes:builder.query({
            query:()=>'event/findAllEventTypes',
            providesTags:['EventType']
        }),

        getEventFullInfoById:builder.query({
            query:id=>`event/getEventFullInfoById/${id}`,
            providesTags:['Event']
        }),



        createEventType:builder.mutation({
            query:body=>({
                url:'event/createNewEventType',
                method:"POST",
                body
            }),
            invalidatesTags:['EventType']
        }),
        createFullEvent:builder.mutation({
            query:body=>({
                url:'event/createFullEvent',
                method:"POST",
                body
            }),
            invalidatesTags:['Event']
        }),
        findByTypes:builder.query({
            query:body=>({
                url:'event/findByTypes',
                method:"POST",
                body
            }),
            providesTags:['Event']
        }),

        updateEventType:builder.mutation({
            query:body=>({
                url:`event/updateEventType`,
                method:'PUT',
                body
            }),
            invalidatesTags:['EventType']


        }),

        deleteEventType:builder.mutation({
            query:body=>({
                url:`event/deleteEventType`,
                method:'DELETE',
				body
            }),
            invalidatesTags:['EventType']

        })
,

        deleteEvent:builder.mutation({
            query:body=>({
                url:`event/deleteEvent`,
                method:'DELETE',
				body
            }),
            invalidatesTags:['Event']

        }),
        updateEvent:builder.mutation({
            query:({id,body})=>({
                url:`event/update/${id}`,
                method:'PUT',
                body
            })

        }),
        updateEventPhoto:builder.mutation({
            query:({id,body})=>({
                url:`event/updatephoto/${id}/`,
                method:'PUT',
                body
            })

        }),
        createEventPhoto:builder.mutation({
            query:({id,body})=>({
                url:`event/addphoto/${id}`,
                method:'POST',
                body
            })
        }),
        updateEventInfo:builder.mutation({
            query:body=>({
                url:'event/updateinfo',
                method:'PUT',
                body
            })

        }),
        updateEventDates:builder.mutation({
            query:body=>({
                url:'event/updatedates',
                method:'PUT',
                body
            })

        }),
        deleteEventPhoto:builder.mutation({
            query:id=>({
                url:`event/deletephoto/${id}`,
                method:'DELETE',
            })

        }),


    })
})

export const {
	useFindAllEventTypesQuery,
	useCreateEventTypeMutation,
	useUpdateEventTypeMutation,
	useDeleteEventTypeMutation,
	useFindByTypesQuery,
    useDeleteEventMutation,
    useCreateFullEventMutation,
    useGetEventFullInfoByIdQuery,
    useDeleteEventPhotoMutation,
    useCreateEventPhotoMutation,
    useUpdateEventPhotoMutation,
    useUpdateEventInfoMutation,
    useUpdateEventDatesMutation,
    useUpdateEventMutation,

} = eventApi
