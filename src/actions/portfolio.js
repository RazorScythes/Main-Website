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
        if(err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

        return({ 
            variant: 'danger',
            message: "409: there was a problem with the server."
        })
    }
})

export const uploadSkills = createAsyncThunk('portfolio/uploadSkills', async (form, thunkAPI) => {
  try {
      const response = await api.uploadPortfolioSkills(form)
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

export const uploadServices = createAsyncThunk('portfolio/uploadServices', async (form, thunkAPI) => {
  try {
      const response = await api.uploadPortfolioServices(form)
      return response
  }
  catch (err) {
      console.log(err.response)
      if(err.response.data)
        return thunkAPI.rejectWithValue(err.response.data);

      return({ 
          variant: 'danger',
          message: "409: there was a problem with the server."
      })
  }
})

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async (form, thunkAPI) => {
    try {
        const response = await api.getPortfolio(form)
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

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getPortfolio.fulfilled, (state, action) => {
        state.data = action.payload.data.result
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(getPortfolio.rejected, (state, action) => {
        state.alert = action.payload.message
        state.variant = action.payload.variant
      }),
      builder.addCase(uploadHero.fulfilled, (state, action) => {
        state.data = action.payload.data.result
        state.alert = action.payload.data.alert
        state.variant = action.payload.data.variant
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(uploadHero.rejected, (state, action) => {
        state.alert = action.payload.message
        state.variant = action.payload.variant
      }),
      builder.addCase(uploadSkills.fulfilled, (state, action) => {
        state.data = action.payload.data.result
        state.alert = action.payload.data.alert
        state.variant = action.payload.data.variant
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(uploadSkills.rejected, (state, action) => {
        state.alert = action.payload.message
        state.variant = action.payload.variant
      }),
      builder.addCase(uploadServices.fulfilled, (state, action) => {
        state.data = action.payload.data.result
        state.alert = action.payload.data.alert
        state.variant = action.payload.data.variant
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(uploadServices.rejected, (state, action) => {
        state.alert = action.payload.message
        state.variant = action.payload.variant
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