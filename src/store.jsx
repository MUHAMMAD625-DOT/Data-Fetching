import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from './ProductSlice';
import { getApiCall } from "./services/GetApiCall";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:{
        product:ProductReducer,
        [getApiCall.reducerPath]:getApiCall.reducer,
    },
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(getApiCall.middleware),
});
setupListeners(store.dispatch); 