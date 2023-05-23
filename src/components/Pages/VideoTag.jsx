import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoByTag } from "../../actions/video";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
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

const VideoTag = ({ user }) => {
    const navigate  = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    const [active, setActive] = useState(0)
    const [tags, setTags] = useState([])
    const [videos, setVideos] = useState([])
    const dispatch = useDispatch()

    const { tag } = useParams();

    const video = useSelector((state) => state.video.videos)
    const message = useSelector((state) => state.video.message)

    const pageIndex = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1

    const [displayedPages, setDisplayedPages] = useState([]);

    useEffect(() => {
      
    }, [message])

    useEffect(() => {
      if(video.length > 0)
        setVideos(video)
    }, [video])

    useEffect(() => {
        setVideos([])
        dispatch(getVideoByTag({
            id: user ? user.result?._id : '',
            tag: tag.length > 0 ? tag.split("+") : []
        }))
        setTags(tag.split("+"))
    }, [tag])

    useEffect(() => {
      setCurrentPage(pageIndex)
    }, [pageIndex])

    const itemsPerPage = 50; // Number of items per page
    const totalPages = Math.ceil(videos?.length / itemsPerPage); // Total number of pages
    const [currentPage, setCurrentPage] = useState(pageIndex);
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    useEffect(() => {
      window.scrollTo(0, 0)
      const calculateDisplayedPages = () => {
        const pagesToShow = [];
        const maxDisplayedPages = 6; // Maximum number of page buttons to display
  
        if (totalPages <= maxDisplayedPages) {
          // If total pages are less than or equal to the maximum, display all pages
          for (let i = 1; i <= totalPages; i++) {
            pagesToShow.push(i);
          }
        } else {
          let startPage;
          let endPage;
  
          if (currentPage <= Math.floor(maxDisplayedPages / 2)) {
            // If current page is close to the beginning
            startPage = 1;
            endPage = maxDisplayedPages;
          } else if (currentPage >= totalPages - Math.floor(maxDisplayedPages / 2)) {
            // If current page is close to the end
            startPage = totalPages - maxDisplayedPages + 1;
            endPage = totalPages;
          } else {
            // If current page is in the middle
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
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        navigate(`/videos/tags/${tag}?page=${pageNumber}`)
    };
    return (
        <div
            className="relative bg-cover bg-center pb-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className='flex flex-wrap items-center sm:px-16 px-4 pt-8 pb-4'>
                <h3 className='text-white xs:text-3xl text-2xl font-semibold mr-3'>Tags:</h3>
                {
                    tags && tags.length > 0 &&
                        tags.map((item, index) => {
                            return (
                                <div key={index} className='flex flex-wrap'>
                                    {
                                        item !== '' &&
                                            <p className='font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out mr-2'>{item}</p>
                                    }
                                </div>
                            )
                        })
                }
            </div>
            <div className='sm:px-16 px-4'>
                <hr/>
            </div>
            <div className={`${styles.flexCenter}`}> 
                {
                  message.length > 0 ?
                    <div className='h-96 flex flex-col items-center justify-center'> 
                      <h3 className='text-white xs:text-3xl text-2xl font-semibold'>{message}</h3>
                      <a href="/videos">
                        <button className="mt-6 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                            Reload Page
                        </button>
                      </a>
                    </div>
                  :
                  videos && videos.length > 0 ?
                    <div>
                      <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start sm:px-16 py-8'>
                        {
                            videos.slice(startIndex, endIndex).map((item, index) => {
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
                      <div className='flex items-center justify-center mt-8'>
                          <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className='cursor-pointer mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out'
                          >
                            <span className='xs:block hidden'>Prev</span>
                            <FontAwesomeIcon icon={faChevronLeft} className='xs:hidden inline-block'/>
                          </button>
                        {displayedPages.map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            // className={currentPage === index + 1 ? "active" : ""}
                            style={{backgroundColor: pageIndex === pageNumber ? "rgb(243 244 246)" : "rgb(31 41 55)", color: pageIndex === pageNumber ? "rgb(31 41 55)" : "rgb(243 244 246)"}}
                            className="cursor-pointer mx-1 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out"
                          >
                            {pageNumber}
                          </button>
                        ))}

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className='cursor-pointer ml-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out'
                        >
                          <span className='xs:block hidden'>Next</span>
                          <FontAwesomeIcon icon={faChevronRight} className='xs:hidden inline-block'/>
                        </button>
                      </div>
                    </div>
                  :
                  <div className='h-96 flex items-center justify-center'>
                      <div className='flex md:flex-row flex-col items-center justify-center'>
                        
                      </div>
                  </div>
                }
            </div>
        </div>
    )
}

export default VideoTag