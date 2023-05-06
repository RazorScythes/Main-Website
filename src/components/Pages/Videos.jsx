import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideos } from "../../actions/video";
import Loading from './Loading';
import styles from "../../style";
import VideoThumbnail from '../VideoThumbnail';

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

const Videos = ({ user }) => {
    const [active, setActive] = useState(0)
    const dispatch = useDispatch()

    const video = useSelector((state) => state.video.videos)
    const message = useSelector((state) => state.video.message)

    useEffect(() => {
      
    }, [message])

    useEffect(() => {
      dispatch(getVideos({
        id: user ? user.result?._id : ''
      }))
    }, [])

    return (
        <div
            className="relative bg-cover bg-center py-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.flexCenter}`}>
                {
                  message.length > 0 ?
                    <div className='h-96 flex flex-col items-center justify-center'> 
                      <h3 className='text-white text-3xl'>{message}</h3>
                      <a href="/videos">
                        <button className="mt-6 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                            Reload Page
                        </button>
                      </a>
                    </div>
                  :
                  video && video.length > 0 ?
                    <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start sm:px-16 py-8'>
                      {
                          video.map((item, index) => {
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
                              />
                            )
                          })
                      }
                    </div>
                  :
                  <Loading text="Loading videos" />
                }
                
                {/* <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start sm:px-16 py-8'>
                    {
                      video && video.length > 0 &&
                        video.map((item, index) => {
                          return (
                            <VideoThumbnail key={index} index={index} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/>
                          )
                        })
                    }
                </div> */}
            </div>
        </div>
    )
}

export default Videos