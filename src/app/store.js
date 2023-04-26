import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../actions/auth'
import portfolioReducer from '../actions/portfolio'
import settingsSlice from '../actions/settings'
import logsSlice from '../actions/logs'
import videoSlice from '../actions/video'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        portfolio: portfolioReducer,
        settings: settingsSlice,
        logs: logsSlice,
        video: videoSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})