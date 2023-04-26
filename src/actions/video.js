import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    alert: '',
    variant: '',
    data: {},
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

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getVideoByID.fulfilled, (state, action) => {
            console.log(action.payload.data.result)
            state.data = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getVideoByID.rejected, (state, action) => {
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