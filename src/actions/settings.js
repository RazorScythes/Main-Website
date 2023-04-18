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

export const getProfile = createAsyncThunk('settings/getProfile', async (form, thunkAPI) => {
    try {
        const response = await api.getProfile(form)
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

export const updateProfile = createAsyncThunk('settings/updateProfile', async (form, thunkAPI) => {
    try {
        const response = await api.updateProfile(form)
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

export const updatePassword = createAsyncThunk('settings/updatePassword', async (form, thunkAPI) => {
    try {
        const response = await api.updatePassword(form)
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

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.data = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getProfile.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.data = action.payload.data.result
            state.alert = action.payload.data.alert
            state.variant = action.payload.data.variant
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.data = action.payload.data.result
            state.alert = action.payload.data.alert
            state.variant = action.payload.data.variant
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(updatePassword.rejected, (state, action) => {
            console.log(action.payload)
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

export const { clearAlert, clearMailStatus } = settingsSlice.actions

export default settingsSlice.reducer