import {api} from "../api.js";

export const authApiSlice = api.injectEndpoints({
    endpoints: builder=>({
        logInWithEmailAndPass: builder.mutation({
            query: body =>({
                url:'user/login',
                method:'POST',
                body
            })
        }),
        logInByServices: builder.mutation({
            query: body => ({
                url: 'user/loginByService',
                method: 'POST',
                body
            })
        }),
        question:builder.mutation({
            query:body=>({
                url:'mail/send',
                method:'POST',
                body
            })
        }),
        liqpay:builder.mutation({
            query:body=>({
                url:'liqpay/create',
                method:'POST',
                body
            })
        })

    })
})

export const { useLogInWithEmailAndPassMutation,useLiqpayMutation,useQuestionMutation} = authApiSlice
