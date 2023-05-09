import React, { useEffect, useState } from 'react'
import { Header } from './index'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { getUserVideo, uploadVideo, clearAlert } from "../../actions/uploads";
import VideoModal from '../VideoModal';
import Alert from '../Alert';
import styles from '../../style'
const Uploads = ({ user }) => {
    const dispatch = useDispatch()

    const alert = useSelector((state) => state.uploads.alert)
    const variant = useSelector((state) => state.uploads.variant)
    const video = useSelector((state) => state.uploads.video)

    const [searchParams, setSearchParams] = useSearchParams();
    const [openModal, setOpenModal] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [tags, setTags] = useState([])
    const [error, setError] = useState(false)
    const [form, setForm] = useState({
        title: '',
        link: '',
        owner: '',
        tags: [],
        strict: false,
        privacy: false
    })
    const [input, setInput] = useState({
        tags: ''
    })
    
    const [showAlert, setShowAlert] = useState(false)
    const [alertInfo, setAlertInfo] = useState({
        alert: '',
        variant: ''
    })

    const paramIndex = searchParams.get('type') === null || searchParams.get('type') === ''
    const checkParams = (val) => {return searchParams.get('type') === val}

    useEffect(() => {
        dispatch(getUserVideo({ id: user.result?._id }))
    }, [])

    useEffect(() => {
        setTags([])
        setForm({
            title: '',
            link: '',
            owner: '',
            tags: [],
            strict: false,
            privacy: false
        })
        setInput({
            tags: ''
        })
        setSubmitted(false)
    }, [video])

    useEffect(() => {
        if(alert && variant){
            setAlertInfo({ ...alertInfo, alert: alert, variant: variant })
            setShowAlert(true)
            window.scrollTo(0, 0)

            dispatch(clearAlert())
        }
    }, [alert, variant])

    const addTags = () => {
        let duplicate = false

        if(input.tags.length === 0) return;

        tags.forEach(item => { if(input.tags.profession === item) duplicate = true })

        if(duplicate) { duplicate = false; return;}

        setTags(tags.concat(input.tags))

        setInput({...input, tags: ''})
    }

    const deleteTags = (e) => {
        let arr = [...tags]
        arr.splice(e.currentTarget.id, 1)
        setTags([...arr])
    }

    const checkDriveValidity = (url) => {
        const urlPattern = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/preview$/;
        const urlString = url;

        if(urlPattern.test(urlString)) setError(false)
        else setError(true)
    }

    const handleSubmit = () => {
        if(error || !form.title || !form.link) return

        const obj = {...form}
        obj['tags'] = tags

        dispatch(uploadVideo({
            id: user.result?._id,
            data: obj
        }))
    }

    return (
        <div className="relative bg-white">   

            <VideoModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                link={form.link}
            />

            <Header 
                heading='Uploads'
                description="Select a website to manage, or create a new one from scratch."
                button_text="Explore Now!"
                button_link={`#`}
            />
            <div className="relative bg-[#F0F4F7]">   
                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className="container mx-auto relative px-0 sm:px-4 pb-16 pt-8">
                            <div className='flex flex-row flex-wrap items-start justify-start mb-4'>
                                <Link to={`/account/uploads`}><p style={{backgroundColor: paramIndex || checkParams('video') && 'rgb(31, 41, 55)', color: paramIndex || checkParams('video') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Video ({video && video.length > 0 ? video.length : 0})</p></Link>
                                <Link to={`/account/uploads?type=latest`}><p style={{backgroundColor: checkParams('latest') && 'rgb(31, 41, 55)', color: checkParams('latest') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Latest</p></Link>
                                <Link to={`/account/uploads?type=most_viewed`}><p style={{backgroundColor: checkParams('most_viewed') && 'rgb(31, 41, 55)', color: checkParams('most_viewed') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Most Viewed</p></Link>
                                <Link to={`/account/uploads?type=popular`}><p style={{backgroundColor: checkParams('popular') && 'rgb(31, 41, 55)', color: checkParams('popular') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Popular</p></Link>
                            </div>

                            {
                                paramIndex || checkParams('video') && (
                                    <div className="md:flex items-start justify-center mt-8">
                                        <div className="lg:w-1/2 md:w-1/2 w-full">
                                            {
                                                alertInfo.alert && alertInfo.variant && showAlert &&
                                                    <Alert variants={alertInfo.variant} text={alertInfo.alert} show={showAlert} setShow={setShowAlert} />
                                            }
                                            <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                <div className='flex flex-col'>
                                                    <label className='font-semibold'> Video Title: </label>
                                                    <input 
                                                        type="text" 
                                                        className='p-2 border border-solid border-[#c0c0c0]'
                                                        value={form.title}
                                                        onChange={(e) => setForm({...form, title: e.target.value})}
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                <div className='flex flex-col'>
                                                    <label className='font-semibold'> Google Drive Embed Link: </label>
                                                    <div className='flex'>
                                                        <input 
                                                            style={{borderColor: error && "red"}}
                                                            type="text" 
                                                            className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                            value={form.link}
                                                            onChange={(e) => {
                                                                setForm({...form, link: e.target.value})
                                                                checkDriveValidity(e.target.value)
                                                            }}
                                                        />
                                                        <div className='flex flex-row items-end'>
                                                            <button onClick={() => setOpenModal(true)} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Preview</button>
                                                        </div>
                                                    </div>
                                                    { error && <span className='leading-tight text-sm mb-2 mt-1 text-[#FF0000]'>Invalid Google Drive Link</span> }
                                                    <p className='text-gray-500 text-sm italic'>ex: https://drive.google.com/file/d/[file_id]/preview (change the file_id)</p>
                                                </div>
                                            </div>    

                                            <div className="flex items-center mb-2 pt-2">
                                                <input 
                                                    id="default-checkbox" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={form.privacy}
                                                    onChange={(e) => setForm({...form, privacy: !form.privacy})}
                                                />
                                                <label htmlFor="default-checkbox" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Private</label>
                                            </div>

                                            <div className="flex items-center mb-4 pt-2">
                                                <input 
                                                    id="default-checkbox" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={form.strict}
                                                    onChange={(e) => setForm({...form, strict: !form.strict})}
                                                />
                                                <label htmlFor="default-checkbox" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Safe Content Restriction</label>
                                            </div>     

                                            <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                <div className='flex flex-col'>
                                                    <label className='font-semibold'> Artist Name: </label>
                                                    <input 
                                                        type="text" 
                                                        className='p-2 border border-solid border-[#c0c0c0]'
                                                        value={form.owner}
                                                        onChange={(e) => setForm({...form, owner: e.target.value})}
                                                    />
                                                </div>
                                            </div>             

                                            <div className='grid grid-cols-1  gap-5 place-content-start'>
                                                <div className='flex flex-col'>
                                                    <label className='font-semibold'> Add Tags: </label>
                                                    <div className='flex flex-row'>
                                                        <input 
                                                            type="text" 
                                                            className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                            value={input.tags}
                                                            onChange={(e) => setInput({...input, tags: e.target.value})}
                                                        />
                                                        <div className='flex flex-row items-end'>
                                                            <button onClick={addTags} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>        

                                            <div className='flex flex-wrap items-center mt-2 mb-4 relative'>
                                                {
                                                    tags && tags.length > 0 &&
                                                        tags.map((item, index) => {
                                                            return (
                                                                <div key={index} className='flex items-center relative mt-2 bg-gray-100 hover:text-gray-800 text-gray-800 border-2 border-gray-800 px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                    <p>{item}</p>
                                                                    <FontAwesomeIcon onClick={deleteTags} id={index} icon={faClose} className="ml-2 cursor-pointer" />
                                                                </div>
                                                            )
                                                        })
                                                }
                                            </div>
                                            
                                            <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                <button onClick={handleSubmit} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                                                    {
                                                        !submitted ?
                                                        "Upload Video"
                                                        :
                                                        <div className='flex flex-row justify-center items-center'>
                                                            Uploading
                                                            <div role="status">
                                                                <svg aria-hidden="true" class="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                                </svg>
                                                                <span class="sr-only">Loading...</span>
                                                            </div>
                                                        </div>
                                                    }
                                                </button>
                                            </div> 
                                        </div>

                                        <div className="lg:w-1/2 md:w-1/2 w-full">

                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uploads