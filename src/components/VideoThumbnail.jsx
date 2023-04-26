import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
const TextWithEllipsis = ({ text, limit = 40 }) => {
  if (text.length > limit) {
    return <span>{text.slice(0, limit)}...</span>;
  }
  return <span>{text}</span>;
}

const VideoThumbnail = ({ embedLink, index, active, setActive, height }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if(index !== active) setIsOpen(false)
  }, [active])
  return (
    <Link to={`/videos/${embedLink}`}>
      <div className='w-full text-white'>
          <div className='bg-black'>
            <img 
              src={`https://drive.google.com/thumbnail?id=${embedLink}`} alt="Video Thumbnail" 
              className='h-[150px] mx-auto'
              style={{height: height ? height+"px" : "150px"}}
            />
          </div>
          <div className='relative'>
            <p><TextWithEllipsis text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /></p>
            <div className='flex items-center mt-2 text-gray-400 text-sm'>
              <FontAwesomeIcon icon={faEye} className="mr-1"/>
              <p>1.5k</p>
              <p className='text-gray-400 ml-2 break-all'>1 month</p>
              <FontAwesomeIcon onClick={() => {
                setActive(index)
                setIsOpen(!isOpen)
              }} icon={faEllipsisV} className="absolute bottom-0 right-0 mr-1 cursor-pointer hover:text-gray-500"/>
            </div>
            {
              isOpen && (index === active) &&
                <div className='absolute bottom-[-95px] z-10 right-0 flex flex-col bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] w-32'>
                  <Link to="" className='px-4 py-2 hover:bg-gray-900'>Watch Later</Link>
                  <Link to="" className='px-4 py-2 hover:bg-gray-900'>Report</Link>
                </div>
            }
          </div>
      </div>
    </Link>
  )
};

export default VideoThumbnail;
