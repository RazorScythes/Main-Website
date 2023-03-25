import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../actions/auth'
import portfolioReducer from '../actions/portfolio'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        portfolio: portfolioReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})