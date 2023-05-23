import React, { useEffect, useState, useRef  } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEllipsisV, faThumbsUp, faThumbsDown, faAdd, faDownload, faArrowRightRotate, faClock, faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { addOneLikes, addOneDislikes, addOneViews, getVideoByID, getComments, getRelatedVideos, uploadComment, removeComment } from "../../actions/video";
import { useParams } from 'react-router-dom'
import { Page_not_found } from '../../assets';
import moment from 'moment'
import styles from "../../style";
import VideoThumbnail from '../VideoThumbnail';
import Avatar from '../../assets/avatar.png'
import Cookies from 'universal-cookie';
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

    useEffect(() => {
        dispatch(getVideoByID({ id: user ? user.result?._id : '', videoId: id }))
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

    useEffect(() => {
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
                avatar: avatar ? avatar : Avatar,
                user: user?.result.username,
                comment: comment
            }))
            setSubmitted(true)
        }
    }

    const deleteComment = (parent_id, comment_id) => {
        if(!deleted) {
            dispatch(removeComment({
                parent_id: parent_id,
                comment_id: comment_id
            }))
            setDeleted(true)
        }
    }

    return (
        <div
            className="relative bg-cover bg-center py-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        {
                            isLoading ?
                                <div className='h-96 flex items-center justify-center'>
                                    <div className='flex md:flex-row flex-col items-center justify-center'>
                                      
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
                                                <h1 className="text-white text-4xl font-bold mb-4">Restricted Video</h1>
                                                <p className="text-white text-lg mb-8">You don't have permission to view this video.</p>
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
                                                <h1 className="text-white text-4xl font-bold mb-4">Video is Private</h1>
                                                <p className="text-white text-lg mb-8">Contact the owner to provide information about this.</p>
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
                                                <h1 className="text-white text-4xl font-bold mb-4">Video not Found</h1>
                                                <p className="text-white text-lg mb-8">The video you're looking for doesn't exist.</p>
                                                <a href="/videos" className="text-white underline hover:text-gray-200">Go back to videos page</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                    <div className="w-full md:col-span-2 text-white">
                                        <p className='mb-4 font-semibold xs:text-3xl text-2xl break-all'>{ data && data.video ? data.video.title : '' }</p>
                                        <div className='flex items-center mb-4'>
                                            {
                                                data && data.video && (
                                                    <>
                                                        <FontAwesomeIcon icon={faCalendar} className="text-white"/>
                                                        <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>{moment(data.video.createdAt).fromNow()}</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div className='relative'>
                                            <iframe 
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
                                            {/* <video 
                                                src="https://gdurl.com/FEfT"
                                                //src="https://rr5---sn-hoa7rn7z.c.drive.google.com/videoplayback?expire=1682878776&ei=-HhOZLjiH4_quwLxpZuwDA&ip=120.29.78.136&cp=QVRNVElfV1dVR1hPOkYxcVNWRFFpYnFBNldmWUFNY2NVYUk3QjhnX0VKS3F0WmhtNXE0U3FEdEg&id=0f78930136d2f5d2&itag=18&source=webdrive&requiressl=yes&mh=2B&mm=32&mn=sn-hoa7rn7z&ms=su&mv=m&mvi=5&pl=22&ttl=transient&susc=dr&driveid=12MAcfN7IJJnw808QyuahZ8jowCo1D8hD&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=585.746&lmt=1682842237185129&mt=1682863990&subapp=DRIVE_WEB_FILE_VIEWER&txp=0011224&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRgIhAMSOdLtwcPgUEq9TcZdrz8r2SnV0KtykIgN4n9J8_YgZAiEAhLbF2X_NfR0wW1OtS8xKSXLFhPVVYJ19D738wLYYJDk=&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhANUndZYlVXlRwaceYMop7KuczODrzzSX0YxqeGa7el7jAiAvJ-fN-pQmIpTl1jzkcuJwVbKe4RLoZXwGpVg0ugOlCw==&cpn=TUNNpAe6t9-IMI3Q&c=WEB_EMBEDDED_PLAYER&cver=1.20230425.01.00"
                                                controls 
                                                controlsList="nodownload" 
                                                className='w-full lg:h-[550px] md:h-[470px] sm:h-[450px] xs:h-[400px] h-[225px]'
                                                onPlay={addViews}
                                            /> */}
                                        </div>
                                        <div className='grid sm:grid-cols-2 grid-cols-1 mt-2'>
                                            <div className='flex xs:items-center items-start xs:flex-row flex-col mt-2 text-gray-400'>
                                                <Link to="" className='flex items-center'>
                                                    <img
                                                        className='rounded-full xs:w-8 xs:h-8 w-8 h-8 border border-solid border-gray-500'
                                                        src={ data ? data.avatar : avatar }
                                                        alt="user profile"
                                                    />
                                                    <p className='ml-2 break-all text-white'>{ data ? data.username : "Anonymous" }</p>
                                                </Link>
                                                <div className='flex xs:mt-0 mt-2'>
                                                    <div className='flex items-center xs:ml-8 ml-0'>
                                                        <FontAwesomeIcon icon={faEye} className="text-white mr-2"/>
                                                        <p>{ data && data.video ? data.video.views.length : 0 } <span className='xs:hidden inline-block'>view{data && data.video && data.video.views.length > 0 && 's'}</span></p>
                                                    </div>
                                                    <div className='flex items-center ml-8'>
                                                        <FontAwesomeIcon onClick={addLikes} style={{color: isAnimatingTU ? '#CD3242' : '#FFF'}} icon={faThumbsUp} className="mr-2 cursor-pointer"/>
                                                        <p>{ likes && likes.length }</p>
                                                    </div>
                                                    <div className='flex items-center ml-4'>
                                                        <FontAwesomeIcon onClick={addDislikes} style={{color: isAnimatingTD ? '#CD3242' : '#FFF'}} icon={faThumbsDown} className="text-white mr-2 hover:text-[#CD3242] cursor-pointer"/>
                                                        <p>{ dislikes && dislikes.length }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex items-center sm:justify-end sm:mt-0 mt-2'>
                                                <div className='sm:w-auto w-full grid grid-cols-2 gap-5 mt-2'>
                                                    {
                                                        user &&
                                                            <button className="w-full mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                                                <FontAwesomeIcon icon={faAdd} className="text-white mr-2"/> Watch Later
                                                            </button>
                                                    }
                                                    <button className="sm:w-auto w-full bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                                        <FontAwesomeIcon icon={faDownload} className="text-white mr-2"/> Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            data && data.video && data.video.tags.length > 0 && (
                                                <div className='flex flex-wrap items-center mt-4 relative'>
                                                    <p className='mr-2 absolute top-0 left-0 mt-2'>Tags:</p>
                                                    <div className='ml-12 flex flex-wrap items-center'>
                                                        {
                                                                data.video.tags.map((item, i) => {
                                                                    return (
                                                                        <Link key={i} to={`/videos/tags/${item}`}><p className='mt-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-white border border-gray-100 px-4 py-1 mr-2 xs:text-sm text-sm transition-all capitalize'>{item}</p></Link>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className='flex mt-4'>
                                            <p className='mr-2'>Owner:</p>
                                            <Link to=""><p className=''>{data && data.video && data.video.owner ? data.video.owner : "Anonymous"}</p></Link>
                                        </div>
                                        <div className='md:block hidden'>
                                            {
                                                user ? (
                                                    <div className='mt-8'>
                                                        <p>Write a comment</p>
                                                        <textarea
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            name="message"
                                                            id="message"
                                                            cols="30"
                                                            rows="5"
                                                            placeholder="Message"
                                                            className="w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-gray-600 bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700"
                                                        >
                                                        </textarea>
                                                        <button onClick={submitComment} className="float-right bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                                            {
                                                                !submitted ?
                                                                (
                                                                    <>
                                                                        <FontAwesomeIcon icon={faArrowRightRotate} className="text-white mr-2"/> Comment
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
                                                                        Submitting
                                                                    </div>
                                                                )
                                                            }
                                                        </button>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='mt-8 w-full border-2 border-solid border-gray-400 p-8 text-center'>
                                                        <p>You need to <a href='/login' className='hover:underline'>login</a> to comment.</p>
                                                    </div>
                                                )
                                            }
                                            <div className='mt-8'>
                                                <p>Comments ({ commentList && commentList.length ? commentList.length : 0 })</p>
                                                {
                                                    commentList && commentList.length > 0 ?
                                                        commentList.map((item, i) => {
                                                            return (
                                                                <div key={i} className='mt-8 border-l-4 border-solid border-gray-300 pl-3 rounded-l-sm py-1'>
                                                                    <div className='grid grid-cols-2'>
                                                                        <div className='flex items-center text-gray-400'>
                                                                            <img
                                                                                className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                                                src={item.avatar ? item.avatar : avatar}
                                                                                alt="user profile"
                                                                            />
                                                                            <p className='ml-2 break-all'>
                                                                                {item.username}  
                                                                                {
                                                                                    user?.result?.username === item.username && 
                                                                                        <span> (Me)</span>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className='flex items-center justify-end text-gray-400'>
                                                                            <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                                            <p className='ml-2 break-all text-sm'>{moment(item.date).fromNow()}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className='mt-4 text-gray-300 whitespace-pre-wrap'>{item.comments}</p>
                                                                    {
                                                                        user?.result?.username === item.username && 
                                                                            <p onClick={() => deleteComment(video.video._id, item.id)} id={item.id} className='flex justify-end items-center text-gray-300 hover:text-gray-400 text-sm cursor-pointer'><FontAwesomeIcon icon={faTrash} className="mr-2"/> Delete</p>
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <p className='my-8'> No comments to show</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='mb-8 md:p-8 sm:pt-4 pt-0 text-white'>
                                            <h2 className='text-2xl font-semibold mb-6'>Related Videos</h2>
                                            <div className='md:flex md:flex-col xs:grid xs:grid-cols-2 xs:gap-5 grid-cols-1'>
                                                {
                                                    related && related.length > 0 &&
                                                        related.map((item, index) => {
                                                            return (
                                                                <div className='mb-2'>
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
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                }
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className='md:hidden block text-white'>
                                        {
                                            user ? (
                                                <div className='mt-8'>
                                                    <p>Write a comment</p>
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        name="message"
                                                        id="message"
                                                        cols="30"
                                                        rows="5"
                                                        placeholder="Message"
                                                        className="w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-gray-600 bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700"
                                                    >
                                                    </textarea>
                                                    <button onClick={submitComment} className="float-right bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                                        {
                                                            !submitted ?
                                                            (
                                                                <>
                                                                    <FontAwesomeIcon icon={faArrowRightRotate} className="text-white mr-2"/> Comment
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
                                                                    Submitting
                                                                </div>
                                                            )
                                                        }
                                                    </button>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className='mt-8 w-full border-2 border-solid border-gray-400 p-8 text-center'>
                                                    <p>You need to <a href='/login' className='hover:underline'>login</a> to comment.</p>
                                                </div>
                                            )
                                        }
                                        <div className='mt-8'>
                                            <p>Comments ({ commentList && commentList.length ? commentList.length : 0 })</p>
                                            {
                                                commentList && commentList.length > 0 ?
                                                    commentList.map((item, i) => {
                                                        return (
                                                            <div key={i} className='mt-8 border-l-4 border-solid border-gray-300 pl-3 rounded-l-sm py-1'>
                                                                <div className='grid grid-cols-2'>
                                                                    <div className='flex items-center text-gray-400'>
                                                                        <img
                                                                            className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                                            src={item.avatar ? item.avatar : avatar}
                                                                            alt="user profile"
                                                                        />
                                                                        <p className='ml-2 break-all'>
                                                                            {item.username}  
                                                                            {
                                                                                user?.result?.username === item.username && 
                                                                                    <span> (Me)</span>
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end text-gray-400'>
                                                                        <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                                        <p className='ml-2 break-all text-sm'>{moment(item.date).fromNow()}</p>
                                                                    </div>
                                                                </div>
                                                                <p className='mt-4 text-gray-300 whitespace-pre-wrap'>{item.comments}</p>
                                                                {
                                                                    user?.result?.username === item.username && 
                                                                        <p onClick={() => deleteComment(video.video._id, item.id)} id={item.id} className='flex justify-end items-center text-gray-300 hover:text-gray-400 text-sm cursor-pointer'><FontAwesomeIcon icon={faTrash} className="mr-2"/> Delete</p>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <p className='my-8'> No comments to show</p>
                                            }
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