import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    data: {}
}

export const signin = createAsyncThunk('user/getUser', async (form, thunkAPI) => {
    try {
        const response = await api.SignIn(form)
        return response
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(signin.pending, (state) => {
        state.isLoading = true
      }),
      builder.addCase(signin.fulfilled, (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action.payload?.data }));
        state.data = action.payload.data
        state.error = ''
        state.isLoading = false
      }),
      builder.addCase(signin.rejected, (state, action) => {
        state.error = action.payload
      })
    },
    reducers: {
      logout: (state) => {
        localStorage.removeItem('profile')
        state.error = ''
        state.isLoading = false
        state.data = {}
      }
    },
})
  
// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
  
export default authSlice.reducer