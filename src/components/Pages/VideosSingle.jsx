import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEllipsisV, faThumbsUp, faThumbsDown, faAdd, faDownload, faArrowRightRotate, faClock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { getVideoByID } from "../../actions/video";
import { useParams } from 'react-router-dom'
import styles from "../../style";
import VideoThumbnail from '../VideoThumbnail';
import avatar from '../../assets/avatar.png'

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

const VideosSingle = () => {
    const dispatch = useDispatch()
    const video = useSelector((state) => state.video.data)
    const { id } = useParams();
    
    const [active, setActive] = useState(0)

    useEffect(() => {
        dispatch(getVideoByID({ videoId: id }))
    }, [])

    const addLikes = () => {

    }

    const addDislikes = () => {

    }

    return (
        <div
            className="relative bg-cover bg-center py-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                            <div className="w-full md:col-span-2 text-white">
                                <p className=' mb-4 font-semibold text-3xl'>{ video && video.video ? video.video.title : '' }</p>
                                <div className='flex flex-row flex-wrap justify-start'>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-md py-1 mb-2 mr-2 bg-[#CD3242] xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>adventure</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-md py-1 mb-2 mr-2 bg-[#CD3242] xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>rpg</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-md py-1 mb-2 mr-2 bg-[#CD3242] xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>puzzel</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-md py-1 mb-2 mr-2 bg-[#CD3242] xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>simulation</p></Link>
                                </div>
                                <iframe 
                                    src={ video && video.video ? video.video.link : '' }
                                    className='w-full xs:h-[550px] h-[200px]'
                                    allow="autoplay" 
                                    frameborder="0" 
                                    allowFullScreen="1" 
                                    sandbox="allow-same-origin allow-scripts">
                                </iframe>
                                <div className='grid xs:grid-cols-2 grid-cols-1 mt-2'>
                                    <div className='flex items-center mt-2 text-gray-400'>
                                        <img
                                            className='rounded-full xs:w-8 xs:h-8 w-8 h-8'
                                            src={ video ? video.avatar : avatar }
                                            alt="user profile"
                                        />
                                        <p className='ml-2 break-all'>{ video ? video.username : "Anonymous" }</p>
                                        <div className='flex items-center ml-8'>
                                            <FontAwesomeIcon icon={faEye} className="text-white mr-2"/>
                                            <p>{ video && video.video ? video.video.likes.length : 0 }</p>
                                        </div>
                                        <div className='flex items-center ml-8'>
                                            <FontAwesomeIcon onClick={addLikes} icon={faThumbsUp} className="text-white mr-2"/>
                                            <p>{ video && video.video ? video.video.dislikes.length : 0 }</p>
                                        </div>
                                        <div className='flex items-center ml-4'>
                                            <FontAwesomeIcon onClick={addDislikes} icon={faThumbsDown} className="text-white mr-2"/>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center xs:justify-end xs:mt-0 mt-2'>
                                        <button className="mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                            <FontAwesomeIcon icon={faAdd} className="text-white mr-2"/> Watch Later
                                        </button>
                                        <button className="bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                            <FontAwesomeIcon icon={faDownload} className="text-white mr-2"/> Download
                                        </button>
                                    </div>
                                </div>
                                <div className='md:block hidden'>
                                    <div className='mt-8'>
                                        <p>Write a comment</p>
                                        <textarea
                                            name="message"
                                            id="message"
                                            cols="30"
                                            rows="5"
                                            placeholder="Message"
                                            className="w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-gray-600 bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700"
                                        >
                                        </textarea>
                                        <button className="sm:float-right bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                            <FontAwesomeIcon icon={faArrowRightRotate} className="text-white mr-2"/> Submit
                                        </button>
                                    </div>
                                    <div className='mt-8'>
                                        <p>Comments ({ video && video.video ? video.video.comment.length : 0 })</p>
                                        <div className='mt-8'>
                                            <div className='grid grid-cols-2'>
                                                <div className='flex items-center text-gray-400'>
                                                    <img
                                                        className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='ml-2 break-all'>RazorScythe</p>
                                                </div>
                                                <div className='flex items-center justify-end text-gray-400'>
                                                <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                    <p className='ml-2 break-all text-sm'>1 mins ago</p>
                                                </div>
                                            </div>
                                            <p className='mt-4 text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est.</p>
                                        </div>
                                        <div className='mt-8'>
                                            <div className='grid grid-cols-2'>
                                                <div className='flex items-center text-gray-400'>
                                                    <img
                                                        className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='ml-2 break-all'>RazorScythe</p>
                                                </div>
                                                <div className='flex items-center justify-end text-gray-400'>
                                                <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                    <p className='ml-2 break-all text-sm'>1 mins ago</p>
                                                </div>
                                            </div>
                                            <p className='mt-4 text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est.</p>
                                        </div>
                                        <div className='mt-8'>
                                            <div className='grid grid-cols-2'>
                                                <div className='flex items-center text-gray-400'>
                                                    <img
                                                        className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='ml-2 break-all'>RazorScythe</p>
                                                </div>
                                                <div className='flex items-center justify-end text-gray-400'>
                                                <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                    <p className='ml-2 break-all text-sm'>1 mins ago</p>
                                                </div>
                                            </div>
                                            <p className='mt-4 text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est.</p>
                                        </div>
                                        <div className='mt-8'>
                                            <div className='grid grid-cols-2'>
                                                <div className='flex items-center text-gray-400'>
                                                    <img
                                                        className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='ml-2 break-all'>RazorScythe</p>
                                                </div>
                                                <div className='flex items-center justify-end text-gray-400'>
                                                <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                    <p className='ml-2 break-all text-sm'>1 mins ago</p>
                                                </div>
                                            </div>
                                            <p className='mt-4 text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='mb-8 md:p-8 sm:pt-4 pt-0 text-white'>
                                    <h2 className='text-2xl font-semibold mb-6'>Related Videos</h2>
                                    <div className='md:flex md:flex-col sm:grid xs:grid-cols-2 sm:gap-4 grid-cols-1'>
                                        <div className='mb-4'><VideoThumbnail height={170} index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/></div>
                                        <div className='mb-4'><VideoThumbnail height={170} index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/></div>
                                        <div className='mb-4'><VideoThumbnail height={170} index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/></div>
                                        <div className='mb-4'><VideoThumbnail height={170} index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/></div>
                                        <div className='mb-4'><VideoThumbnail height={170} index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/></div>
                                        <div className='mb-4'><VideoThumbnail height={170} index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/></div>
                                    </div>
                                </div>                                    
                            </div>
                            <div className='md:hidden block text-white'>
                                <div className=''>
                                    <p>Write a comment</p>
                                    <textarea
                                        name="message"
                                        id="message"
                                        cols="30"
                                        rows="5"
                                        placeholder="Message"
                                        className="w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-gray-600 bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700"
                                    >
                                    </textarea>
                                    <button className="float-right bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                        <FontAwesomeIcon icon={faArrowRightRotate} className="text-white mr-2"/> Submit
                                    </button>
                                </div>
                                <div className='mt-8'>
                                    <p>Comments (1)</p>
                                    <div className='mt-8'>
                                        <div className='grid grid-cols-2'>
                                            <div className='flex items-center text-gray-400'>
                                                <img
                                                    className='rounded-full xs:w-6 xs:h-6 w-6 h-6'
                                                    src={avatar}
                                                    alt="user profile"
                                                />
                                                <p className='ml-2 break-all'>RazorScythe</p>
                                            </div>
                                            <div className='flex items-center justify-end text-gray-400'>
                                            <FontAwesomeIcon icon={faClock} className="text-white"/>
                                                <p className='ml-2 break-all text-sm'>1 mins ago</p>
                                            </div>
                                        </div>
                                        <p className='mt-4 text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideosSingle