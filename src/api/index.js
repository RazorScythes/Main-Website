import axios from 'axios'

let Admin_API, User_API

if(import.meta.env.VITE_DEVELOPMENT == "true"){
    Admin_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}/admin`})
    User_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}`})
}
else {
    Admin_API = axios.create({ baseURL: `https://main-api-eight.vercel.app/`})
    User_API = axios.create({ baseURL: `https://main-api-eight.vercel.app/`})
}
const headers = {
    'content-type': 'multipart/form-data'
}

/*
    Sign in
*/
export const SignIn                                     = (formData) => User_API.post('/auth/signin', formData)
export const getAccountRole                             = () => Admin_API.get('/accounts/')


/*
    Portfolio
*/
export const getPortfolio                               = (formData) => User_API.post('/portfolio/getPortfolio', formData)
export const uploadPortfolioHero                        = (formData) => User_API.post('/portfolio/hero', formData)
export const uploadPortfolioSkills                      = (formData) => User_API.post('/portfolio/skills', formData)
export const uploadPortfolioServices                    = (formData) => User_API.post('/portfolio/services', formData, {headers})