import { configureStore } from '@reduxjs/toolkit'
import authReducder from '../actions/auth'

export const store = configureStore({
    reducer: {
        auth: authReducder,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})