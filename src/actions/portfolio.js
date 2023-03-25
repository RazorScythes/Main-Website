import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    data: {}
}

export const uploadHero = createAsyncThunk('portfolio/uploadHero', async (form, thunkAPI) => {
    try {
        const response = await api.uploadPortfolioHero(form)
        return response
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async (form, thunkAPI) => {
    try {
        const response = await api.getPortfolio(form)
        return response
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getPortfolio.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(getPortfolio.rejected, (state, action) => {
        state.error = action.payload
      }),
      builder.addCase(uploadHero.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(uploadHero.rejected, (state, action) => {
        state.error = action.payload
      })
    },
    reducers: {
      
    },
})

export default portfolioSlice.reducer