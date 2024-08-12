import React, { useEffect, useState, useRef  } from 'react'
import { Header } from './index'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faEdit, faTrash, faVideoCamera, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faEye, faArrowUp, faArrowDown, faChevronDown, faPencil, faShareAlt, faArrowUpRightFromSquare, faArrowRight, faArrowLeft, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { changeGamePrivacyById, changeGameStrictById, bulkRemoveBlog, removeBlog, getUserVideo, getUserGame, getUserBlog, uploadVideo, clearAlert, bulkRemoveGame, removeGame, editVideo, editGame, editBlog, removeVideo, changePrivacyById, changeStrictById, changeBlogPrivacyById, changeBlogStrictById, changeDownloadById, bulkRemoveVideo, uploadGame, uploadBlog } from "../../actions/uploads";
import axios from 'axios';
import EmbedFull from '../EmbedFull'
import VideoModal from '../VideoModal';
import Alert from '../Alert';
import VideoTableData from './sections/VideoTableData';
import GameViewModal from './sections/GameViewModal';
import ImageModal from '../ImageModal';
import BlogsForm from './BlogsForm';
import styles from '../../style'

import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { convertDriveImageLink, millisToTimeString } from '../Tools'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function generateRandomID(length = 20) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

const AdminVideos = ({ user, path }) => {
    const dispatch = useDispatch()
    const navigate  = useNavigate()

    const video = useSelector((state) => state.uploads.video)

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(video.length / itemsPerPage);

    const [searchParams, setSearchParams] = useSearchParams();
    const [pageType, setPageType] = useState(searchParams.get('type') ? parseInt(searchParams.get('type')) : '')
    const [open, setOpen] = useState({
        portfolio: false,
        pages: false,
        uploads: false,
        manage: false,
    })
    const [pageIndex, setPageIndex] = useState(1)
    const [displayedPages, setDisplayedPages] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState([])
    const [searchVideo, setSearchVideo] = useState('')
    const [data, setData] = useState(null)
    const [videoRecord, setVideoRecord] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false)
    const [recordOpenModal, setRecordOpenModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [tags, setTags] = useState([])
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
        blogTags: '',
        gallery: '',
        storage_name: 'Google Drive',
        link_list: []
    })

    useEffect(() => {
        dispatch(getUserVideo({ id: user.result?._id }))
    }, [])

    const handlePage = (page) => {
        navigate(`/account/videos?type=${page}`)

        setPageType(page)
    };

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

    const deleteVideo = (index) => {
        if(confirm(`Are you sure you want to delete video ${video[index].title}?`)) {
            dispatch(removeVideo({ 
                id: user.result?._id,
                video_id: video[index]._id 
            }))
        }
    }

    useEffect(() => {
        if(video && video.length > 0){
            if(searchVideo.length > 0) {
                const keyword = searchVideo.toLowerCase();
                const filteredData = video.filter((item) =>
                    Object.values(item).some((value) =>
                        String(value).toLowerCase().includes(keyword)
                    )
                );
                setData(filteredData);
            }
            else {
                setData(video)
            }
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
        setInput({tags: '', gameTags: '', gallery: '', blogTags: '', storage_name: 'Google Drive', link_list: []})
        setSubmitted(false)
        setEdit(false)
        setCurrentIndex(0)
    }, [video])

    const handleVideoSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchVideo(event.target.value);
    
        const filteredData = video.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(keyword)
          )
        );

        setCurrentPage(1)
        setData(filteredData);
    };
    
    useEffect(() => {
        window.scrollTo(0, 0)
        const calculateDisplayedPages = () => {
            const pagesToShow = [];
            const maxPages = 5;
            const maxDisplayedPages = (totalPages >= itemsPerPage) ? ((totalPages / itemsPerPage) > maxPages ? maxPages : totalPages / itemsPerPage) : 1 ; // Maximum number of page buttons to display
        
            if (totalPages <= maxDisplayedPages) {
                for (let i = 1; i <= totalPages; i++) {
                    pagesToShow.push(i);
                }
            } else {
                let startPage;
                let endPage;
        
                if (currentPage <= Math.floor(maxDisplayedPages / 2)) {
                    startPage = 1;
                    endPage = maxDisplayedPages;
                } else if (currentPage >= totalPages - Math.floor(maxDisplayedPages / 2)) {
                    startPage = totalPages - maxDisplayedPages + 1;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - Math.floor(maxDisplayedPages / 2);
                    endPage = currentPage + Math.floor(maxDisplayedPages / 2);
                }
        
                for (let i = startPage; i <= endPage; i++) {
                    pagesToShow.push(i);
                }
            }
        
            setDisplayedPages(pagesToShow);
        };
    
        calculateDisplayedPages();
    }, [currentPage, totalPages, pageIndex]);

    const goToPage = (page) => {
        setCurrentPage(page);
        setPageIndex(page)
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} path={path}/>
            <div class="flex flex-col flex-1">
                <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} path={path}/>
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="mx-auto grid">
                        <div className="relative bg-[#F9FAFB]">
                            <Header 
                                heading='Uploads'
                                description="Upload contents for others to view!"
                                button_text="Explore Now!"
                                button_link={`#`}
                                show_button={false}
                                grid_type='full'
                                data={[
                                    {
                                        label: 'videos',
                                        value: 0
                                    },
                                    {
                                        label: 'games',
                                        value: 0
                                    },
                                    {
                                        label: 'blogs',
                                        value: 0
                                    },
                                ]}
                            />

                            <VideoModal
                                openModal={recordOpenModal}
                                setOpenModal={setRecordOpenModal}
                                link={videoRecord}
                            />

                            <div className="relative bg-[#F9FAFB] border-b border-solid border-[#CAD5DF] font-poppins text-sm text-gray-700">   
                                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                    <div className={`${styles.boxWidthEx}`}>
                                        <div className="container mx-auto relative">
                                            <div className='w-full whitespace-nowrap scrollbar-hide mobile_scroll flex flex-row font-semibold overflow-x-auto'>
                                                <button onClick={() => handlePage('videos')} className={`transition-all py-4 mr-8 border-b-2 ${pageType === '' || pageType === 'videos' || searchParams.get('type') === 'videos' ? 'border-blue-500' : 'border-transparent'}`}>Videos</button>
                                                <button onClick={() => handlePage('groups')} className={`transition-all py-4 mr-8 border-b-2 ${pageType === 'groups' || searchParams.get('type') === 'groups' ? 'border-blue-500' : 'border-transparent'}`}>Group Lists</button>
                                                <button onClick={() => handlePage('reports')} className={`transition-all py-4 mr-8 border-b-2 ${pageType === 'reports' || searchParams.get('type') === 'reports' ? 'border-blue-500' : 'border-transparent'}`}>Reports</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative font-poppins">   
                                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                    <div className={`${styles.boxWidthEx}`}>
                                        <div className="container mx-auto relative px-0 pb-16 pt-8">
                                            <div className='min-w-full xs:w-auto w-72'>
                                                <div className='flex justify-end'>
                                                  
                                                </div>
                                                <div className='justify-between items-center mb-2 sm:hidden flex mt-4'>
                                                    <div className=''>
                                                        {
                                                            deleteId.length > 0 &&
                                                                <FontAwesomeIcon title="delete" onClick={() => deleteMultipleVideos()} icon={faTrash} className="px-[12px] py-[10px] my-0 bg-red-600 hover:bg-red-700 text-gray-100 rounded-md cursor-pointer transition-all mr-2" />
                                                        }
                                                    </div>  
                                                    <div className='flex'>
                                                        <div className="relative w-full max-w-xs flex justify-end">
                                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <FontAwesomeIcon icon={faSearch} />
                                                            </div>
                                                            <input 
                                                                className="block w-full py-1 pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-700 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" 
                                                                type="text" 
                                                                placeholder="Search" 
                                                                value={searchVideo}
                                                                onChange={handleVideoSearch}
                                                            />
                                                        </div>
                                                        <button className='ml-2 border border-solid border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-sm transition-all text-white p-2 py-0 px-2'>
                                                            <FontAwesomeIcon icon={faPlus} className=''/>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="overflow-x-auto sm:mt-4 relative">
                                                    <div className='mb-2 sm:flex hidden items-center justify-between'>
                                                        <div className=''>
                                                            {
                                                                deleteId.length > 0 &&
                                                                    <div className='flex items-center'>
                                                                        <button onClick={() => deleteMultipleVideos()}  className='font-semibold text-sm border border-solid border-red-600 bg-red-600 hover:bg-red-700 rounded-sm transition-all text-white p-2 py-1'>
                                                                            Delete ({deleteId.length})
                                                                        </button>
                                                                    </div>
                                                                }
                                                        </div>  
                                                        <div className='flex'>
                                                            <div className="relative w-full max-w-xs flex justify-end">
                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                    <FontAwesomeIcon icon={faSearch} />
                                                                </div>
                                                                <input 
                                                                    className="block w-full py-[0.30rem] pl-10 pr-3 leading-5 text-gray-700 placeholder-gray-700 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                                                    type="text" 
                                                                    placeholder="Search" 
                                                                    value={searchVideo}
                                                                    onChange={handleVideoSearch}
                                                                />
                                                            </div>
                                                            <button className='ml-2 border border-solid border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-sm transition-all text-white p-2 py-0'>
                                                                <FontAwesomeIcon icon={faPlus} className=''/>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="xs:w-full overflow-hidden rounded-lg shadow-xs">
                                                        <div class="w-full overflow-x-auto">
                                                            <table class="min-w-full overflow-x-auto whitespace-no-wrap border-collapse">
                                                                <thead>
                                                                    <tr
                                                                        class="font-mono text-sm font-light tracking-wide text-left text-gray-700 border border-solid dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                                                    >
                                                                        <th class="pl-4 py-3"></th>
                                                                        <th class="px-4 py-3">Video</th>
                                                                        <th class="px-4 py-3">Visible</th>
                                                                        <th class="px-4 py-3">Restricted</th>
                                                                        <th class="px-4 py-3">Downloadable</th>
                                                                        <th class="px-4 py-3">Views</th>
                                                                        <th class="px-4 py-3">Tags</th>
                                                                        <th class="px-4 py-3">Groups</th>
                                                                        <th class="px-4 py-3">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                {
                                                                    (data && data.length > 0) &&
                                                                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                                                            {
                                                                                data.slice(startIndex, endIndex).map((item, index) => {
                                                                                    return (
                                                                                            <tr key={index} class="text-gray-700 dark:text-gray-400">
                                                                                            <td className='pl-4 py-3'>
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
                                                                                            <td class="px-4 py-3">
                                                                                                <div class="flex items-center text-sm">
                                                                                                    <div onClick={() => { setVideoRecord(item.link); setRecordOpenModal(true) }} className='cursor-pointer bg-black rounded-lg overflow-hidden md:w-32 md:min-w-32 xs:w-32 xs:min-w-32 w-32 min-w-32 h-20 mr-2 relative border border-gray-900'>
                                                                                                        <img 
                                                                                                            src={convertDriveImageLink(item.link)} alt="Video Thumbnail" 
                                                                                                            // src={''} alt="Video Thumbnail" 
                                                                                                            className='mx-auto object-cover h-20 text-xs'
                                                                                                        />
                                                                                                        <div className='absolute bottom-1 right-1 rounded-sm bg-blue-600 border border-solid border-blue-600 text-white'>
                                                                                                            <p className='p-1 px-1 py-0 text-xs'>{item.duration ? millisToTimeString(item.duration) : 'embed'}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className='md:max-w-[150px] max-w-[125px] text-xs'>
                                                                                                        <p class="font-semibold truncate">{item.title}</p>
                                                                                                        <p class="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                                                                        {item.owner}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <VideoTableData 
                                                                                                cond={item.privacy}
                                                                                                api_call={changePrivacyById({
                                                                                                    id: item._id,
                                                                                                    privacy: !item.privacy
                                                                                                })}
                                                                                                // type="videos"
                                                                                                // id={item._id}
                                                                                                // access_key={item.access_key}
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
                                                                                            <td class="px-4 py-3 text-xs font-semibold">
                                                                                                {item.views.length}
                                                                                            </td>
                                                                                            <td class="px-4 py-3 text-xs truncate">
                                                                                                <div className="flex sm:flex-wrap items-center gap-1">
                                                                                                    {
                                                                                                        item.tags?.length > 0 &&
                                                                                                        item.tags.map((tag, i) => {
                                                                                                            return (
                                                                                                                <span key={i} class="px-2 ml-1 py-1 text-white bg-blue-600 rounded-full dark:bg-blue-700 dark:text-white">
                                                                                                                    {tag}
                                                                                                                    {/* milktea */}
                                                                                                                </span>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </div>
                                                                                            </td>
                                                                                            <td class="px-4 py-3 text-xs font-semibold truncate max-w-[100px]">
                                                                                                Awesome
                                                                                            </td>
                                                                                            <td class="px-4 py-3">
                                                                                                <div class="flex items-center space-x-2 text-sm">
                                                                                                    <button onClick={() => { editMode(index); setShowVideoRecord(false) }} className='border border-solid border-green-600 bg-green-600 hover:bg-green-700 rounded-sm transition-all text-white p-2 py-1'>
                                                                                                        <FontAwesomeIcon icon={faPencil} className=''/>
                                                                                                    </button>
                                                                                                    <button onClick={() => deleteVideo(index)}  className='mr-2 border border-solid border-red-600 bg-red-600 hover:bg-red-700 rounded-sm transition-all text-white p-2 py-1'>
                                                                                                        <FontAwesomeIcon icon={faTrash} className=''/>
                                                                                                    </button>
                                                                                                    <button onClick={() => { window.open(`${window.location.origin}/videos/${item._id}?access_key=${item.access_key}`) }} className='mr-2 border border-solid border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-sm transition-all text-white p-2 py-1'>
                                                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className=''/>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                }
                                                            </table>
                                                        </div>
                                                        <div
                                                            class="md:block hidden px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                                                            >
                                                            <div className='flex items-center justify-between'>
                                                                <span class="flex items-center col-span-3">
                                                                    Showing {(endIndex >= video.length) ? video.length : endIndex } of {video?.length}
                                                                </span>

                                                                <div className='flex flex-wrap items-center justify-center'>
                                                                    <button
                                                                        disabled={currentPage === 1}
                                                                        onClick={() => goToPage(1)}
                                                                        className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                                    >
                                                                        <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                                                                    </button>
                                                                    <button
                                                                        disabled={currentPage === 1}
                                                                        onClick={() => goToPage(currentPage - 1)}
                                                                        className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                                    >
                                                                        <FontAwesomeIcon icon={faArrowLeft}/>
                                                                    </button>
                                                                    {displayedPages.map((pageNumber) => (
                                                                        <button 
                                                                            key={pageNumber}
                                                                            onClick={() => goToPage(pageNumber)}
                                                                            style={{backgroundColor: pageIndex === pageNumber && "#d1d5db"}} className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                                        >
                                                                        {pageNumber}
                                                                        </button>
                                                                    ))}
                                                                    <button
                                                                        disabled={currentPage === totalPages}
                                                                        onClick={() => goToPage(currentPage + 1)}
                                                                        className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                                    >
                                                                        <FontAwesomeIcon icon={faArrowRight}/>
                                                                    </button>
                                                                    <button
                                                                        disabled={endIndex >= data?.length} 
                                                                        onClick={() => goToPage(data?.length / itemsPerPage)} 
                                                                        className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                                    >
                                                                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="md:hidden block px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                                                    >
                                                    <div className='flex-col items-center justify-between'>
                                                        <div className='flex flex-wrap items-center justify-center'>
                                                            <button
                                                                disabled={currentPage === 1}
                                                                onClick={() => goToPage(1)}
                                                                className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                            >
                                                                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                                                            </button>
                                                            <button
                                                                disabled={currentPage === 1}
                                                                onClick={() => goToPage(currentPage - 1)}
                                                                className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                            >
                                                                <FontAwesomeIcon icon={faArrowLeft}/>
                                                            </button>
                                                            {displayedPages.map((pageNumber) => (
                                                                <button 
                                                                    key={pageNumber}
                                                                    onClick={() => goToPage(pageNumber)}
                                                                    style={{backgroundColor: pageIndex === pageNumber && "#d1d5db"}} className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                                >
                                                                {pageNumber}
                                                                </button>
                                                            ))}
                                                            <button
                                                                disabled={currentPage === totalPages}
                                                                onClick={() => goToPage(currentPage + 1)}
                                                                className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                            >
                                                                <FontAwesomeIcon icon={faArrowRight}/>
                                                            </button>
                                                            <button
                                                                disabled={endIndex >= data?.length} 
                                                                onClick={() => goToPage(data?.length / itemsPerPage)} 
                                                                className='h-8 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-3 mx-[2px] border border-[#CAD5DF] rounded transition-colors duration-300 ease-in-out'
                                                            >
                                                                <FontAwesomeIcon icon={faAngleDoubleRight}/>
                                                            </button>
                                                        </div>

                                                        <span class="flex items-center justify-center col-span-3 mt-4">
                                                            Showing {(endIndex >= video.length) ? video.length : endIndex } of {video?.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminVideos