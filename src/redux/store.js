import {configureStore} from "@reduxjs/toolkit";
import user from "./auth/authSlice";
import place from "./place/place.slice";
import event from "./event/event.slice";

import {api} from "./api.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, user, place,event,
    }, middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
})
