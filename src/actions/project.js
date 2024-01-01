import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    category_loading: false,
    alert: '',
    variant: '',
    paragraph: '',
    project: {},
    user_project: [],
    category: [],
    user_category: []
}

export const uploadProject = createAsyncThunk('project/uploadProject', async (form, thunkAPI) => {
    try {
        const response = await api.uploadProject(form)
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

export const getCategory = createAsyncThunk('project/getCategory', async (form, thunkAPI) => {
    try {
        const response = await api.getCategory(form)
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

export const getUserProject = createAsyncThunk('project/getUserProject', async (form, thunkAPI) => {
    try {
        const response = await api.getUserProject(form)
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

export const getAdminCategory = createAsyncThunk('project/getAdminCategory', async (form, thunkAPI) => {
    try {
        const response = await api.getAdminCategory(form)
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

export const getProjects = createAsyncThunk('project/getProjects', async (form, thunkAPI) => {
    try {
        const response = await api.getProjects(form)
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

export const editUserProject = createAsyncThunk('project/editUserProject', async (form, thunkAPI) => {
    try {
        const response = await api.editUserProject(form)
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

export const removeUserProject = createAsyncThunk('project/removeUserProject', async (form, thunkAPI) => {
    try {
        const response = await api.removeUserProject(form)
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

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.notFound = false
            state.user_category = action.payload.data.result
            state.error = ''
            state.category_loading = false
        }),
        builder.addCase(getCategory.pending, (state, action) => {
            state.notFound = false
            state.category_loading = true
        }),
        builder.addCase(getAdminCategory.fulfilled, (state, action) => {
            state.notFound = false
            state.category = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getAdminCategory.pending, (state, action) => {
            state.notFound = false
            state.isLoading = true
        }),
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.notFound = false
            state.user_project = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getProjects.pending, (state, action) => {
            state.notFound = false
            state.isLoading = true
        }),
        builder.addCase(uploadProject.fulfilled, (state, action) => {
            state.project = action.payload.data.result
            state.alert = action.payload.data.message
            state.variant = action.payload.data.variant
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(uploadProject.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(getUserProject.fulfilled, (state, action) => {
            state.project = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getUserProject.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(editUserProject.fulfilled, (state, action) => {
            state.project = action.payload.data.result
            state.alert = action.payload.data.message
            state.variant = action.payload.data.variant
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(editUserProject.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(removeUserProject.fulfilled, (state, action) => {
            state.project = action.payload.data.result
            state.alert = action.payload.data.message
            state.variant = action.payload.data.variant
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(removeUserProject.rejected, (state, action) => {
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

export const { clearAlert, clearMailStatus } = projectSlice.actions

export default projectSlice.reducer