import axios from 'axios'

const Admin_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}/admin`})
const User_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}`})

const headers = {
    'content-type': 'multipart/form-data'
}

/*
    Sign in
*/
export const SignIn                 = (formData) => Admin_API.post('/auth/signin', formData)
export const getAccountRole         = () => Admin_API.get('/accounts/')