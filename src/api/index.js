import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

let Admin_API, User_API

if(import.meta.env.VITE_DEVELOPMENT == "true"){
    Admin_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}/admin`})
    User_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}`})
}
else {
    Admin_API = axios.create({ baseURL: `https://main-api-eight.vercel.app/`})
    User_API = axios.create({ baseURL: `https://main-api-eight.vercel.app/`})
}

User_API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.token = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    if(cookies.get('uid')){
        req.headers.uid = `${cookies.get('uid')}`;
    }
    return req;
});

// User_API.interceptors.request.use((req) => {
//     if(cookies.get('uid')){
//         req.headers.uid = `${cookies.get('uid')}`;
//     }
//     return req;
// });

const options = {
    headers: {
        // Authorization: `Bearer ${cookies.get('myCat')}`
    },
    withCredentials: true,
};


/*
    Sign in
*/
export const SignIn                                     = (formData) => User_API.post('/auth/signin', formData)
export const getAccountRole                             = () => Admin_API.get('/accounts/')


/*
    Portfolio
*/
export const getProject                                 = (formData) => User_API.post('/portfolio/getProject', formData)
export const publishPortfolio                           = (formData) => User_API.post('/portfolio/publishPortfolio', formData)
export const unpublishPortfolio                         = (formData) => User_API.post('/portfolio/unpublishPortfolio', formData)
export const getPortfolio                               = (formData) => User_API.post('/portfolio/getPortfolio', formData)
export const getPortfolioByUsername                     = (formData) => User_API.post('/portfolio/getPortfolioByUsername', formData, options)
export const uploadPortfolioHero                        = (formData) => User_API.post('/portfolio/hero', formData)
export const uploadPortfolioSkills                      = (formData) => User_API.post('/portfolio/skills', formData)
export const uploadPortfolioServices                    = (formData) => User_API.post('/portfolio/services', formData)
export const addPortfolioExperience                     = (formData) => User_API.post('/portfolio/addExperience', formData)
export const updatePortfolioExperience                  = (formData) => User_API.post('/portfolio/updateExperience', formData)
export const addPortfolioProject                        = (formData) => User_API.post('/portfolio/addProject', formData)
export const updatePortfolioProject                     = (formData) => User_API.post('/portfolio/updateProject', formData)
export const deletePortfolioProject                     = (formData) => User_API.post('/portfolio/deleteProject', formData)
export const uploadPortfolioContacts                    = (formData) => User_API.post('/portfolio/uploadContacts', formData)
export const sendTestEmail                              = (formData) => User_API.post('/portfolio/testEmail', formData)
export const sendEmail                                  = (formData) => User_API.post('/portfolio/sendEmail', formData)
export const sendContactUs                              = (formData) => User_API.post('/portfolio/sendContactUs', formData)

/*
    Settings
*/
export const userToken                                  = (formData) => User_API.post('/settings/userToken', formData)
export const verifyEmail                                = (formData) => User_API.post('/settings/verifyEmail', formData)
export const sendVerificationEmail                      = (formData) => User_API.post('/settings/sendVerificationEmail', formData)
export const getProfile                                 = (formData) => User_API.post('/settings/getProfile', formData)
export const updateProfile                              = (formData) => User_API.post('/settings/updateProfile', formData)
export const updatePassword                             = (formData) => User_API.post('/settings/updatePassword', formData)
export const updateOptions                              = (formData) => User_API.post('/settings/updateOptions', formData)

/*
    Uploads
*/
export const getUserVideo                               = (formData) => User_API.post('/uploads/getUserVideo', formData)
export const getUserGame                                = (formData) => User_API.post('/uploads/getUserGame', formData)
export const getUserBlog                                = (formData) => User_API.post('/uploads/getUserBlog', formData)
export const uploadVideo                                = (formData) => User_API.post('/uploads/uploadVideo', formData)
export const uploadGame                                 = (formData) => User_API.post('/uploads/uploadGame', formData)
export const uploadBlog                                 = (formData) => User_API.post('/uploads/uploadBlog', formData)
export const editVideo                                  = (formData) => User_API.post('/uploads/editVideo', formData)
export const editGame                                   = (formData) => User_API.post('/uploads/editGame', formData)
export const editBlog                                   = (formData) => User_API.post('/uploads/editBlog', formData)
export const removeVideo                                = (formData) => User_API.post('/uploads/removeVideo', formData)
export const bulkRemoveVideo                            = (formData) => User_API.post('/uploads/bulkRemoveVideo', formData)
export const removeGame                                 = (formData) => User_API.post('/uploads/removeGame', formData)
export const bulkRemoveGame                             = (formData) => User_API.post('/uploads/bulkRemoveGame', formData)
export const changePrivacyById                          = (formData) => User_API.post('/uploads/changePrivacyById', formData)
export const changeStrictById                           = (formData) => User_API.post('/uploads/changeStrictById', formData)
export const changeGamePrivacyById                      = (formData) => User_API.post('/uploads/changeGamePrivacyById', formData)
export const changeGameStrictById                       = (formData) => User_API.post('/uploads/changeGameStrictById', formData)
export const changeDownloadById                         = (formData) => User_API.post('/uploads/changeDownloadById', formData)

/*
    Logs
*/
export const getLogs                                    = (formData) => User_API.post('/logs/getLogs', formData)

/*
    Video
*/
export const getVideos                                  = (formData) => User_API.post('/video/getVideos', formData)
export const addOneLikes                                = (formData) => User_API.post('/video/addOneLikes', formData)
export const addOneDislikes                             = (formData) => User_API.post('/video/addOneDislikes', formData)
export const addOneViews                                = (formData) => User_API.post('/video/addOneViews', formData)
export const getVideoByID                               = (formData) => User_API.post('/video/getVideoByID', formData)
export const getVideoByTag                              = (formData) => User_API.post('/video/getVideoByTag', formData)
export const getVideoByArtist                           = (formData) => User_API.post('/video/getVideoByArtist', formData)
export const getVideoBySearchKey                        = (formData) => User_API.post('/video/getVideoBySearchKey', formData)
export const getComments                                = (formData) => User_API.post('/video/getComments', formData)
export const getRelatedVideos                           = (formData) => User_API.post('/video/getRelatedVideos', formData)
export const uploadComment                              = (formData) => User_API.post('/video/uploadComment', formData)
export const removeComment                              = (formData) => User_API.post('/video/removeComment', formData)
export const addToWatchLater                            = (formData) => User_API.post('/video/addToWatchLater', formData)
export const countVideoTags                             = (formData) => User_API.post('/video/countVideoTags', formData)

/*
    Game
*/

export const getGameByID                                = (formData) => User_API.post('/game/getGameByID', formData)
export const getGames                                   = (formData) => User_API.post('/game/getGames', formData)
export const getRelatedGames                            = (formData) => User_API.post('/game/getRelatedGames', formData)
export const addRatings                                 = (formData) => User_API.post('/game/addRatings', formData, options)
export const countTags                                  = (formData) => User_API.post('/game/countTags', formData, options)
export const getGameByTag                               = (formData) => User_API.post('/game/getGameByTag', formData)
export const getGameByDeveloper                         = (formData) => User_API.post('/game/getGameByDeveloper', formData)
export const getGameBySearchKey                         = (formData) => User_API.post('/game/getGameBySearchKey', formData)

/*
    Blogs
*/

export const getBlogs                                   = (formData) => User_API.post('/blogs/getBlogs', formData)
export const getBlogByID                                = (formData) => User_API.post('/blogs/getBlogByID', formData)
export const getBlogComments                            = (formData) => User_API.post('/blogs/getBlogComments', formData)
export const uploadBlogComment                          = (formData) => User_API.post('/blogs/uploadBlogComment', formData)
export const removeBlogComment                          = (formData) => User_API.post('/blogs/removeBlogComment', formData)
export const countBlogCategories                        = (formData) => User_API.post('/blogs/countBlogCategories', formData)
export const addOneBlogViews                            = (formData) => User_API.post('/blogs/addOneBlogViews', formData)
export const addOneBlogLikes                            = (formData) => User_API.post('/blogs/addOneBlogLikes', formData)