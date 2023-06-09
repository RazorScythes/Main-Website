import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideos } from "../../actions/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { clearAlert } from "../../actions/video";
import Loading from './Loading';
import styles from "../../style";
import VideoThumbnail from '../VideoThumbnail';
import SideAlert from '../SideAlert'

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
    const navigate  = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    const [active, setActive] = useState(0)
    
    const dispatch = useDispatch()

    const video = useSelector((state) => state.video.videos)
    const message = useSelector((state) => state.video.message)
    const sideAlert = useSelector((state) => state.video.sideAlert)

    const pageIndex = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1
    const paramIndex = searchParams.get('type') === null || searchParams.get('type') === ''
    const checkParams = (val) => {return searchParams.get('type') === val}

    const [displayedPages, setDisplayedPages] = useState([]);
    const [videos, setVideos] = useState([])

    const [alertActive, setAlertActive] = useState(false)
    const [alertSubActive, setAlertSubActive] = useState('')
    const [alertInfo, setAlertInfo] = useState({
        variant: '',
        heading: '',
        paragraph: ''
    })

    useEffect(() => {
      
    }, [message])

    useEffect(() => {
      window.scrollTo(0, 0)
      if(searchParams.get('type') === null || searchParams.get('type') === '') {
        setVideos(video)
      }
      else if(searchParams.get('type') === 'latest') {
        // Filter and group the objects by date
        const groupedData = video.reduce((result, obj) => {
          const date = obj.createdAt.split('T')[0];
          if (result[date]) {
            result[date].push(obj);
          } else {
            result[date] = [obj];
          }
          return result;
        }, {});

        // Get the latest date from the groupedData object
        const latestDate = Object.keys(groupedData).sort().pop();

        // Get the objects related to the latest date
        const latestVideos = groupedData[latestDate];

        if(latestVideos !== undefined)
          setVideos(latestVideos)
      }
      else if(searchParams.get('type') === 'most_viewed') {
        // Sort the data based on views in ascending order
        if(video.length > 0) {
          var arr = [...video]

          const sortedData = arr.sort((a, b) => b.views.length - a.views.length);

          // Filter out objects where views is 0
          const filteredData = sortedData.filter(obj => obj.views.length !== 0);

          if(filteredData.length > 0)
            setVideos(filteredData)
        }
      }
      else if(searchParams.get('type') === 'popular') {
        // Sort the data based on views in ascending order
        if(video.length > 0) {
          var arr = []

          video.forEach(item => {
            var popularity = ((item.views.length/2) + item.likes.length) - item.dislikes.length
            if(popularity > 0) { 
              arr.push({...item, popularity: popularity})
            }
          });

          const sortedData = arr.sort((a, b) => b.popularity - a.popularity);

          if(sortedData.length > 0)
            setVideos(sortedData)
        }
      }
    },[video, searchParams.get('type')])

    useEffect(() => {
      dispatch(getVideos({
        id: user ? user.result?._id : ''
      }))
    }, [])

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

        navigate(`/videos?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}`)
    };

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

    return (
        <div
            className="relative bg-cover bg-center py-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <SideAlert
                variants={alertInfo.variant}
                heading={alertInfo.heading}
                paragraph={alertInfo.paragraph}
                active={alertActive}
                setActive={setAlertActive}
            />
            <div className="flex justify-between items-center lg:px-16 sm:px-4">
              <div className='flex flex-row flex-wrap items-start xs:justify-start justify-center'>
                  <Link to={`/videos?page=${1}`}><p style={{backgroundColor: paramIndex && 'rgb(243, 244, 246)', color: paramIndex && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100  transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>All</p></Link>
                  <Link to={`/videos?type=latest&page=${1}`}><p style={{backgroundColor: checkParams('latest') && 'rgb(243, 244, 246)', color: checkParams('latest') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Latest</p></Link>
                  <Link to={`/videos?type=most_viewed&page=${1}`}><p style={{backgroundColor: checkParams('most_viewed') && 'rgb(243, 244, 246)', color: checkParams('most_viewed') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Most Viewed</p></Link>
                  <Link to={`/videos?type=popular&page=${1}`}><p style={{backgroundColor: checkParams('popular') && 'rgb(243, 244, 246)', color: checkParams('popular') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out'>Popular</p></Link>
              </div>
            </div>
            <div className='lg:px-16 sm:px-4 mx-auto'>
                <hr/>
            </div>
            
            <div className={`${styles.flexCenter}`}> 
                {
                  message.length > 0 ?
                    <div className='h-96 flex flex-col items-center justify-center'> 
                      <h3 className='text-white xs:text-3xl text-2xl font-semibold text-center capitalize'>{message}</h3>
                      <a href="/videos">
                        <button className="mt-6 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 transition-colors duration-300 ease-in-out">
                            Reload Page
                        </button>
                      </a>
                    </div>
                  :
                  videos && videos.length > 0 ?
                    <div>
                      <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start lg:px-16 sm:px-4 py-8'>
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
                                  user={user}
                                  setAlertSubActive={setAlertSubActive}
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

export default Videos