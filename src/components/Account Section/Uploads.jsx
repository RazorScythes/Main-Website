import React, { useEffect, useState } from 'react'
import { Header } from './index'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faEdit, faTrash, faVideoCamera, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { getUserVideo, uploadVideo, clearAlert, editVideo, removeVideo, changePrivacyById, changeStrictById, changeDownloadById, bulkRemoveVideo } from "../../actions/uploads";
import axios from 'axios';
import VideoModal from '../VideoModal';
import Alert from '../Alert';
import VideoTableData from './sections/VideoTableData';
import ImageModal from '../ImageModal';
import styles from '../../style'

const Uploads = ({ user }) => {
    const dispatch = useDispatch()

    const alert = useSelector((state) => state.uploads.alert)
    const variant = useSelector((state) => state.uploads.variant)
    const video = useSelector((state) => state.uploads.video)

    const itemsPerPage = 10; // Number of items per page

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [searchParams, setSearchParams] = useSearchParams();
    const [openModal, setOpenModal] = useState(false)
    const [recordOpenModal, setRecordOpenModal] = useState(false)
    const [videoRecord, setVideoRecord] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [tags, setTags] = useState([])
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [data, setData] = useState(null)
    const [form, setForm] = useState({
        title: '',
        link: '',
        owner: '',
        tags: [],
        strict: true,
        privacy: false,
        downloadable: false
    })
    const [input, setInput] = useState({
        tags: '',
        gameTags: '',
        gallery: '',
        storage_name: 'Google Drive',
        link_list: []
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
        if(video && video.length > 0){
            setData(video)
        }
        setTags([])
        setForm({
            title: '',
            link: '',
            owner: '',
            tags: [],
            strict: true,
            privacy: false,
            downloadable: false
        })
        setInput({tags: '', gameTags: '', gallery: '', storage_name: 'Google Drive', link_list: []})
        setSubmitted(false)
        setEdit(false)
        setCurrentIndex(0)
        //setCurrentPage(1)
    }, [video])

    useEffect(() => {
        if(alert && variant){
            setAlertInfo({ ...alertInfo, alert: alert, variant: variant })
            setShowAlert(true)
            window.scrollTo(0, 0)

            dispatch(clearAlert())
        }
    }, [alert, variant])

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const addTags = () => {
        let duplicate = false
        if(input.tags.length === 0) return;
        tags.forEach(item => { if(input.tags === item) duplicate = true })
        if(duplicate) { duplicate = false; return;}
        setTags(tags.concat(input.tags))
        setInput({...input, tags: ''})
    }

    const deleteTags = (e) => {
        let arr = [...gameTags]
        arr.splice(e.currentTarget.id, 1)
        setGameTags([...arr])
    }

    const checkDriveValidity = (url) => {
        const urlPattern = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/preview$/;
        const urlString = url;

        if(urlPattern.test(urlString)) setError(false)
        else setError(true)
    }

    const editMode = (index) =>{
        window.scrollTo(0, 150)
        setCurrentIndex(index)
        setForm({
            title: video[index].title,
            link: video[index].link,
            owner: video[index].owner,
            tags: video[index].tags,
            strict: video[index].strict,
            privacy: video[index].privacy,
            downloadable: video[index].downloadable
        })

        setTags(video[index].tags)
        setEdit(true)
    }

    const cancelEdit = () => {
        setTags([])
        setForm({
            title: '',
            link: '',
            owner: '',
            tags: [],
            strict: true,
            privacy: false,
            downloadable: false
        })
        setInput({ tags: '', gameTags: '', gallery: ''})
        setEdit(false)
        setCurrentIndex(0)
    }

    const deleteVideo = (index) => {
        if(confirm(`Are you sure you want to delete video ${video[index].title}?`)) {
            dispatch(removeVideo({ 
                id: user.result?._id,
                video_id: video[index]._id 
            }))
        }
    }

    const handleEdit = () =>{
        if(error || !form.title || !form.link) return

        if(!submitted) {
            let updatedRecord = {
                ...data[currentIndex],
                title: form.title,
                link: form.link,
                owner: form.owner,
                tags: tags,
                strict: form.strict,
                privacy: form.privacy,
                downloadable: form.downloadable
            }

            dispatch(editVideo({
                id: user.result?._id,
                data: updatedRecord
            }))

            setSubmitted(true)
        }
    }

    const handleSubmit = () => {
        if(error || !form.title || !form.link) return

        if(!submitted) {
            const obj = {...form}
            obj['tags'] = tags

            dispatch(uploadVideo({
                id: user.result?._id,
                data: obj
            }))

            setSubmitted(true)
        }
    }

    const [bulkStatus, setBulkStatus] = useState(false)
    const [bulkForm, setBulkForm] = useState({
        api_key: '',
        drive_id: '',
        title: '',
        link: '',
        owner: '',
        privacy: false,
        strict: true,
        downloadable: false,
        tags: []
    })

    const [bulkTags, setBulkTags] = useState('')
    const [showBulkAlert, setShowBulkAlert] = useState(false)
    const [bulkSubmitted, setBulkSubmitted] = useState(false)
    const [bulkAlert, setBulkAlert] = useState({
        variant: '',
        message: ''
    })
    const [bulkUpload, setBulkUpload] = useState(false)
    
    useEffect(() => {
        if(bulkUpload) {
            setBulkUpload(false)
            setBulkSubmitted(false)
            setBulkForm({
                ...bulkForm,
                drive_id: '',
                title: '',
                link: '',
                owner: '',
                privacy: false,
                strict: true,
                downloadable: false,
                tags: []
            })
            setBulkTags('')
        }
    }, [bulkUpload])

    const addBulkTags = () => {
        let duplicate = false

        if(bulkTags.length === 0) return;

        bulkForm.tags.forEach(item => { if(bulkTags === item) duplicate = true })

        if(duplicate) { duplicate = false; return;}

        setBulkForm({...bulkForm, tags: bulkForm.tags.concat(bulkTags)})

        setBulkTags('')
    }

    const deleteBulkTags = (e) => {
        let arr = [...bulkForm.tags]
        arr.splice(e.currentTarget.id, 1)
        setBulkForm({...bulkForm, tags: [...arr]})
    }

    const is64CharactersNoSpaces = (str) => {
        return str.length > 60 && !str.includes(" ");
    }

    const fetchDriveFiles = async (api_key, drive_id) => {
        try {
          // Parent folder ID
          const parentFolderId = drive_id;
  
          // API key
          const apiKey = api_key;
  
          // Request URL with API key
          const url = `https://www.googleapis.com/drive/v3/files?q='${parentFolderId}' in parents and trashed=false&fields=files(id,name)&key=${apiKey}`;
  
          // Make the GET request to the Google Drive API
          const response = await axios.get(url);
  
          // Extract the file names and IDs from the response
          const filesData = response.data.files;
          const fileDetails = filesData.map(file => ({
            id: file.id,
            name: file.name
          }));
  
          // Set the file details in the state
          return fileDetails;
        } catch (err) {
            return err.response.data.error
        }
    };

    const handleBulkInsert = async () => {
        if(!bulkForm.api_key || !bulkForm.drive_id || !bulkForm.owner) return 

        const files = await fetchDriveFiles(bulkForm.api_key, bulkForm.drive_id)

        if(files.code && files.message) {
            setBulkAlert({
                variant: 'danger',
                message: `${files.code}: ${files.message}`
            })
            setShowBulkAlert(true)
        }
        else {
            if(!setBulkSubmitted) return

            setBulkSubmitted(true)

            var num_video_count = 1;
            var file_count = 1
            var User_API
            
            if(import.meta.env.VITE_DEVELOPMENT == "true"){
                User_API = axios.create({ baseURL: `${import.meta.env.VITE_APP_PROTOCOL}://${import.meta.env.VITE_APP_LOCALHOST}:${import.meta.env.VITE_APP_SERVER_PORT}`})
            }
            else {
                User_API = axios.create({ baseURL: `https://main-api-eight.vercel.app/`})
            }

            files.forEach(async (file) => {
                if(file.name.toLowerCase().includes(".gif") || file.name.toLowerCase().includes(".png") || file.name.toLowerCase().includes(".jpg")) {
                    file_count = file_count + 1
                    return
                }

                var longTitle = false
                if(is64CharactersNoSpaces(file.name.replace(/\.mp4$/, ""))) longTitle = true
                const video_obj = {
                    id: user.result?._id,
                    data: {
                        title: longTitle ? `${bulkForm.owner} #${num_video_count}` : file.name.replace(/\.mp4$/, ""),
                        link: `https://drive.google.com/file/d/${file.id}/preview`,
                        owner: bulkForm.owner,
                        privacy: bulkForm.privacy,
                        strict: bulkForm.strict,
                        downloadable: bulkForm.downloadable,
                        tags: bulkForm.tags
                    }
                }

                if(longTitle) num_video_count = num_video_count + 1

                try {
                    const response = await User_API.post('/uploads/uploadVideo', video_obj)

                    setBulkAlert({
                        variant: 'success',
                        message: `Video "${video_obj.data.title}" uploaded successfully (files #${file_count})`
                    })
                    setShowBulkAlert(true)

                    if(files.length === file_count) setBulkUpload(true)

                    file_count = file_count + 1
                }
                catch(err) {
                    console.log(err)
                    setBulkAlert({
                        variant: 'danger',
                        message: `Failed to upload video "${video_obj.data.title}"`
                    })
                    setShowBulkAlert(true)
                }
            
            })
        }
    }

    const [deleteId, setDeleteId] = useState([])

    const addDeleteId = (index, id) => {
        const checkId = deleteId.includes(id)

        if(checkId) {
            var arr = deleteId.filter(item => item !== id);
            setDeleteId([...arr])
        }
        else {
            setDeleteId(deleteId.concat(id))
        }
    }

    const deleteMultipleVideos = () => {
        if(confirm(`Are you sure you want to delete ${deleteId.length} video${deleteId.length > 1 ? 's' : ''}?`)){
            dispatch(bulkRemoveVideo({ 
                id: user.result?._id,
                videos_id: deleteId
            }))
            setDeleteId([])
        }
    }

    const [openImageModal, setOpenImageModal] = useState(false)
    const [displayImage, setDisplayImage] = useState('')
    const [preview, setPreview] = useState(false)
    const [gameTags, setGameTags] = useState([])
    const [gameSubmitted, setGameSubmitted] = useState(false)
    const [gameForm, setGameForm] = useState({
        featured_image: '',
        title: '',
        description: '',
        strict: false,
        privacy: false,
        details: {
            latest_version: '',
            censorship: 'Uncensored',
            language: 'English',
            developer: '',
            upload_date: Date.now(),
            platform: 'Desktop'
        },
        leave_uploader_message: '',
        gallery: [],
        download_link: []
    })

    const deleteGameTags = (e) => {
        let arr = [...gameTags]
        arr.splice(e.currentTarget.id, 1)
        setGameTags([...arr])
    }

    const addGameTags = () => {
        let duplicate = false
        if(input.gameTags.length === 0) return;
        gameTags.forEach(item => { if(input.gameTags === item) duplicate = true })
        if(duplicate) { duplicate = false; return;}
        setGameTags(gameTags.concat(input.gameTags))
        setInput({...input, gameTags: ''})
    }

    function checkWebsiteUrl(url) {
        return url.startsWith("https://") && url.includes(".") ? true : false
    }

    const addImageURL = () => {
        let duplicate = false
        if(input.gallery.length === 0 || !checkWebsiteUrl(input.gallery)) return;
        gameForm.gallery.forEach(item => { if(input.gallery === item) duplicate = true })
        if(duplicate) { duplicate = false; return;}
        setGameForm({ ...gameForm, gallery: gameForm.gallery.concat(input.gallery)})
        setInput({ ...input, gallery: ''})
    }

    const deleteImageURL = (e) => {
        let arr = [...gameForm.gallery]
        arr.splice(e.currentTarget.id, 1)
        setGameForm({...gameForm, gallery: [...arr]})
    }

    const addDownloadLink = () => {
        let duplicate = false
        if(input.storage_name.length === 0) return;
        gameForm.download_link.forEach(item => { if(input.storage_name === item.storage_name) duplicate = true })
        if(duplicate) { duplicate = false; return;}
        setGameForm({ ...gameForm, download_link: gameForm.download_link.concat({storage_name: input.storage_name, links: []})})
        setInput({ ...input, storage_name: 'Google Drive'})
    }
    
    const deleteDownloadLink = (e) => {
        let arr = [...gameForm.download_link]
        arr.splice(e.currentTarget.id, 1)
        setGameForm({...gameForm, download_link: [...arr]})
    }

    const addDownloadLinkItem = (e) => {
        if(input.link_list[e.currentTarget.id].length === 0) return;

        const newList = [...gameForm.download_link];
        newList[e.currentTarget.id] = {
        ...newList[e.currentTarget.id],
        links: [...newList[e.currentTarget.id].links, input.link_list[e.currentTarget.id]]
        };

        setGameForm({...gameForm, download_link: newList});

        const newInputList = [...input.link_list];
        newInputList[e.currentTarget.id] = '';

        setInput({...input, link_list: newInputList});
    }

    const deleteDownloadLinkItem = (e, id, parent_id) => {
        let arr = [...gameForm.download_link]
        arr[parent_id].links.splice(id, 1)
        setGameForm({...gameForm, download_link: [...arr]})
    }

    const handleDownloadLinkItemChange = (e) => {
        let arr = [...input.link_list]
        arr[e.currentTarget.id] = e.target.value
        setInput({...input, link_list: [...arr]})
    }   

    const handleGameSubmit = () => {
        const obj = {...gameForm}
        obj['tags'] = gameTags
        console.log(obj)
    }
    return (
        <div className="relative bg-white">   

            <VideoModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                link={form.link}
            />
            <VideoModal
                openModal={recordOpenModal}
                setOpenModal={setRecordOpenModal}
                link={videoRecord}
            />

            <Header 
                heading='Uploads'
                description="Select a website to manage, or create a new one from scratch."
                button_text="Explore Now!"
                button_link={`#`}
            />

            <ImageModal
                openModal={openImageModal}
                setOpenModal={setOpenImageModal}
                image={displayImage}
                preview={preview}
                setPreview={setPreview}
            />

            <div className="relative bg-[#F0F4F7]">   
                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className="container mx-auto relative px-0 sm:px-4 pb-16 pt-8">
                            <div className='flex flex-row flex-wrap items-start justify-start mb-4'>
                                <Link to={`/account/uploads`}><p style={{backgroundColor: (paramIndex || checkParams('video')) && 'rgb(31, 41, 55)', color: (paramIndex || checkParams('video')) && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Video ({video && video.length > 0 ? video.length : 0})</p></Link>
                                <Link to={`/account/uploads?type=games`}><p style={{backgroundColor: checkParams('games') && 'rgb(31, 41, 55)', color: checkParams('games') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Games</p></Link>
                                <Link to={`/account/uploads?type=most_viewed`}><p style={{backgroundColor: checkParams('most_viewed') && 'rgb(31, 41, 55)', color: checkParams('most_viewed') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Most Viewed</p></Link>
                                <Link to={`/account/uploads?type=popular`}><p style={{backgroundColor: checkParams('popular') && 'rgb(31, 41, 55)', color: checkParams('popular') && 'rgb(243, 244, 246)'}} className='mb-2 font-semibold text-sm bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 py-1 px-4 border-2 border-gray-800 hover:border-gray-800 rounded-full transition-colors duration-300 ease-in-out xs:mr-4 mr-2'>Popular</p></Link>
                            </div>

                            {
                                (paramIndex || checkParams('video')) ? (
                                    <div>
                                        <div className="md:flex items-start justify-center mt-8">
                                            <div className="lg:w-1/2 md:w-1/2 w-full">
                                                {
                                                    edit &&
                                                    <div className='grid grid-cols-2  gap-5 place-content-start mb-4 md:mt-0 mt-8'>
                                                        <h2 className='text-3xl font-bold text-gray-800'>Edit</h2>
                                                        <div className='flex justify-end'>
                                                            <button onClick={() => cancelEdit()} className='w-28 disabled:bg-gray-600 disabled:border-gray-600 font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                }        
                                                {
                                                    !edit &&
                                                        <div className='grid grid-cols-2  gap-5 place-content-start mb-4 md:mt-0 mt-8'>
                                                            <h2 className='text-3xl font-bold text-gray-800'></h2>
                                                            <div className='flex justify-end'>
                                                                <button onClick={() => setBulkStatus(!bulkStatus)} className='w-28 disabled:bg-gray-600 disabled:border-gray-600 font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                                                                    { bulkStatus ? 'Single Insert' : 'Bulk Insert' }
                                                                </button>
                                                            </div>
                                                        </div>  
                                                }   
                                                {
                                                    alertInfo.alert && alertInfo.variant && showAlert &&
                                                        <Alert variants={alertInfo.variant} text={alertInfo.alert} show={showAlert} setShow={setShowAlert} />
                                                }
                                                {  
                                                    (edit || !bulkStatus) ?   
                                                        <>              
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

                                                        <div className="flex items-center mb-2 pt-2">
                                                            <input 
                                                                id="default-checkbox2" 
                                                                type="checkbox" 
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                checked={form.strict}
                                                                onChange={(e) => setForm({...form, strict: !form.strict})}
                                                            />
                                                            <label htmlFor="default-checkbox2" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Safe Content Restriction</label>
                                                        </div>     
                                                        
                                                        <div className="flex items-center mb-4 pt-2">
                                                            <input 
                                                                id="default-checkbox8" 
                                                                type="checkbox" 
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                checked={form.downloadable}
                                                                onChange={(e) => setForm({...form, downloadable: !form.downloadable})}
                                                            />
                                                            <label htmlFor="default-checkbox8" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Downloadable</label>
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
                                                            {
                                                                edit ?
                                                                <button onClick={handleEdit} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                                                                    {
                                                                        !submitted ?
                                                                        "Update Changes"
                                                                        :
                                                                        <div className='flex flex-row justify-center items-center'>
                                                                            Update
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
                                                                :
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
                                                            }
                                                        </div> 
                                                        </>
                                                    :
                                                    <>
                                                        {
                                                            bulkAlert.variant && bulkAlert.message && showBulkAlert && 
                                                                <Alert variants={bulkAlert.variant} text={bulkAlert.message} show={showBulkAlert} setShow={setShowBulkAlert} />
                                                        }
                                                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-4'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> API Key: </label>
                                                                <input 
                                                                    type="text" 
                                                                    className='p-2 border border-solid border-[#c0c0c0]'
                                                                    value={bulkForm.api_key}
                                                                    onChange={(e) => setBulkForm({...bulkForm, api_key: e.target.value})}
                                                                />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Drive Parent ID: </label>
                                                                <input 
                                                                    type="text" 
                                                                    className='p-2 border border-solid border-[#c0c0c0]'
                                                                    value={bulkForm.drive_id}
                                                                    onChange={(e) => setBulkForm({...bulkForm, drive_id: e.target.value})}
                                                                />
                                                            </div>
                                                        </div>   

                                                        <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Artist Name: </label>
                                                                <input 
                                                                    type="text" 
                                                                    className='p-2 border border-solid border-[#c0c0c0]'
                                                                    value={bulkForm.owner}
                                                                    onChange={(e) => setBulkForm({...bulkForm, owner: e.target.value})}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center mb-2 pt-2">
                                                            <input 
                                                                id="default-checkbox3" 
                                                                type="checkbox" 
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                checked={bulkForm.privacy}
                                                                onChange={(e) => setBulkForm({...bulkForm, privacy: !bulkForm.privacy})}
                                                            />
                                                            <label htmlFor="default-checkbox3" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Private</label>
                                                        </div>

                                                        <div className="flex items-center mb-2 pt-2">
                                                            <input 
                                                                id="default-checkbox4" 
                                                                type="checkbox" 
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                checked={bulkForm.strict}
                                                                onChange={(e) => setBulkForm({...bulkForm, strict: !bulkForm.strict})}
                                                            />
                                                            <label htmlFor="default-checkbox4" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Safe Content Restriction</label>
                                                        </div>     
                                                        
                                                        <div className="flex items-center mb-4 pt-2">
                                                            <input 
                                                                id="default-checkbox10" 
                                                                type="checkbox" 
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                checked={bulkForm.downloadable}
                                                                onChange={(e) => setBulkForm({...bulkForm, downloadable: !bulkForm.downloadable})}
                                                            />
                                                            <label htmlFor="default-checkbox10" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Downloadable</label>
                                                        </div>

                                                        <div className='grid grid-cols-1  gap-5 place-content-start'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Add Default Tags: </label>
                                                                <div className='flex flex-row'>
                                                                    <input 
                                                                        type="text" 
                                                                        className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                        value={bulkTags}
                                                                        onChange={(e) => setBulkTags(e.target.value)}
                                                                    />
                                                                    <div className='flex flex-row items-end'>
                                                                        <button onClick={addBulkTags} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>        

                                                        <div className='flex flex-wrap items-center mt-2 mb-4 relative'>
                                                            {
                                                                bulkForm.tags && bulkForm.tags.length > 0 &&
                                                                    bulkForm.tags.map((item, index) => {
                                                                        return (
                                                                            <div key={index} className='flex items-center relative mt-2 bg-gray-100 hover:text-gray-800 text-gray-800 border-2 border-gray-800 px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                                <p>{item}</p>
                                                                                <FontAwesomeIcon onClick={deleteBulkTags} id={index} icon={faClose} className="ml-2 cursor-pointer" />
                                                                            </div>
                                                                        )
                                                                    })
                                                            }
                                                        </div>

                                                        <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                            <button onClick={handleBulkInsert} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                                                                {
                                                                    !bulkSubmitted ?
                                                                    "Upload"
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
                                                    </>
                                                }
                                            </div>

                                            <div className="lg:w-1/2 md:w-1/2 w-full">
                                                
                                            </div>
                                        </div>
                                        
                                        {
                                            deleteId.length > 0 &&
                                            <div className='grid grid-cols-2  gap-5 place-content-start mb-1 md:mt-0 mt-8'>
                                                <h2 className='text-3xl font-bold text-gray-800'></h2>
                                                <div className='flex justify-end'>
                                                    <button onClick={() => deleteMultipleVideos()} className='w-28 disabled:bg-gray-600 disabled:border-red-700 font-semibold border border-solid border-red-600 bg-red-600 hover:bg-red-700 hover:text-100-800 rounded-sm transition-all text-white p-2'>
                                                        Delete ({deleteId.length})
                                                    </button>
                                                </div>
                                            </div>  
                                        }
                                        
                                        <div className="overflow-x-auto  mt-8">
                                            <table className="min-w-full divide-y divide-gray-200 transition-all">
                                                <thead className='bg-gray-800 text-white'>
                                                    <tr>
                                                        <th className="">
                                                            
                                                        </th>
                                                        <th className="px-6 py-3 sm:w-1/5 w-1/2 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Title
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Video
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Private
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Strict
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Download
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Artist
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Tags
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {
                                                        data && data.length > 0 &&
                                                            data.slice(startIndex, endIndex).map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="pl-4">
                                                                            <div className="text-sm leading-5 text-gray-900">
                                                                                <input 
                                                                                    id={`default-checkbox${10+index}`}
                                                                                    type="checkbox" 
                                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                    checked={deleteId.includes(item._id)}
                                                                                    onChange={() => addDeleteId(index, item._id)}
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                        <td className="sm:w-1/5 w-1/2 px-6 py-4 whitespace-no-wrap break-keep">
                                                                            <div className="text-sm leading-5 text-gray-900">{item.title}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap">
                                                                            <div className="text-sm leading-5 text-gray-900">
                                                                                <FontAwesomeIcon onClick={() => { setVideoRecord(item.link); setRecordOpenModal(true) }} icon={faVideoCamera} className="px-[10px] py-[7px] bg-gray-700 hover:bg-gray-800 text-gray-100 rounded-md cursor-pointer transition-all mr-2" />
                                                                            </div>
                                                                        </td>
                                                                        <VideoTableData 
                                                                            cond={item.privacy}
                                                                            api_call={changePrivacyById({
                                                                                id: item._id,
                                                                                privacy: !item.privacy
                                                                            })}
                                                                        />
                                                                        <VideoTableData 
                                                                            cond={item.strict}
                                                                            api_call={changeStrictById({
                                                                                id: item._id,
                                                                                strict: !item.strict
                                                                            })}
                                                                        />
                                                                        <VideoTableData 
                                                                            cond={item.downloadable}
                                                                            api_call={changeDownloadById({
                                                                                id: item._id,
                                                                                downloadable: !item.downloadable
                                                                            })}
                                                                        />
                                                                        <td className="px-6 py-4 whitespace-no-wrap">
                                                                            <div className="text-sm leading-5 text-gray-900">{item.owner}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap">
                                                                            <div className="text-sm leading-5 text-gray-900 flex items-center capitalize">{item.tags.join(', ')}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap">
                                                                            <div className="text-sm leading-5 text-gray-900 flex items-center">
                                                                                <FontAwesomeIcon onClick={() => editMode(index)} icon={faEdit} className="px-[10px] py-[7px] bg-yellow-600 hover:bg-yellow-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" />
                                                                                <FontAwesomeIcon onClick={() => deleteVideo(index)} icon={faTrash} className="px-[10px] py-[7px] bg-red-600 hover:bg-red-700 text-gray-100 rounded-md cursor-pointer transition-all" />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                    } 
                                                {/* Add more rows as needed */}
                                                </tbody>
                                            </table>
                                            <div className='md:flex justify-end mt-4 hidden'>
                                                <p className='mr-4 text-sm text-gray-500 py-2'>Showing Record {(endIndex >= data?.length) ? data?.length : endIndex }/{data?.length}</p>
                                                <button disabled={currentPage === 1} onClick={() => goToPage(1)}><FontAwesomeIcon icon={faAngleDoubleLeft} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" /></button>
                                                <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}><FontAwesomeIcon icon={faChevronLeft} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" /></button>
                                                <button disabled={endIndex >= data?.length} onClick={() => goToPage(currentPage + 1)} ><FontAwesomeIcon icon={faChevronRight} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" /></button>
                                                <button disabled={endIndex >= data?.length} onClick={() => goToPage(data?.length / itemsPerPage)} ><FontAwesomeIcon icon={faAngleDoubleRight} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all" /></button>
                                            </div>
                                        </div>
                                        <div className='md:hidden justify-end mt-4 flex'>
                                            <p className='mr-4 text-sm text-gray-500 py-2'>Showing Record {(endIndex >= data?.length) ? data?.length : endIndex }/{data?.length}</p>
                                            <button disabled={currentPage === 1} onClick={() => goToPage(1)}><FontAwesomeIcon icon={faAngleDoubleLeft} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" /></button>
                                            <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}><FontAwesomeIcon icon={faChevronLeft} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" /></button>
                                            <button disabled={endIndex >= data?.length} onClick={() => goToPage(currentPage + 1)} ><FontAwesomeIcon icon={faChevronRight} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" /></button>
                                            <button disabled={endIndex >= data?.length} onClick={() => goToPage(data?.length / itemsPerPage)} ><FontAwesomeIcon icon={faAngleDoubleRight} className="px-[10px] py-[7px] bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-md cursor-pointer transition-all" /></button>
                                        </div>
                                    </div>
                                )
                                :
                                (paramIndex || checkParams('games')) && (
                                    <div>
                                        <div className="md:flex items-start justify-center mt-8">
                                            <div className="lg:w-1/2 md:w-1/2 w-full">

                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Featured Image Url: </label>
                                                        <div className='flex flex-row'>
                                                            <input 
                                                                type="text" 
                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                value={gameForm.featured_image}
                                                                onChange={(e) => setGameForm({...gameForm, featured_image: e.target.value})}
                                                            />
                                                            <div className='flex flex-row items-end'>
                                                                <button 
                                                                    onClick={() => {
                                                                        setPreview(true)
                                                                        setOpenImageModal(true)
                                                                        setDisplayImage(gameForm.featured_image)
                                                                    }} 
                                                                    className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'><FontAwesomeIcon icon={faEye} className="mx-4"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Game Title: </label>
                                                        <input 
                                                            type="text" 
                                                            className='p-2 border border-solid border-[#c0c0c0]'
                                                            value={gameForm.title}
                                                            onChange={(e) => setGameForm({...gameForm, title: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Game description: </label>
                                                        <div className='flex flex-row'>
                                                            <textarea
                                                                name="message"
                                                                id="message"
                                                                cols="30"
                                                                rows="8"
                                                                placeholder="Message"
                                                                className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                onChange={(e) => setGameForm({...gameForm, description: e.target.value})}
                                                                value={ gameForm.description }
                                                            >
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Leave a Message: </label>
                                                        <div className='flex flex-row'>
                                                            <textarea
                                                                name="message"
                                                                id="message"
                                                                cols="30"
                                                                rows="4"
                                                                placeholder="Message"
                                                                className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                onChange={(e) => setGameForm({...gameForm, leave_uploader_message: e.target.value})}
                                                                value={ gameForm.leave_uploader_message }
                                                            >
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-2 pt-2">
                                                    <input 
                                                        id="default-checkbox" 
                                                        type="checkbox" 
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        checked={gameForm.privacy}
                                                        onChange={(e) => setGameForm({...gameForm, privacy: !gameForm.privacy})}
                                                    />
                                                    <label htmlFor="default-checkbox" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Private</label>
                                                </div>
                                                
                                                <div className="flex items-center mb-4 pt-2">
                                                    <input 
                                                        id="default-checkbox2" 
                                                        type="checkbox" 
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        checked={gameForm.strict}
                                                        onChange={(e) => setGameForm({...gameForm, strict: !gameForm.strict})}
                                                    />
                                                    <label htmlFor="default-checkbox2" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Safe Content Restriction</label>
                                                </div>

                                                <div className='grid grid-cols-1  gap-5 place-content-start'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Add Tags: </label>
                                                        <div className='flex flex-row'>
                                                            <input 
                                                                type="text" 
                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                value={input.gameTags}
                                                                onChange={(e) => setInput({...input, gameTags: e.target.value})}
                                                            />
                                                            <div className='flex flex-row items-end'>
                                                                <button onClick={addGameTags} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>          

                                                <div className='flex flex-wrap items-center mt-2 mb-4 relative'>
                                                    {
                                                        gameTags && gameTags.length > 0 &&
                                                            gameTags.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='flex items-center relative mt-2 bg-gray-100 hover:text-gray-800 text-gray-800 border-2 border-gray-800 px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                        <p>{item}</p>
                                                                        <FontAwesomeIcon onClick={deleteGameTags} id={index} icon={faClose} className="ml-2 cursor-pointer" />
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>

                                                <div className='grid sm:grid-cols-2 grid-cols-1  gap-5 place-content-start '>
                                                    <h2 className='text-2xl font-bold text-gray-800 my-4'>Download Links</h2>        
                                                </div>
                                                
                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Storage Name: </label>
                                                        <div className='flex flex-row'>
                                                            <select
                                                                className="sm:w-full w-2/3 capitalize appearance-none bg-gray-100 border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                value={input.storage_name}
                                                                onChange={(e) => setInput({...input, storage_name: e.target.value})}
                                                            >
                                                                <option value="Google Drive" className="capitalize">Google Drive</option>
                                                                <option value="Dropbox" className="capitalize">Dropbox</option>
                                                                <option value="Mediafire" className="capitalize">Mediafire</option>
                                                            </select>
                                                            <div className='flex flex-row items-end'>
                                                                <button onClick={addDownloadLink} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className='grid grid-cols-1 gap-5 place-content-start text-white mb-2'>
                                                    <div className='flex flex-row flex-wrap'>
                                                        {
                                                            gameForm.download_link.length > 0 &&
                                                                gameForm.download_link.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className='w-full border-2 border-dashed border-gray-700 p-2 mb-2'>
                                                                            <div key={i} className='w-full flex flex-row p-2 py-3 bg-gray-800 mb-1'>
                                                                                <div className='w-1/2 flex flex-col'>
                                                                                    <div className='w-full flex flex-row items-center'>
                                                                                        <FontAwesomeIcon icon={faChevronRight} className="mr-2 w-3 h-3"/> <p className='font-semibold'>{item.storage_name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                                <div className='w-1/2 text-right'>
                                                                                    <FontAwesomeIcon id={i} onClick={deleteDownloadLink} icon={faTrash} className="mr-2 hover:cursor-pointer" />
                                                                                </div>
                                                                            </div>

                                                                            <div className='grid grid-cols-1 gap-5 place-content-start mb-2 text-[#000]'>
                                                                                <div className='flex flex-col'>
                                                                                    <label className='font-semibold'> Download Links: </label>
                                                                                    <div className='flex flex-row'>
                                                                                        <input 
                                                                                            id={i}
                                                                                            type="text" 
                                                                                            className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                                            value={input.link_list[i] ? input.link_list[i] : ''}
                                                                                            onChange={handleDownloadLinkItemChange}
                                                                                        />
                                                                                        <div className='flex flex-row items-end'>
                                                                                            <button id={i} onClick={addDownloadLinkItem} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                gameForm.download_link[i].links.length > 0 &&
                                                                                    gameForm.download_link[i].links.map((data, id) => {
                                                                                        return(
                                                                                            <div key={id} className='w-full flex flex-row p-2 py-3 bg-gray-800 mb-1'>
                                                                                                <div className='w-1/2 flex flex-col'>
                                                                                                    <div className='w-full flex flex-row items-center'>
                                                                                                        <FontAwesomeIcon icon={faChevronRight} className="mr-2 w-3 h-3"/> <p className='font-semibold'>{data}</p>
                                                                                                    </div>
                                                                                                </div> 
                                                                                                <div className='w-1/2 text-right'>
                                                                                                    <FontAwesomeIcon onClick={(e) => deleteDownloadLinkItem(e, id, i)} id={id} parent_id={i} icon={faTrash} className="mr-2 hover:cursor-pointer" />
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                    </div>
                                                </div>

                                                <div className='grid sm:grid-cols-2 grid-cols-1  gap-5 place-content-start '>
                                                    <h2 className='text-2xl font-bold text-gray-800 my-4'>Game Details</h2>        
                                                </div>
                                                
                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Version Number: </label>
                                                        <input 
                                                            type="text" 
                                                            className='p-2 border border-solid border-[#c0c0c0]'
                                                            value={gameForm.details.latest_version}
                                                            onChange={(e) => setGameForm({...gameForm, details: {...gameForm.details, latest_version: e.target.value}})}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Censorship: </label>
                                                        <select
                                                            className="sm:w-full w-2/3 capitalize appearance-none bg-gray-100 border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={gameForm.details.censorship}
                                                            onChange={(e) => setGameForm({...gameForm, details: {...gameForm.details, censorship: e.target.value}})}
                                                        >
                                                            <option value="Uncensored" className="capitalize">Uncensored</option>
                                                            <option value="Censored" className="capitalize">Censored</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Language: </label>
                                                        <select
                                                            className="sm:w-full w-2/3 capitalize appearance-none bg-gray-100 border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={gameForm.details.language}
                                                            onChange={(e) => setGameForm({...gameForm, details: {...gameForm.details, language: e.target.value}})}
                                                        >
                                                            <option value="English" className="capitalize">English</option>
                                                            <option value="Japanese" className="capitalize">Japanese</option>
                                                            <option value="Chinese" className="capitalize">Chinese</option>
                                                            <option value="Spanish" className="capitalize">Spanish</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Developer: </label>
                                                        <input 
                                                            type="text" 
                                                            className='p-2 border border-solid border-[#c0c0c0]'
                                                            value={gameForm.details.developer}
                                                            onChange={(e) => setGameForm({...gameForm, details: {...gameForm.details, developer: e.target.value}})}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Platform: </label>
                                                        <select
                                                            className="sm:w-full w-2/3 capitalize appearance-none bg-gray-100 border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={gameForm.details.platform}
                                                            onChange={(e) => setGameForm({...gameForm, details: {...gameForm.details, platform: e.target.value}})}
                                                        >
                                                            <option value="Desktop" className="capitalize">Desktop</option>
                                                            <option value="Android" className="capitalize">Android</option>
                                                            <option value="iOS" className="capitalize">iOS</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className='grid sm:grid-cols-2 grid-cols-1  gap-5 place-content-start '>
                                                    <h2 className='text-2xl font-bold text-gray-800 my-4'>Gallery Showcase</h2>        
                                                </div>
                                                
                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                    <div className='flex flex-col'>
                                                        <label className='font-semibold'> Image URL: </label>
                                                        <div className='flex flex-row'>
                                                            <input 
                                                                type="text" 
                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                value={input.gallery}
                                                                onChange={(e) => setInput({...input, gallery: e.target.value })}
                                                            />
                                                            <div className='flex flex-row items-end'>
                                                                <button onClick={addImageURL} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className='grid grid-cols-1 gap-5 place-content-start text-white mb-2'>
                                                    <div className='flex flex-row flex-wrap'>
                                                        {
                                                            gameForm.gallery.length > 0 &&
                                                                gameForm.gallery.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className='w-full flex flex-row p-2 py-3 bg-gray-800 mb-1'>
                                                                            <div className='w-1/2 flex flex-row items-center'>
                                                                                <FontAwesomeIcon icon={faChevronRight} className="mr-2 w-3 h-3"/> <p className='font-semibold'>{item}</p>
                                                                            </div>
                                                                            <div className='w-1/2 text-right'>
                                                                                <FontAwesomeIcon id={i} onClick={deleteImageURL} icon={faTrash} className="mr-2 hover:cursor-pointer" />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                    </div>
                                                </div>
                                                
                                                <button onClick={handleGameSubmit} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                                                    {
                                                        !gameSubmitted ?
                                                        "Upload Game"
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

                                            <div className="lg:w-1/2 md:w-1/2 w-full">
                                            </div>
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