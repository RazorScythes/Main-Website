import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    notFound: false,
    alert: '',
    variant: '',
    data: {},
    videos: [],
    comments: [],
    relatedVideos: [],
    avatar: '',
    message: '',
    forbiden: '',
    sideAlert: {},
    tagsCount: []
}

export const getVideoByID = createAsyncThunk('video/getVideoByID', async (form, thunkAPI) => {
    try {
        const response = await api.getVideoByID(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const getVideos = createAsyncThunk('video/getVideos', async (form, thunkAPI) => {
    try {
        const response = await api.getVideos(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const getComments = createAsyncThunk('video/getComments', async (form, thunkAPI) => {
    try {
        const response = await api.getComments(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const getRelatedVideos = createAsyncThunk('video/getRelatedVideos', async (form, thunkAPI) => {
    try {
        const response = await api.getRelatedVideos(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const addOneViews = createAsyncThunk('video/addOneViews', async (form, thunkAPI) => {
    try {
        const response = await api.addOneViews(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const addOneLikes = createAsyncThunk('video/addOneLikes', async (form, thunkAPI) => {
    try {
        const response = await api.addOneLikes(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const addOneDislikes = createAsyncThunk('video/addOneDislikes', async (form, thunkAPI) => {
    try {
        const response = await api.addOneDislikes(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const uploadComment = createAsyncThunk('video/uploadComment', async (form, thunkAPI) => {
    try {
        const response = await api.uploadComment(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const removeComment = createAsyncThunk('video/removeComment', async (form, thunkAPI) => {
    try {
        const response = await api.removeComment(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const getVideoByTag = createAsyncThunk('video/getVideoByTag', async (form, thunkAPI) => {
    try {
        const response = await api.getVideoByTag(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const getVideoByArtist = createAsyncThunk('video/getVideoByArtist', async (form, thunkAPI) => {
    try {
        const response = await api.getVideoByArtist(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const getVideoBySearchKey = createAsyncThunk('video/getVideoBySearchKey', async (form, thunkAPI) => {
    try {
        const response = await api.getVideoBySearchKey(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const addToWatchLater = createAsyncThunk('video/addToWatchLater', async (form, thunkAPI) => {
    try {
        const response = await api.addToWatchLater(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const countVideoTags = createAsyncThunk('video/countVideoTags', async (form, thunkAPI) => {
    try {
        const response = await api.countVideoTags(form)
        return response
    }
    catch (err) {
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getVideos.fulfilled, (state, action) => {
            state.videos = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideos.rejected, (state, action) => {
            state.message = action.payload.message
        }),
        builder.addCase(getVideoByTag.fulfilled, (state, action) => {
            state.videos = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideoByTag.rejected, (state, action) => {
            state.message = action.payload.message
        }),
        builder.addCase(getVideoByArtist.fulfilled, (state, action) => {
            state.videos = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideoByArtist.rejected, (state, action) => {
            state.message = action.payload.message
        }),
        builder.addCase(getVideoBySearchKey.fulfilled, (state, action) => {
            state.videos = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideoBySearchKey.rejected, (state, action) => {
            state.message = action.payload.message
        }),
        builder.addCase(getVideoByID.fulfilled, (state, action) => {
            state.notFound = false
            state.data = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideoByID.pending, (state, action) => {
            state.notFound = false
            state.isLoading = true
        }),
        builder.addCase(getVideoByID.rejected, (state, action) => {
            state.forbiden = action.payload.forbiden
            state.alert = action.payload.message
            state.variant = action.payload.variant
            state.notFound = action.payload.notFound
            state.isLoading = false
        }),
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload.data.comments
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getComments.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(getRelatedVideos.fulfilled, (state, action) => {
            state.relatedVideos = action.payload.data.relatedVideos
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getRelatedVideos.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(uploadComment.fulfilled, (state, action) => {
            state.comments = action.payload.data.comments
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(uploadComment.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(removeComment.fulfilled, (state, action) => {
            state.comments = action.payload.data.comments
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(removeComment.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(addToWatchLater.fulfilled, (state, action) => {
            state.sideAlert = action.payload.data.sideAlert
        }),
        builder.addCase(addToWatchLater.rejected, (state, action) => {
            state.sideAlert = action.payload.sideAlert
        }),
        builder.addCase(countVideoTags.fulfilled, (state, action) => {
            state.tagsCount = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(countVideoTags.rejected, (state, action) => {
            console.log(action.payload)
            state.alert = action.payload.message
            state.variant = action.payload.variant
        })
    },
    reducers: {
      clearAlert: (state) => {
        state.alert = '',
        state.variant = ''
        state.sideAlert = {}
      },
      clearMailStatus: (state) => {
        state.mailStatus = ''
      },
    },
})

export const { clearAlert, clearMailStatus } = videoSlice.actions

export default videoSlice.reducer