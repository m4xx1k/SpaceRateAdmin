import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

import {api} from "./api.js";
import {categoryApi} from "./category/category.api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, auth: authReducer,
    }, middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
})
