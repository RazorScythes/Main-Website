import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    alert: '',
    variant: '',
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
        console.log(action.payload.data.result)
        state.data = action.payload.data.result
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(getPortfolio.rejected, (state, action) => {
        state.error = action.payload
      }),
      builder.addCase(uploadHero.fulfilled, (state, action) => {
        state.data = action.payload.data.result
        state.alert = action.payload.data.alert
        state.variant = action.payload.data.variant
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(uploadHero.rejected, (state, action) => {
        state.error = action.payload
      })
    },
    reducers: {
      clearAlert: (state) => {
        state.alert = '',
        state.variant = ''
      }
    },
})

export const { clearAlert } = portfolioSlice.actions

export default portfolioSlice.reducer