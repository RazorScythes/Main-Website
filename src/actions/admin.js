import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    data: {}
}

export const getOverviewData = createAsyncThunk('admin/getOverviewData', async (form, thunkAPI) => {
    try {
        const response = await api.getOverviewData(form)
        return response
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getOverviewData.pending, (state) => {
        state.isLoading = true
      }),
      builder.addCase(getOverviewData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.error = ''
        state.isLoading = false
      })
    },
    reducers: {

    },
})
  
// Action creators are generated for each case reducer function
export const {  } = adminSlice.actions
  
export default adminSlice.reducer