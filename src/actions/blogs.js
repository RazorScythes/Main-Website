import * as api from '../api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    error: '',
    isLoading: false,
    notFound: false,
    alert: '',
    variant: '',
    data: {},
    blogs: [],
    comments: [],
    relatedBlogs: [],
    avatar: '',
    message: '',
    forbiden: '',
    sideAlert: {},
    tagsCount: []
}

export const getBlogByID = createAsyncThunk('blog/getBlogByID', async (form, thunkAPI) => {
    try {
        const response = await api.getBlogByID(form)
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

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (form, thunkAPI) => {
    try {
        const response = await api.getBlogs(form)
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

export const getBlogComments = createAsyncThunk('blog/getBlogComments', async (form, thunkAPI) => {
    try {
        const response = await api.getBlogComments(form)
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

export const uploadBlogComment = createAsyncThunk('blog/uploadBlogComment', async (form, thunkAPI) => {
    try {
        const response = await api.uploadBlogComment(form)
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

export const removeBlogComment = createAsyncThunk('blog/removeBlogComment', async (form, thunkAPI) => {
    try {
        const response = await api.removeBlogComment(form)
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

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBlogByID.fulfilled, (state, action) => {
            state.notFound = false
            state.data = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getBlogByID.pending, (state, action) => {
            state.notFound = false
            state.isLoading = true
        }),
        builder.addCase(getBlogComments.fulfilled, (state, action) => {
            state.comments = action.payload.data.comments
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getBlogComments.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(removeBlogComment.fulfilled, (state, action) => {
            state.comments = action.payload.data.comments
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(removeBlogComment.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(uploadBlogComment.fulfilled, (state, action) => {
            state.comments = action.payload.data.comments
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(uploadBlogComment.rejected, (state, action) => {
            state.alert = action.payload.message
            state.variant = action.payload.variant
        }),
        builder.addCase(getBlogByID.rejected, (state, action) => {
            state.forbiden = action.payload.forbiden
            state.alert = action.payload.message
            state.variant = action.payload.variant
            state.notFound = action.payload.notFound
            state.isLoading = false
        }),
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.notFound = false
            state.blogs = action.payload.data.result
            state.error = ''
            state.isLoading = false
        }),
        builder.addCase(getBlogs.pending, (state, action) => {
            state.notFound = false
            state.isLoading = true
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

export const { clearAlert, clearMailStatus } = blogsSlice.actions

export default blogsSlice.reducer