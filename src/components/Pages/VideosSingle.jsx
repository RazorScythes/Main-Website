import React, { useEffect, useState, useRef  } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEye, faEllipsisV, faThumbsUp, faThumbsDown, faAdd, faDownload, faArrowRightRotate, faClock, faCalendar, faTrash, faLinkSlash, faExclamationTriangle, faMinus, faBars, faFlag, faBox, faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { uploadLists, addOneLikes, addOneDislikes, addOneViews, getVideoByID, getComments, getRelatedVideos, uploadComment, removeComment, addToWatchLater, clearAlert } from "../../actions/video";
import { useParams, useSearchParams } from 'react-router-dom'
import { MotionAnimate } from 'react-motion-animate'
import { convertDriveImageLink } from '../Tools'
import { Page_not_found } from '../../assets';
import loading from '../../assets/loading.gif'
import moment from 'moment'
import styles from "../../style";
import VideoThumbnail from '../VideoThumbnail';
import Avatar from '../../assets/avatar.png'
import Cookies from 'universal-cookie';
import SideAlert from '../SideAlert'
import ReactPlayer from 'react-player/youtube'
import Iframe from 'react-iframe'

const cookies = new Cookies();

const getVideoId = (url) => {
    let videoId;
    const youtubeMatch = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
    const dropboxMatch = /^(?:https?:\/\/)?(?:www\.)?dropbox\.com\/(?:s|sh)\/([\w\d]+)(?:\/.*)?$/;
    const megaMatch = /^(?:https?:\/\/)?mega\.(?:co\.nz|nz|io)\/(?:#!\/)?(?:file|enc|f)!([a-zA-Z0-9!_-]{8,})(?:\S+)?$/;
    const googleDriveMatch = /^(?:https?:\/\/)?drive.google.com\/(?:file\/d\/|open\?id=)([^/&?#]+)/;
  
    if (youtubeMatch.test(url)) {
      videoId = url.match(youtubeMatch)[1];
    } else if (dropboxMatch.test(url)) {
      videoId = url.match(dropboxMatch)[1];
    } else if (megaMatch.test(url)) {
      videoId = url.match(megaMatch)[1];
    } else if (googleDriveMatch.test(url)) {
      videoId = url.match(googleDriveMatch)[1];
    } else {
      videoId = null;
    }
    return videoId;
};

const VideosSingle = ({ user }) => {
    const iframeRef = useRef(null);
    const dispatch = useDispatch()
    const { id } = useParams();
   
    const video = useSelector((state) => state.video.data)
    const comments = useSelector((state) => state.video.comments)
    const related_video = useSelector((state) => state.video.relatedVideos)
    const notFound = useSelector((state) => state.video.notFound)
    const forbiden = useSelector((state) => state.video.forbiden)
    const isLoading = useSelector((state) => state.video.isLoading)
    const sideAlert = useSelector((state) => state.video.sideAlert)
    const archiveList = useSelector((state) => state.video.archiveList)
    const uploads = useSelector((state) => state.video.videoList)
    const archiveSaveLists = useSelector((state) => state.video.archiveSaveLists)

    const [avatar, setAvatar] = useState(localStorage.getItem('avatar')?.replaceAll('"', ""))
    const [active, setActive] = useState(0)
    const [data, setData] = useState({})
    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [likes, setLikes]  = useState([])
    const [dislikes, setDislikes] = useState([])
    const [related, setRelated] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [isAnimatingTU, setIsAnimatingTU] = useState(false)
    const [isAnimatingTD, setIsAnimatingTD] = useState(false)
    const [openDirectory, setOpenDirectory] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();
    const access_key = searchParams.get('access_key')

    useEffect(() => {
        dispatch(getVideoByID({ id: user ? user.result?._id : '', videoId: id, access_key: access_key, }))
        dispatch(getComments({ videoId: id }))
        dispatch(getRelatedVideos({ videoId: id, id: user ? user.result?._id : '' }))
        setData({})
        setLikes([])
        setDislikes([])
        setRelated([])
        setCommentList([])
        setComment('')
        setIsAnimatingTU(false)
        setIsAnimatingTD(false)
        window.scrollTo(0, 0)
    }, [id])

    const [alertActive, setAlertActive] = useState(false)
    const [alertSubActive, setAlertSubActive] = useState('')
    const [alertInfo, setAlertInfo] = useState({
        variant: '',
        heading: '',
        paragraph: ''
    })

    useEffect(() => {
        if(alertSubActive === 'no user') {
            setAlertInfo({
                variant: 'info',
                heading: 'Login Required',
                paragraph: 'Please login to add this video.'
            })
            setAlertActive(true)
            setAlertSubActive('')
        }
    }, [alertSubActive])
    
    useEffect(() => {
        if(Object.keys(sideAlert).length !== 0){
            setAlertInfo({
                variant: sideAlert.variant,
                heading: sideAlert.heading,
                paragraph: sideAlert.paragraph
            })
            setAlertActive(true)

            dispatch(clearAlert())
        }
    }, [sideAlert])

    useEffect(() => {
        if(Object.keys(video).length !== 0) {
            dispatch(uploadLists({ 
                id: user ? user.result?._id : '', 
                uploader_id: video.id 
            }))
        }

        setData(video)
        setLikes(video && video.video ? video.video.likes : [])
        setDislikes(video && video.video ? video.video.dislikes : [])
    }, [video])

    useEffect(() => {
        setRelated(related_video && related_video.length > 0 ? related_video : [])
    }, [related_video])

    useEffect(() => {
        if(likes.length > 0){
            likes.forEach((item) => {
                if(item === cookies.get('uid')) setIsAnimatingTU(true)
            })
        }
        if(dislikes.length > 0) {
            dislikes.forEach((item) => {
                if(item === cookies.get('uid')) setIsAnimatingTD(true)
            })
        }
    }, [likes, dislikes])

    useEffect(() => {
        setCommentList(comments)
        setSubmitted(false)
        setDeleted(false)
        setComment('')
    }, [comments])

    const addLikes = () => {
        let duplicate = false

        likes.forEach((item) => { if(item === cookies.get('uid')) duplicate = true })

        if(!duplicate) {
            let new_arr = [...likes]
            new_arr.push(cookies.get('uid'))
            setLikes([...new_arr])
            setIsAnimatingTU(true)

            let dislikes_arr = dislikes.filter((item) => item !== cookies.get('uid'))
            setDislikes([...dislikes_arr])
            setIsAnimatingTD(false)

            dispatch(addOneLikes({
                id: id,
                likes: new_arr,
                dislikes: dislikes_arr
            }))
        }
    }

    const addDislikes = () => {
        let duplicate = false

        dislikes.forEach((item) => { if(item === cookies.get('uid')) duplicate = true })

        if(!duplicate) {
            let new_arr = [...dislikes]
            new_arr.push(cookies.get('uid'))
            setDislikes([...new_arr])
            setIsAnimatingTD(true)

            let likes_arr = likes.filter((item) => item !== cookies.get('uid'))
            setLikes([...likes_arr])
            setIsAnimatingTU(false)

            dispatch(addOneDislikes({
                id: id,
                likes: likes_arr,
                dislikes: new_arr
            }))
        }
    }

    const addViews = (event) => {
        if(!playing) {
            setPlaying(true)
            dispatch(addOneViews({
                id: cookies.get('uid'),
                videoId: id
            }))
        }
    }

    const submitComment = () => {
        if(comment.length === 0) return

        if(!submitted) {
            dispatch(uploadComment({
                id: video.video._id,
                user: user?.result._id,
                comment: comment
            }))
            setSubmitted(true)
        }
    }

    const deleteComment = (parent_id, comment_id) => {
        if(confirm("Are you sure you want to remove your comment? action cannot be undone."))
            if(!deleted) {
                dispatch(removeComment({
                    parent_id: parent_id,
                    comment_id: comment_id
                }))
                setDeleted(true)
            }
    }

    const watchLater = (archiveId, directory = 'Default Archive') => {
        if(!user) {
            setAlertInfo({
                variant: 'info',
                heading: 'Login Required',
                paragraph: 'Please login to add this video.'
            })
            setAlertActive(true)
        }
        else {
            dispatch(addToWatchLater({
                id: user?.result._id,
                videoId: id,
                archiveId: archiveId,
                directory: directory,
            }))
        }
    }

    const checkVideoFileSize = (size = "") => {
        return false;
        if(!size) return false

        var file_size = size.split(" ")

        if(Number(file_size[0]) <= 100) return true
        return false
    }

    const convertTimezone = (date) => {
        const timeZone = 'America/New_York';

        const dateObj = new Date(date);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour12: false,
        }).format(dateObj);

        return formattedDate
    }

    const TextWithEllipsis = ({ text, limit = 70 }) => {
        if (text.length > limit) {
          return <span>{text.slice(0, limit)}...</span>;
        }
        return <span>{text}</span>;
    }

    return (
        <div
            className="relative bg-cover bg-center py-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto py-12 text-[#94a9c9] font-poppins">
                        <SideAlert
                            variants={alertInfo.variant}    
                            heading={alertInfo.heading}
                            paragraph={alertInfo.paragraph}
                            active={alertActive}
                            setActive={setAlertActive}
                        />
                        {
                            isLoading ?
                                <div className='h-96 flex items-center justify-center'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <img className="w-16" src={loading} />
                                        <p className='text-white font-semibold text-lg mt-2'>Loading Data</p>
                                    </div>
                                </div>
                            :
                            forbiden === 'strict' ?
                                <div
                                    className="relative bg-cover bg-center py-20"
                                    style={{ backgroundColor: "#111827" }}
                                >   
                                    <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                        <div className={`${styles.boxWidthEx}`}>
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 className="text-white text-4xl font-bold mb-4 text-center">Restricted Video</h1>
                                                <p className="text-white text-lg mb-8 text-center">You don't have permission to view this video.</p>
                                                <a href="/videos" className="text-white underline hover:text-gray-200">Go back to videos page</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            forbiden === 'private' ?
                                <div
                                    className="relative bg-cover bg-center py-20"
                                    style={{ backgroundColor: "#111827" }}
                                >   
                                    <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                        <div className={`${styles.boxWidthEx}`}>
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 className="text-white text-4xl font-bold mb-4 text-center">Video is Private</h1>
                                                <p className="text-white text-lg mb-8 text-center">Contact the owner to provide information about this.</p>
                                                <a href="/videos" className="text-white underline hover:text-gray-200">Go back to videos page</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            forbiden === 'access_invalid' ?
                                    <div
                                        className="relative bg-cover bg-center py-20"
                                        style={{ backgroundColor: "#111827" }}
                                    >   
                                        <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                            <div className={`${styles.boxWidthEx}`}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Invalid Access Key</h1>
                                                    <p className="text-white text-lg mb-8 text-center">Please contact the owner if this is a misunderstanding.</p>
                                                    <a href="/videos" className="text-white underline hover:text-gray-200">Go back to videos page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            :
                            notFound ?
                                <div
                                    className="relative bg-cover bg-center py-20"
                                    style={{ backgroundColor: "#111827" }}
                                >   
                                    <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                        <div className={`${styles.boxWidthEx}`}>
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 className="text-white text-4xl font-bold mb-4 text-center">Video not Found</h1>
                                                <p className="text-white text-lg mb-8 text-center">The video you're looking for doesn't exist.</p>
                                                <a href="/videos" className="text-white underline hover:text-gray-200">Go back to videos page</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                            Object.keys(data).length !== 0 ?
                                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                    <div className="w-full md:col-span-2 text-white">
                                        {/* <p className='mb-4 font-semibold xs:text-3xl text-2xl break-all'>{ data && data.video ? data.video.title : '' }</p>
                                        <div className='flex items-center mb-4'>
                                            {
                                                data && data.video && (
                                                    <>
                                                        <FontAwesomeIcon icon={faCalendar} className="text-white"/>
                                                        <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>{moment(data.video.createdAt).fromNow()}</p>
                                                    </>
                                                )
                                            }
                                        </div> */}
                                        <div className='relative'>
                                            {
                                                checkVideoFileSize(data?.video?.file_size) ?
                                                <video 
                                                    src={`https://drive.google.com/u/3/uc?id=${getVideoId(data?.video?.link)}&export=download"`}
                                                    // src={"https://drive.google.com/u/3/uc?id=1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R&export=download"}
                                                    controls 
                                                    controlsList="nodownload" 
                                                    className='w-full lg:h-[450px] md:h-[400px] sm:h-[450px] xs:h-[400px] h-[225px] bg-black'
                                                    onPlay={addViews}
                                                />
                                                :
                                                <iframe 
                                                    ref={iframeRef} 
                                                    src={data?.video?.link}
                                                    className='w-full lg:h-[450px] md:h-[400px] sm:h-[450px] xs:h-[400px] h-[225px] rounded-md'
                                                    allow="autoplay"
                                                    onLoad={addViews}
                                                    sandbox="allow-scripts allow-same-origin"
                                                    allowFullScreen
                                                >
                                                </iframe>
                                            }
                                            {/* <iframe 
                                                ref={iframeRef} 
                                                src={data && data.video && data.video.link}
                                                className='w-full lg:h-[450px] md:h-[400px] sm:h-[450px] xs:h-[400px] h-[225px]'
                                                allow="autoplay"
                                                onLoad={addViews}
                                                sandbox="allow-scripts allow-same-origin"
                                                allowFullScreen
                                            >
                                            </iframe>
                                            <img
                                                className='absolute xs:top-1 xs:right-1 top-2 right-2 rounded-full xs:w-14 xs:h-14 w-12 h-12 border border-solid border-gray-500 opacity-0'
                                                src={ data ? data.avatar : avatar }
                                                alt="user profile"
                                            />
                                            <video 
                                                src={"https://drive.google.com/u/3/uc?id=1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R&export=download"}
                                                // src="https://rr5---sn-hoa7rn7z.c.drive.google.com/videoplayback?expire=1682878776&ei=-HhOZLjiH4_quwLxpZuwDA&ip=120.29.78.136&cp=QVRNVElfV1dVR1hPOkYxcVNWRFFpYnFBNldmWUFNY2NVYUk3QjhnX0VKS3F0WmhtNXE0U3FEdEg&id=0f78930136d2f5d2&itag=18&source=webdrive&requiressl=yes&mh=2B&mm=32&mn=sn-hoa7rn7z&ms=su&mv=m&mvi=5&pl=22&ttl=transient&susc=dr&driveid=12MAcfN7IJJnw808QyuahZ8jowCo1D8hD&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=585.746&lmt=1682842237185129&mt=1682863990&subapp=DRIVE_WEB_FILE_VIEWER&txp=0011224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRgIhAMSOdLtwcPgUEq9TcZdrz8r2SnV0KtykIgN4n9J8_YgZAiEAhLbF2X_NfR0wW1OtS8xKSXLFhPVVYJ19D738wLYYJDk=&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhANUndZYlVXlRwaceYMop7KuczODrzzSX0YxqeGa7el7jAiAvJ-fN-pQmIpTl1jzkcuJwVbKe4RLoZXwGpVg0ugOlCw==&cpn=TUNNpAe6t9-IMI3Q&c=WEB_EMBEDDED_PLAYER&cver=1.20230425.01.00"
                                                controls 
                                                controlsList="nodownload" 
                                                className='w-full lg:h-[450px] md:h-[400px] sm:h-[450px] xs:h-[400px] h-[225px]'
                                                onPlay={addViews}
                                            /> */}
                                        </div>
                                        <p className='my-2 font-semibold text-2xl break-all text-[#0DBFDC]'>{ data && data.video ? data.video.title : '' }</p>
                                        <div className='grid sm:grid-cols-2 grid-cols-1 mt-2'>
                                            <div className='flex xs:items-center items-start xs:flex-row flex-col mt-2 text-gray-400'>
                                                <Link to="" className='flex items-center'>
                                                    <img
                                                        className='rounded-full w-11 h-11 border border-solid border-[#1C1B19]'
                                                        src={ data ? convertDriveImageLink(data.avatar) : convertDriveImageLink(avatar) }
                                                        alt="user profile"
                                                    />
                                                    <div className='flex flex-col text-xs justify-between'>
                                                        <p className='ml-2 break-all text-[#0DBFDC] font-semibold mb-1 text-sm'>{ data ? data.username : "Anonymous" }</p>
                                                        <p className='ml-2 break-all '>Uploader</p>
                                                    </div>
                                                </Link>
                                                <div className='flex xs:mt-0 mt-2'>
                                                    <div className='h-8 px-4 rounded-full flex items-center xs:ml-6 ml-0 bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm' title="Views">
                                                        <FontAwesomeIcon icon={faEye} className="text-white mr-2"/>
                                                        <p>{ data && data.video ? data.video.views.length : 0 } <span className='xs:hidden inline-block'>view{data && data.video && data.video.views.length > 0 && 's'}</span></p>
                                                    </div>
                                                    <div className='rounded-r-lg h-8 px-4 rounded-full flex items-center xs:ml-4 ml-1 bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm' title="Likes">
                                                        <FontAwesomeIcon onClick={addLikes} style={{color: isAnimatingTU ? '#0DBFDC' : '#FFF'}} icon={faThumbsUp} className="mr-2 cursor-pointer"/>
                                                        <p>{ likes && likes.length }</p>
                                                    </div>
                                                    <div className='rounded-l-lg h-8 px-4 rounded-full flex items-center bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm' title="Dislikes">
                                                        <FontAwesomeIcon onClick={addDislikes} style={{color: isAnimatingTD ? '#0DBFDC' : '#FFF'}} icon={faThumbsDown} className="text-white mr-2 hover:text-[#CD3242] cursor-pointer"/>
                                                        <p>{ dislikes && dislikes.length }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap items-center sm:justify-end sm:mt-0 mt-2 gap-2'>
                                                <div className='relative'>
                                                    <button onClick={() => setOpenDirectory(!openDirectory)} className='rounded-full h-8 px-4 flex items-center bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm cursor-pointer hover:text-[#0DBFDC] transition-all'>
                                                        <FontAwesomeIcon icon={faBars} className="mr-2"/> Save
                                                    </button>
                                                    {
                                                        openDirectory && 
                                                        <div className='py-2 absolute top-[45px] z-10 right-0 flex flex-col bg-[#131C31] border border-solid border-[#222F43] font-poppins text-sm shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] w-40'>
                                                            <p className='font-semibold text-sm text-[#0DBFDC] px-4 mb-1'>SAVE TO</p>
                                                            <hr className='border-gray-700 mb-1'/>
                                                            {
                                                                archiveList.archive_list.map((item, index) => {
                                                                    const saved = archiveSaveLists.some((val) => val.directory_name === item.name);
                                                                    return (
                                                                        <Link onClick={() => watchLater(archiveList._id, item.name)} key={index} to="" className='text-xs px-4 py-1 hover:bg-gray-900 flex items-center'>
                                                                            <FontAwesomeIcon icon={saved ? faCheckSquare : faSquare} className="mr-2"/> 
                                                                            {item.name}
                                                                        </Link>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                                {
                                                    data && data.video && data.video.downloadable ? 
                                                        <button className='rounded-full h-8 px-4 flex items-center bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm cursor-pointer hover:text-[#0DBFDC] transition-all'>
                                                            <FontAwesomeIcon icon={faDownload} className="mr-2"/> Download
                                                        </button>
                                                        :
                                                        <button disabled={true} className='rounded-full h-8 px-4 flex items-center bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm cursor-pointer hover:text-[#0DBFDC] transition-all'>
                                                            <FontAwesomeIcon icon={faLinkSlash} className="mr-2"/> Download
                                                        </button>
                                                }
                                                <button disabled={true} onClick={() => watchLater()} className='rounded-full h-8 px-4 flex items-center bg-[#131C31] text-center border border-solid border-[#222F43] text-gray-100 text-sm cursor-pointer hover:text-[#0DBFDC] transition-all'>
                                                    <FontAwesomeIcon icon={faFlag} className="mr-2"/> Report
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full p-4 text-sm rounded-lg mt-4 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700">
                                            <p className='text-[#94a9c9] text-xs font-semibold'>{convertTimezone(data.video.createdAt)} ({moment(data.video.createdAt).fromNow()})</p>
                                            <p className='my-2 text-[#B9E0F2]'>[{ data ? data.username : "Anonymous" }] { data && data.video ? data.video.title : '' }</p>
                                            <p className='text-[#94a9c9]'>{ data.video.description ? data.video.description : 'No description' }</p>
                                        </div>
                                        {
                                            data && data.video && data.video.tags.length > 0 && (
                                                <div className='flex flex-wrap items-center mt-4 relative text-sm'>
                                                    <p className='mr-2 absolute top-0 left-0 mt-2 text-[#0DBFDC] font-semibold'>Tags:</p>
                                                    <div className='ml-12 flex flex-wrap items-center gap-2'>
                                                        {
                                                                data.video.tags.map((item, i) => {
                                                                    return (
                                                                        <Link key={i} to={`/videos/tags/${item}`}><p className='flex justify-between items-center cursor-pointer transition-all p-3 py-2 text-sm rounded-lg border border-solid border-[#222F43] text-gray-100 hover:text-[#0DBFDC]'>{item}</p></Link>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className='flex mt-4 text-sm'>
                                            <p className='mr-2 text-[#0DBFDC] font-semibold'>Artist:</p>
                                            <Link to={`/videos/artist/${data && data.video && data.video.owner ? data.video.owner : "Anonymous"}`}><p className='hover:text-[#0DBFDC] transition-all'>{data && data.video && data.video.owner ? data.video.owner : "Anonymous"}</p></Link>
                                        </div>
                                        <div className='md:block hidden'>
                                            {
                                                user ? (
                                                    <>
                                                        <h2 className='text-2xl font-semibold my-4 mt-8 text-[#B9E0F2]'>Leave a comment</h2>
                                                        <textarea
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            name="message"
                                                            id="message"
                                                            cols="30"
                                                            rows="8"
                                                            placeholder="Write a comment"
                                                            className="w-full p-4 text-sm rounded-lg mt-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700"
                                                        >
                                                        </textarea>
                                                        <button onClick={submitComment} className="text-sm float-right bg-[#0DBFDC] hover:bg-transparent hover:bg-[#131C31] text-gray-100 py-2 px-4 border border-[#222F43] rounded transition-colors duration-300 ease-in-out">
                                                            {
                                                                !submitted ?
                                                                (
                                                                    <>
                                                                        Post Comment
                                                                    </>
                                                                )
                                                                :
                                                                (
                                                                    <div className='flex flex-row justify-center items-center px-4'>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                                            </svg>
                                                                            <span class="sr-only">Loading...</span>
                                                                        </div>
                                                                        Sending
                                                                    </div>
                                                                )
                                                            }
                                                        </button>
                                                    </>
                                                )
                                                :
                                                (
                                                    <div className='mt-8 w-full border border-solid border-[#222F43] bg-[#131C31] text-gray-100 text-sm p-8 text-center'>
                                                        <p>You need to <a href='/login' className='hover:text-[#0DBFDC] transition-all'>login</a> to comment.</p>
                                                    </div>
                                                )
                                            }
                                        
                                            <div className='mt-12'>
                                                <h2 className='text-2xl font-semibold my-4 mt-8 text-[#B9E0F2]'>Comments ({ commentList && commentList.length ? commentList.length : 0 })</h2>
                                                {
                                                    commentList && commentList.length > 0 ?
                                                        commentList.map((item, i) => {
                                                            return (
                                                                <MotionAnimate key={i} animation='fadeInUp'>
                                                                    <div className="w-full p-4 text-sm rounded-lg mt-8 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700">
                                                                        <div className='grid grid-cols-2'>
                                                                            <div className='flex items-center text-[#0DBFDC]'>
                                                                                <img
                                                                                    className='rounded-full xs:w-6 xs:h-6 w-6 h-6 border border-solid border-[#222F43]'
                                                                                    src={item.avatar ? convertDriveImageLink(item.avatar) : convertDriveImageLink(avatar)}
                                                                                    alt="user profile"
                                                                                />
                                                                                <p className='ml-2 break-all'>
                                                                                    @{item.username}  
                                                                                    {
                                                                                        user?.result?.username === item.username && 
                                                                                            <span> (Me)</span>
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className='flex items-center justify-end text-gray-100'>
                                                                                <FontAwesomeIcon icon={faClock} className="text-gray-100"/>
                                                                                <p className='ml-2 break-all text-sm'>{moment(item.date).fromNow()}</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className='mt-4 whitespace-pre-wrap'>{item.comments}</p>
                                                                        {
                                                                            user?.result?.username === item.username && 
                                                                                <div className='flex justify-between items-center'>
                                                                                    <div></div>
                                                                                    <p onClick={() => deleteComment(data.video._id, item.id)} id={item.id} className='transition-all border border-solid border-[#222F43] text-gray-100 py-2 px-4 hover:text-[#0DBFDC] text-sm cursor-pointer'><FontAwesomeIcon icon={faTrash} className="mr-2"/> Delete</p>
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </MotionAnimate>
                                                            )
                                                        })
                                                        :
                                                        <p className='my-8 text-sm'> No comment to show</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:px-2'>
                                        <div className='transition-all p-4 py-3 text-sm rounded-t-lg bg-[#131C31] border border-solid border-[#222F43] font-poppins'>
                                            <p className='text-[#0DBFDC] font-semibold mb-1'>{ data ? data.username : "Anonymous" } Uploads</p>
                                            <p className='text-xs'>{uploads?.length > 0 ? uploads.length : 0} videos</p>
                                        </div>
                                        <div className='transition-all py-3 text-sm rounded-b-lg bg-[#131C31] border border-solid border-[#222F43] max-h-[500px] overflow-y-auto'>
                                            {
                                                uploads && uploads.length > 0 ?
                                                    uploads.map((item, index) => {
                                                        return (
                                                            <VideoThumbnail 
                                                                key={index} 
                                                                id={item._id} 
                                                                index={index} 
                                                                title={item.title} 
                                                                views={item.views} 
                                                                timestamp={item.createdAt} 
                                                                setActive={setActive} 
                                                                active={active} 
                                                                embedLink={getVideoId(item.link)}
                                                                currentId={getVideoId(data?.video?.link)}
                                                                user={user}
                                                                setAlertSubActive={setAlertSubActive}
                                                                fixed={false}
                                                                file_size={item.file_size}
                                                                archiveList={archiveList ? archiveList : {}}
                                                                likes={item.likes}
                                                                username={data ? data.username : "Anonymous" }
                                                                uploader={true}
                                                            />
                                                        )
                                                    })
                                                :
                                                <div className='flex items-center justify-center py-2'>
                                                    <div className='flex items-center justify-center'>
                                                        <img className="w-8" src={loading} />
                                                        <p className='text-white font-semibold text-base ml-2'>Loading Videos</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        {/* <div className='mb-8 sm:pt-4 text-white md:bg-transparent xs:bg-gray-800 bg-transparent  md:rounded-none rounded-md md:p-4 xs:p-8 py-8 mx-auto'>
                                            <h2 className='text-2xl font-semibold mb-6'>Related Videos</h2>
                                            <div className='md:flex md:flex-col xs:grid md:grid-cols-2 xs:gap-5 grid-cols-1 lg:pr-16'>
                                                {
                                                    related && related.length > 0 &&
                                                        related.map((item, index) => {
                                                            return (
                                                                <div className='mb-2'>
                                                                    <MotionAnimate key={index} animation='fadeInUp'>
                                                                        <VideoThumbnail 
                                                                            key={index} 
                                                                            id={item._id} 
                                                                            index={index} 
                                                                            title={item.title} 
                                                                            views={item.views} 
                                                                            timestamp={item.createdAt} 
                                                                            setActive={setActive} 
                                                                            active={active} 
                                                                            embedLink={getVideoId(item.link)}
                                                                            currentId={getVideoId(data?.video?.link)}
                                                                            user={user}
                                                                            setAlertSubActive={setAlertSubActive}
                                                                            fixed={false}
                                                                            file_size={item.file_size}
                                                                            archiveList={archiveList ? archiveList : {}}
                                                                            likes={item.likes}
                                                                        />
                                                                    </MotionAnimate>
                                                                </div>
                                                            )
                                                        })
                                                }
                                            </div>
                                        </div>                                     */}
                                    </div>
                                    <div className='md:hidden block'>
                                        {
                                            user ? (
                                                <>
                                                    <h2 className='text-3xl font-semibold my-4 mt-8 text-[#B9E0F2]'>Leave a comment</h2>
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        name="message"
                                                        id="message"
                                                        cols="30"
                                                        rows="8"
                                                        placeholder="Write a comment"
                                                        className="w-full p-4 text-sm rounded-lg mt-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700"
                                                    >
                                                    </textarea>
                                                    <button onClick={submitComment} className="text-sm float-right bg-[#0DBFDC] hover:bg-transparent hover:bg-[#131C31] text-gray-100 py-2 px-4 border border-[#222F43] rounded transition-colors duration-300 ease-in-out">
                                                        {
                                                            !submitted ?
                                                            (
                                                                <>
                                                                    Post Comment
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <div className='flex flex-row justify-center items-center px-4'>
                                                                    <div role="status">
                                                                        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                                        </svg>
                                                                        <span class="sr-only">Loading...</span>
                                                                    </div>
                                                                    Sending
                                                                </div>
                                                            )
                                                        }
                                                    </button>
                                                </>
                                            )
                                            :
                                            (
                                                <div className='mt-8 w-full border border-solid border-[#222F43] bg-[#131C31] text-gray-100 text-sm p-8 text-center'>
                                                    <p>You need to <a href='/login' className='hover:text-[#0DBFDC] transition-all'>login</a> to comment.</p>
                                                </div>
                                            )
                                        }
                                    
                                        <div className='mt-12'>
                                            <h2 className='text-2xl font-semibold my-4 mt-8 text-[#B9E0F2]'>Comments ({ commentList && commentList.length ? commentList.length : 0 })</h2>
                                            {
                                                commentList && commentList.length > 0 ?
                                                    commentList.map((item, i) => {
                                                        return (
                                                            <MotionAnimate key={i} animation='fadeInUp'>
                                                                <div className="w-full p-4 text-sm rounded-lg mt-8 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700">
                                                                    <div className='grid grid-cols-2'>
                                                                        <div className='flex items-center text-[#0DBFDC]'>
                                                                            <img
                                                                                className='rounded-full xs:w-6 xs:h-6 w-6 h-6 border border-solid border-[#222F43]'
                                                                                src={item.avatar ? convertDriveImageLink(item.avatar) : convertDriveImageLink(avatar)}
                                                                                alt="user profile"
                                                                            />
                                                                            <p className='ml-2 break-all'>
                                                                                @{item.username}  
                                                                                {
                                                                                    user?.result?.username === item.username && 
                                                                                        <span> (Me)</span>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className='flex items-center justify-end text-gray-100'>
                                                                            <FontAwesomeIcon icon={faClock} className="text-gray-100"/>
                                                                            <p className='ml-2 break-all text-sm'>{moment(item.date).fromNow()}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className='mt-4 whitespace-pre-wrap'>{item.comments}</p>
                                                                    {
                                                                        user?.result?.username === item.username && 
                                                                            <div className='flex justify-between items-center'>
                                                                                <div></div>
                                                                                <p onClick={() => deleteComment(data.video._id, item.id)} id={item.id} className='transition-all border border-solid border-[#222F43] text-gray-100 py-2 px-4 hover:text-[#0DBFDC] text-sm cursor-pointer'><FontAwesomeIcon icon={faTrash} className="mr-2"/> Delete</p>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </MotionAnimate>
                                                        )
                                                    })
                                                    :
                                                    <p className='my-8'> No comments to show</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            :
                            <div
                                    className="relative bg-cover bg-center py-20"
                                    style={{ backgroundColor: "#111827" }}
                                >   
                                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                    <div className={`${styles.boxWidthEx}`}>
                                        <div className="flex flex-col justify-center items-center">
                                            <h1 className="text-white text-4xl font-bold mb-4 text-center opacity-0">Video</h1>
                                            <p className="text-white text-lg mb-8 text-center opacity-0">video</p>
                                            <a href="/videos" className="text-white underline hover:text-gray-200 opacity-0">video</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideosSingle