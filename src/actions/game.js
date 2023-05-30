import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    notFound: false,
    alert: '',
    variant: '',
    data: {},
    games: [],
    comments: [],
    relatedGames: [],
    avatar: '',
    message: '',
    forbiden: '',
    sideAlert: {}
}

export const getGames = createAsyncThunk('game/getGames', async (form, thunkAPI) => {
    try {
        const response = await api.getGames(form)
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

export const addRatings = createAsyncThunk('game/addRatings', async (form, thunkAPI) => {
    try {
        const response = await api.addRatings(form)
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

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGames.fulfilled, (state, action) => {
            state.games = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getGames.rejected, (state, action) => {
            state.message = action.payload.message
        }),
        builder.addCase(addRatings.fulfilled, (state, action) => {
            //Filtering the objects and replacing the matching ones
            const filteredObjects = state.games.map(obj => {
                if (obj._id === action.payload.data.result._id) {return action.payload.data.result;}
                return obj;
            });

            state.games = filteredObjects
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(addRatings.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
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

export const { clearAlert, clearMailStatus } = gameSlice.actions

export default gameSlice.reducer