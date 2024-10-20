import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestAPI } from '../api/function'

const initialState = {
    error           : '',
    isLoading       : false,
    alert           : '',
    variant         : '',
    data            : {},
}

export const getLogs = createAsyncThunk('logs/getLogs', async (form, thunkAPI) => {
  try {
      const response = await api.getLogs(form);
      return response;
  } catch (err) {
      if (err.response && err.response.data)
          return thunkAPI.rejectWithValue(err.response.data);

      return { 
          variant: 'danger',
          message: "409: there was a problem with the server."
      };
  }
});


export const logsSlice = createSlice({
    name: 'logs',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLogs.fulfilled, (state, action) => {
            state.data      = action.payload.data.result
            state.error     = ''
            state.isLoading = false
        }),
        builder.addCase(getLogs.rejected, (state, action) => {
            state.alert     = action.payload.message
            state.variant   = action.payload.variant
        })
    },
    reducers: {
      clearAlert: (state) => {
        state.alert         = '',
        state.variant       = ''
      },
      clearMailStatus: (state) => {
        state.mailStatus    = ''
      },
    },
})

export const { clearAlert, clearMailStatus } = logsSlice.actions

export default logsSlice.reducer