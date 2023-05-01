import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    alert: '',
    variant: '',
    data: {},
    comments: [],
    avatar: ''
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


export const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getVideoByID.fulfilled, (state, action) => {
            state.data = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideoByID.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
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
        })
    },
    reducers: {
      clearAlert: (state) => {
        state.alert = '',
        state.variant = ''
      },
      clearMailStatus: (state) => {
        state.mailStatus = ''
      },
    },
})

export const { clearAlert, clearMailStatus } = videoSlice.actions

export default videoSlice.reducer