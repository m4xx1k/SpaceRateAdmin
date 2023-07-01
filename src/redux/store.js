import {configureStore} from "@reduxjs/toolkit";
import user from "./auth/authSlice";
import place from "./place/place.slice";

import {api} from "./api.js";
import {categoryApi} from "./category/category.api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, user, place,
    }, middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
})
