import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    alert: '',
    variant: '',
    video: {},
}

export const getUserVideo = createAsyncThunk('uploads/getUserVideo', async (form, thunkAPI) => {
    try {
        const response = await api.getUserVideo(form)
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

export const uploadVideo = createAsyncThunk('uploads/uploadVideo', async (form, thunkAPI) => {
    try {
        const response = await api.uploadVideo(form)
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

export const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserVideo.fulfilled, (state, action) => {
            state.video = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getUserVideo.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(uploadVideo.fulfilled, (state, action) => {
            state.video = action.payload.data.result
            state.alert = action.payload.data.message
            state.variant = action.payload.data.variant
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(uploadVideo.rejected, (state, action) => {
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

export const { clearAlert, clearMailStatus } = uploadsSlice.actions

export default uploadsSlice.reducer