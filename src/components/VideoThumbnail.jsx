import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux'
import { addToWatchLater } from "../actions/video";
import { Link } from 'react-router-dom';
import moment from 'moment'

const TextWithEllipsis = ({ text, limit = 30 }) => {
  if (text.length > limit) {
    return <span>{text.slice(0, limit)}...</span>;
  }
  return <span>{text}</span>;
}

const VideoThumbnail = ({ id, embedLink, index, active, title, views, timestamp, setActive, height, user, setAlertSubActive }) => {

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
    <div className='mx-auto w-64 text-white transition-all sm:px-0 xs:px-4 px-2'>
        <Link to={`/videos/${id}`}>
          <div className='bg-black'>
            <img 
              src={`https://drive.google.com/thumbnail?id=${embedLink}`} alt="Video Thumbnail" 
              className='h-[150px] mx-auto'
              style={{height: height ? height+"px" : "150px"}}
            />
          </div>
        </Link>
        <div className='relative'>
        <Link to={`/videos/${embedLink}`}><p className='break-words'><TextWithEllipsis text={title} /></p></Link>
          <div className='flex items-center mt-2 text-gray-400 text-sm'>
            <FontAwesomeIcon icon={faEye} className="mr-1"/>
            <p>{views.length}</p>
            <p className='text-gray-400 ml-2 break-all'>{moment(timestamp).fromNow()}</p>
            <FontAwesomeIcon onClick={() => {
              setActive(index)
              setIsOpen(!isOpen)
            }} icon={faEllipsisV} className="absolute bottom-0 right-0 mr-1 cursor-pointer hover:text-gray-500"/>
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
  )
};

export default VideoThumbnail;
