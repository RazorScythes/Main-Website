import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    notFound: false,
    alert: '',
    variant: '',
    data: {},
    archiveName: [],
    archiveData: [],
    avatar: '',
    message: '',
    forbiden: '',
    sideAlert: {},
}

export const getArchiveNameById = createAsyncThunk('archive/getArchiveNameById', async (form, thunkAPI) => {
    try {
        const response = await api.getArchiveNameById(form)
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

export const newArchiveList = createAsyncThunk('archive/newArchiveList', async (form, thunkAPI) => {
    try {
        const response = await api.newArchiveList(form)
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

export const removeArchiveList = createAsyncThunk('archive/removeArchiveList', async (form, thunkAPI) => {
    try {
        const response = await api.removeArchiveList(form)
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

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getArchiveNameById.fulfilled, (state, action) => {
            state.notFound = false
            state.archiveName = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getArchiveNameById.rejected, (state, action) => {
            state.notFound = false
            state.isLoading = false
        }),
        builder.addCase(newArchiveList.fulfilled, (state, action) => {
            state.notFound = false
            state.archiveName = action.payload.data.result
            state.error = ''
            state.isLoading = false
            state.sideAlert = action.payload.data.sideAlert
        }),
        builder.addCase(newArchiveList.rejected, (state, action) => {
            state.notFound = false
            state.isLoading = false
            state.sideAlert = action.payload.sideAlert
        }),
        builder.addCase(removeArchiveList.fulfilled, (state, action) => {
            state.notFound = false
            state.archiveName = action.payload.data.result
            state.error = ''
            state.isLoading = false
            state.sideAlert = action.payload.data.sideAlert
        }),
        builder.addCase(removeArchiveList.rejected, (state, action) => {
            state.notFound = false
            state.isLoading = false
            state.sideAlert = action.payload.sideAlert
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

export const { clearAlert, clearMailStatus } = archiveSlice.actions

export default archiveSlice.reducer