import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducer";
import logger from 'redux-logger'
let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});
export default store