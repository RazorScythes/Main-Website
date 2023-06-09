import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEllipsisV, faCode, faVideo, faFileVideo, faPhotoVideo, faVideoSlash, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux'
import { addToWatchLater } from "../actions/video";
import { Link } from 'react-router-dom';
import moment from 'moment'

const TextWithEllipsis = ({ text, limit = 70 }) => {
  if (text.length > limit) {
    return <span>{text.slice(0, limit)}...</span>;
  }
  return <span>{text}</span>;
}

const checkVideoFileSize = (size = "") => {
  if(!size) return false

  var file_size = size.split(" ")

  if(Number(file_size[0]) <= 100) return true
  return false
}

const VideoThumbnail = ({ id, embedLink, index, active, title, views, timestamp, setActive, height, user, setAlertSubActive, fixed = true, file_size }) => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { 
    if(index !== active) setIsOpen(false)
  }, [active])

  const watchLater = () => {
    if(!user) {
        setAlertSubActive('no user')
    }
    else {
        dispatch(addToWatchLater({
            id: user?.result._id,
            videoId: id
        }))
    }
  }

  return (
    <>
    {
      fixed ?
        <div className='mx-auto xs:w-full w-64 text-white transition-all sm:px-0 xs:px-4 px-2'>
            <Link to={`/videos/${id}`}>
              <div className='bg-black rounded-lg overflow-hidden relative'>
                <img 
                  src={`https://drive.google.com/thumbnail?id=${embedLink}`} alt="Video Thumbnail" 
                  className='h-[150px] mx-auto object-cover'
                  style={{height: height ? height+"px" : "161px"}}
                />
                <div className='absolute top-0 right-0 bg-gray-800'>
                  <p className='font-semibold p-1 px-2'><FontAwesomeIcon icon={checkVideoFileSize(file_size) ? faVideoCamera : faCode} /></p>
                </div>
              </div>
            </Link>
            <div className='relative'>
            <Link to={`/videos/${id}`}><p className='break-words mt-1'><TextWithEllipsis text={title} /></p></Link>
              <div className='flex items-center mt-1 text-gray-400 text-sm'>
                <FontAwesomeIcon icon={faEye} className="mr-1"/>
                <p>{views.length} view{views.length > 1 && "s"} | </p> 
                <p className='text-gray-400 ml-2 break-all'>{moment(timestamp).fromNow()}</p>
                <button onClick={() => {
                    setActive(index)
                    setIsOpen(!isOpen)
                }}>
                  <FontAwesomeIcon icon={faEllipsisV} className="absolute bottom-0 right-0 mr-1 cursor-pointer hover:text-gray-500"/>
                </button>
              </div>
              {
                isOpen && (index === active) &&
                  <div className='absolute bottom-[-95px] z-10 right-0 flex flex-col bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] w-32'>
                    <Link onClick={() => watchLater()} to="" className='px-4 py-2 hover:bg-gray-900'>Watch Later</Link>
                    <Link to="" className='px-4 py-2 hover:bg-gray-900'>Report</Link>
                  </div>
              }
            </div>
        </div>
      :
        <div className='mx-auto xs:w-full w-64 text-white transition-all sm:px-0'>
            <div className='md:block xs:flex block'>
              <Link to={`/videos/${id}`}>
                <div className='bg-black rounded-lg overflow-hidden md:w-full xs:w-44 w-64 mr-4 relative border border-gray-900'>
                  <img 
                    src={`https://drive.google.com/thumbnail?id=${embedLink}`} alt="Video Thumbnail" 
                    className='mx-auto object-cover md:h-[161px] xs:h-[100px] h-[161px]'
                    // style={{height: height ? height+"px" : "100px"}}
                  />
                  <div className='absolute top-0 right-0 bg-gray-800'>
                    <p className='font-semibold p-1 px-2'><FontAwesomeIcon title={checkVideoFileSize(file_size) ? 'Video' : 'Embed'} icon={checkVideoFileSize(file_size) ? faVideoCamera : faCode} /></p>
                  </div>
                </div>
              </Link>
              <div className='relative w-full'>
              <Link to={`/videos/${id}`}><p className='break-words mt-1'><TextWithEllipsis text={title} /></p></Link>
                <div className='flex items-center mt-1 text-gray-400 text-sm'>
                  <FontAwesomeIcon icon={faEye} className="mr-1"/>
                  <p>{views.length} view{views.length > 1 && "s"} | </p> 
                  <p className='text-gray-400 ml-2 break-all'>{moment(timestamp).fromNow()}</p>
                  <button onClick={() => {
                      setActive(index)
                      setIsOpen(!isOpen)
                  }}>
                    <FontAwesomeIcon icon={faEllipsisV} className="absolute bottom-0 right-0 mr-1 cursor-pointer hover:text-gray-500"/>
                  </button>
                </div>
                {
                  isOpen && (index === active) &&
                    <div className='absolute bottom-[-95px] z-10 right-0 flex flex-col bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] w-32'>
                      <Link onClick={() => watchLater()} to="" className='px-4 py-2 hover:bg-gray-900'>Watch Later</Link>
                      <Link to="" className='px-4 py-2 hover:bg-gray-900'>Report</Link>
                    </div>
                }
              </div>
            </div>
        </div>
    }
    </>
  )
};

export default VideoThumbnail;
