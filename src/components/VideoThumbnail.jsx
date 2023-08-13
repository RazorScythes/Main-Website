import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEllipsisV, faCode, faVideo, faFileVideo, faPhotoVideo, faVideoSlash, faVideoCamera, faChevronRight, faMinus, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
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

const VideoThumbnail = ({ id, embedLink, index, active, title, views, timestamp, setActive, height, user, setAlertSubActive, fixed = true, file_size, archiveList }) => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [openDirectory, setOpenDirectory] = useState(false)

  useEffect(() => { 
    if(index !== active) setIsOpen(false)
  }, [active])

  const watchLater = (archiveId, directory = 'Default Archive') => {
    if(!user) {
        setAlertSubActive('no user')
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
                <div className='absolute top-0 right-0 bg-gray-800' title={checkVideoFileSize(file_size) ? 'Video' : 'Embed'}>
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
                  <FontAwesomeIcon icon={faEllipsisV} className="text-lg px-2 absolute bottom-0 right-0 mr-1 cursor-pointer hover:text-gray-500"/>
                </button>
              </div>
              {
                  isOpen && (index === active) &&
                    <div className='absolute top-[55px] z-10 right-0 flex flex-col bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] w-40'>
                      {
                        Object.keys(archiveList).length !== 0 ? 
                        <>
                        <button onClick={() => setOpenDirectory(!openDirectory)} className='px-4 py-2 hover:bg-gray-900 text-left flex justify-between items-center'>
                          Watch Later
                          <FontAwesomeIcon icon={openDirectory ? faChevronUp: faChevronDown} className="text-sm ml-2"/>
                        </button>
                        {
                          openDirectory && 
                          <>
                            {
                              archiveList.archive_list.map((item, index) => {
                                return (
                                  <Link onClick={() => watchLater(archiveList._id, item)} key={index} to="" className='text-sm px-4 py-1 hover:bg-gray-900 flex items-center'><FontAwesomeIcon icon={faMinus} className="mr-2"/> {item}</Link>
                                )
                              })
                            }
                          </>
                        }
                        </>
                        :
                        <button onClick={() => watchLater()} className='px-4 py-2 hover:bg-gray-900 text-left flex justify-between items-center'>
                          Watch Later
                        </button>
                      }
                      <button className='px-4 py-2 hover:bg-gray-900 text-left'>Report</button>
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
                  <div className='absolute top-0 right-0 bg-gray-800' title={checkVideoFileSize(file_size) ? 'Video' : 'Embed'}>
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
                    <FontAwesomeIcon icon={faEllipsisV} className="text-lg px-2 absolute bottom-0 right-0 mr-1 cursor-pointer hover:text-gray-500"/>
                  </button>
                </div>
                {
                  isOpen && (index === active) &&
                    <div className='absolute top-[55px] z-10 right-0 flex flex-col bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] w-40'>
                      {
                        Object.keys(archiveList).length !== 0 ? 
                        <>
                        <button onClick={() => setOpenDirectory(!openDirectory)} className='px-4 py-2 hover:bg-gray-900 text-left flex justify-between items-center'>
                          Watch Later
                          <FontAwesomeIcon icon={openDirectory ? faChevronUp: faChevronDown} className="text-sm ml-2"/>
                        </button>
                        {
                          openDirectory && 
                          <>
                            {
                              archiveList.archive_list.map((item, index) => {
                                return (
                                  <Link onClick={() => watchLater(archiveList._id, item)} key={index} to="" className='text-sm px-4 py-1 hover:bg-gray-900 flex items-center'><FontAwesomeIcon icon={faMinus} className="mr-2"/> {item}</Link>
                                )
                              })
                            }
                          </>
                        }
                        </>
                        :
                        <button onClick={() => watchLater()} className='px-4 py-2 hover:bg-gray-900 text-left flex justify-between items-center'>
                          Watch Later
                        </button>
                      }
                      <button className='px-4 py-2 hover:bg-gray-900 text-left'>Report</button>
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
