import React, { useEffect, useState } from 'react'
import styles from "../../style";
import SideAlert from '../SideAlert'
import heroBackgroundImage from '../../assets/1696333975880.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faLightbulb, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowLeft, faArrowRight, faThLarge, faTable, faWindowMaximize, faGamepad, faMicrochip, faWrench, faCogs, faObjectGroup, faCode, faBars, faHandPeace, faArchive, faBoltLightning, faSearch, faExchange, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams, useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getProjects, getCategory } from '../../actions/project';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import loading from '../../assets/loading.gif'
import { MotionAnimate } from 'react-motion-animate';

library.add(fas, far, fab);

const CustomRight = ({ onClick }) => {
  return (
    <div onClick={onClick} className='bg-gray-900 text-white hover:text-cyan-300 transition-all h-full w-16 absolute right-0 flex items-center justify-end cursor-pointer'>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="max-w-4 cursor-pointer text-primary-400 text-2xl font-bold"
      />
    </div>
  )
};

const CustomLeft = ({ onClick }) => {
  return (
    <div onClick={onClick} className='bg-gray-900 text-white hover:text-cyan-300 transition-all h-full w-16 absolute left-0 flex items-center cursor-pointer'>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="max-w-4 text-primary-400 text-2xl font-bold"
      />
    </div>
  )
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1224 },
    items: 10
  },
  laptop: {
    breakpoint: { max: 1224, min: 890 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 890, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const Projects = ({ user }) => {

  const { key } = useParams();

  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const project = useSelector((state) => state.project.user_project)
  const isLoading = useSelector((state) => state.project.isLoading)
  const category = useSelector((state) => state.project.user_category)
  const category_loading = useSelector((state) => state.project.category_loading)

  const [projects, setProjects] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKey, setSearchKey] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [alertActive, setAlertActive] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    variant: '',
    heading: '',
    paragraph: ''
  })

  const pageIndex = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1
  const navType = searchParams.get('type') ? searchParams.get('type') : ''
  const filteredType = searchParams.get('category') ? searchParams.get('category') : ''
  const paramIndex = searchParams.get('type') === null || searchParams.get('type') === ''
  const checkParams = (val) => {return searchParams.get('type') === val}

  const [toggle, setToggle] = useState({
    categories: false,
    filtered: false,
  })
  const [displayedPages, setDisplayedPages] = useState([]);
  const itemsPerPage = 18; // Number of items per page
  const totalPages = Math.ceil(projects?.length / itemsPerPage); // Total number of pages
  const [currentPage, setCurrentPage] = useState(pageIndex);
  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if(key) {

    }
    else {
        dispatch(getProjects({
            id: user ? user.result?._id : ''
        }))
        dispatch(getCategory())
    }
  }, [])

  useEffect(() => {
    if(searchParams.get('type') === null || searchParams.get('type') === '') {
        var filteredData
        if(filteredType !== null)
            filteredData = project.filter(obj => filteredType === obj.categories || filteredType === '');
        else 
            filteredData = project

        setProjects(filteredData)
    }
    else if(searchParams.get('type') === 'latest') {
        // Filter and group the objects by date
        const groupedData = project.reduce((result, obj) => {
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
        const latestProjects = groupedData[latestDate];

        if(latestProjects !== undefined) { 
            var filteredData
            if(filteredType !== null)
                filteredData = latestProjects.filter(obj => filteredType === obj.categories || filteredType === '');
            else 
                filteredData = latestProjects

            setProjects(filteredData)
        }
    }
    else if(searchParams.get('type') === 'most_viewed') {
        // Sort the data based on views in ascending order
        if(project.length > 0) {
          var arr = [...project]

          const sortedData = arr.sort((a, b) => b.views.length - a.views.length);

          if(sortedData.length > 0)
            var filteredData
            if(filteredType !== null)
                filteredData = sortedData.filter(obj => filteredType === obj.categories || filteredType === '');
            else 
                filteredData = sortedData

            setProjects(filteredData)
        }
    }
    else if(searchParams.get('type') === 'popular') {
        // Sort the data based on views in ascending order
        if(project.length > 0) {
            var arr = []

            project.forEach(item => {
            var popularity = ((item.views.length/2) + item.likes.length) - item.dislikes.length
                if(popularity > 0) { 
                    arr.push({...item, popularity: popularity})
                }
            });

            const sortedData = arr.sort((a, b) => b.popularity - a.popularity);

             if(sortedData.length > 0)
                var filteredData 
                if(filteredType !== null)
                    filteredData = sortedData.filter(obj => filteredType === obj.categories || filteredType === '');
                else 
                    filteredData = sortedData
    
                setProjects(filteredData)
            }
      }
  }, [project, searchParams.get('type'), filteredType])

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

  const handlePageType = (type) => {
    const urlString = window.location.href.split('?')[0];
    const baseUrl = window.location.origin;
    const path = urlString.substring(baseUrl.length);
    if(filteredType)
      navigate(`${path}?type=${type}&page=${1}&filtered=${filteredType}`)
    else
      navigate(`${path}?type=${type}&page=${1}`)
      
    setToggle({tags: false, filtered: false})
  };

  const handleFilteredChange = (filtered) => {
    const urlString = window.location.href.split('?')[0];
    const baseUrl = window.location.origin;
    const path = urlString.substring(baseUrl.length);
    navigate(`${path}?type=${navType}&page=${1}&category=${filtered}`)
    setToggle({tags: false, filtered: false})
    setSelectedCategory(filtered)
  };

  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);

      if(filteredType)
        navigate(`/projects?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}&filtered=${filteredType}`)
      else
        navigate(`/projects?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}`)
      
      setToggle({tags: false, filtered: false})
  };

  const handleSearch = () => {

  }

  return (
    <div
      className="relative bg-cover bg-center pb-20 pt-4"
      style={{ backgroundColor: "#111827" }}
    >   
      <SideAlert
          variants={alertInfo.variant}
          heading={alertInfo.heading}
          paragraph={alertInfo.paragraph}
          active={alertActive}
          setActive={setAlertActive}
      />
      
      <div className={`${styles.marginX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidthEx}`}>
          <div className="container mx-auto file:lg:px-8 relative px-0">
            {
              category_loading ? 
                <div className='flex items-center justify-center py-8'>
                    <div className='flex items-center justify-center'>
                        <img className="w-8" src={loading} />
                        <p className='text-white font-semibold text-base ml-2'>Loading Categories</p>
                    </div>
                </div>
                :
                <Carousel 
                    responsive={responsive} className="relative"
                    customLeftArrow={<CustomLeft />}
                    customRightArrow={<CustomRight />}
                    slidesToSlide={1}
                    swipeable
                    infinite={true}
                    centerMode={true}
                > 
                  <button className='text-white hover:text-cyan-300 transition-all flex flex-col items-center py-8 w-32 relative'>
                    <div className='relative'> 
                      <FontAwesomeIcon icon={faThLarge} className='text-3xl mb-2'/> 
                      {/* <p className='absolute top-[-20px] right-[-10px]'>0</p> */}
                    </div>
                    <p className='text-xs'>All Categories</p>
                  </button>
                  {
                    category?.length > 0 &&
                      category.map((item, index) => {
                        return (
                          <button key={index} className='text-white hover:text-cyan-300 transition-all flex flex-col items-center py-8 w-32 relative'>
                            <div className='relative'> 
                              <FontAwesomeIcon icon={['fas', item.icon]} className='text-3xl mb-2'/> 
                              <p className='absolute top-[-20px] right-[-10px]'>{item.count}</p>
                            </div>
                            <p className='text-xs'>{item.shortcut}</p>
                          </button>
                        )
                      })
                    } 
                </Carousel>
            }

            <div className='flex sm:flex-row flex-col-reverse sm:justify-between mb-4'>
              <form onSubmit={handleSearch}>
                <div className="relative lg:mt-0 mt-4 sm:w-80 w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                  </span>
                  <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className="block w-full bg-gray-200 text-sm font-normal text-gray-900 rounded-sm py-2 px-4 pl-10 leading-tight focus:outline-none focus:bg-white focus:text-gray-900" type="text" placeholder='Search Project'/>
                </div>
              </form>

              <div className='flex justify-end items-center text-white relative'>
                <p className='text-base'>{projects?.length} project{projects?.length > 1 && 's'} • </p>
                <div onClick={() => setToggle({...toggle, categories: !toggle.categories, filtered: false})} className='flex cursor-pointer'>
                  <button><FontAwesomeIcon icon={faExchange} className='ml-3 text-xl rotate-90 cursor-pointer hover:text-cyan-300 '/></button>
                  <div className={`${toggle.categories ? `absolute` : `hidden`} z-[100] top-10 right-[-8px] w-48 bg-white p-3 py-2 rounded-sm shadow-2xl`}>
                    <p className='text-gray-600 text-xs font-semibold mb-1'>Filter by:</p>
                      <button onClick={() => handlePageType("")} className='w-full text-left text-gray-800 font-semibold text-sm bg-transparent hover:text-gray-900 py-1 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>All { paramIndex && <FontAwesomeIcon icon={faCheck}/>}</button>
                      <button onClick={() => handlePageType("latest")} className='w-full text-left text-gray-800 font-semibold text-sm bg-transparent hover:text-gray-900 py-1 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Latest { checkParams('latest') && <FontAwesomeIcon icon={faCheck}/>}</button>
                      <button onClick={() => handlePageType("popular")} className='w-full text-left text-gray-800 font-semibold text-sm bg-transparent hover:text-gray-900 py-1 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Trending { checkParams('popular') && <FontAwesomeIcon icon={faCheck}/>}</button>
                      <button onClick={() => handlePageType("most_viewed")} className='w-full text-left text-gray-800 font-semibold text-sm bg-transparent hover:text-gray-900 py-1 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Most Viewed { checkParams('most_viewed') && <FontAwesomeIcon icon={faCheck}/>}</button>
                    </div>
                    <p className='ml-3 text-base sm:block hidden'>
                      {
                        checkParams('latest') ? 'Latest'
                        : checkParams('popular') ? 'Trending'
                        : checkParams('most_viewed') && 'Most Viewed'
                      }
                    </p>
                </div>
              </div>
            </div>
            
            {
              isLoading ?
              <div className='h-96 flex items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                      <img className="w-16" src={loading} />
                      <p className='text-white font-semibold text-lg mt-2'>Loading Projects</p>
                  </div>
              </div>
              :
              <>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
                    {
                      projects?.length > 0 &&
                        projects.slice(startIndex, endIndex).map((item, index) => {
                          return (
                            <MotionAnimate key={index} animation='fadeInUp'>
                              <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-600 rounded-md'>
                                <img
                                  className='object-cover w-full h-52 border border-solid border-gray-300'
                                  src={item.featured_image}
                                />
                                <div className='px-2 pb-2 font-poppins'>
                                  <div className="flex justify-between items-center">
                                    <div className='col-span-2 flex flex-wrap items-center pt-2'>
                                      <img 
                                          src={item.user.avatar}
                                          className='w-6 h-6 object-cover rounded-full border border-gray-700'
                                          alt="avatar"
                                      />
                                      <p className='ml-2 break-all text-xs font-semibold text-[#FB2736] drop-shadow-sm'>{item.user.username}</p>
                                    </div>
                                    <p className='mr-2 break-all text-xs font-semibold drop-shadow-sm mt-1 text-[#FB2736]'><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> <span> {convertTimezone(item.createdAt)} </span></p>
                                  </div>
                                  <h2 className='text-lg font-semibold my-2 mr-2 leading-7 pb-4'>{item.post_title}</h2>
                                  <div className='flex flex-wrap absolute bottom-3'>
                                    <p className='text-sm text-gray-600'>{item.views.length} view{item.views.length > 1 && 's'} • </p>
                                    <p className='text-sm text-gray-600 ml-1'> {item.likes.length} like{item.likes.length > 1 && 's'} •</p>
                                    <p className='text-sm text-gray-600 ml-1'> {item.comment.length} comment{item.comment.length > 1 && 's'}</p>
                                </div>
                                </div>
                              </div>
                            </MotionAnimate>
                          )
                        })
                    }
                </div>
                {
                    projects?.length > 0 &&
                    <div className='flex flex-wrap items-center justify-center mt-12'>
                        <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='mb-2 cursor-pointer mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out'
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
                        className="mb-2 cursor-pointer mx-1 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out"
                        >
                        {pageNumber}
                        </button>
                        ))}
                        <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='mb-2 cursor-pointer ml-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out'
                        >
                        <span className='xs:block hidden'>Next</span>
                        <FontAwesomeIcon icon={faChevronRight} className='xs:hidden inline-block'/>
                        </button>
                    </div>
                }
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects