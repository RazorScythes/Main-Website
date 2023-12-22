import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../actions/auth'
import portfolioReducer from '../actions/portfolio'
import settingsSlice from '../actions/settings'
import logsSlice from '../actions/logs'
import videoSlice from '../actions/video'
import uploadsSlice from '../actions/uploads'
import gameSlice from '../actions/game'
import blogsSlice from '../actions/blogs'
import archiveSlice from '../actions/archive'
import projectSlice from '../actions/project'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        portfolio: portfolioReducer,
        settings: settingsSlice,
        logs: logsSlice,
        video: videoSlice,
        uploads: uploadsSlice,
        game: gameSlice,
        blogs: blogsSlice,
        archive: archiveSlice,
        project: projectSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})