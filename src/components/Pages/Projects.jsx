import React, { useEffect, useState } from 'react'
import styles from "../../style";
import SideAlert from '../SideAlert'
import heroBackgroundImage from '../../assets/1696333975880.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams, useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    category: 'Simulations',
    count: 1
  }, 
  {
    category: 'Alright',
    count: 1
  },
  {
    category: 'Milktea',
    count: 1
  },
]
const Projects = () => {
  const navigate  = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();
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
    filtered: false
  })

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
        navigate(`/blogs?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}&filtered=${filteredType}`)
      else
        navigate(`/blogs?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}`)
      
      setToggle({tags: false, filtered: false})
  };

  return (
    <div
      className="relative bg-cover bg-center py-20"
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

          <div className="flex justify-between items-center">
            <div className='flex flex-row flex-wrap items-start xs:justify-start justify-center mb-4'>
                  <button onClick={() => handlePageType("")} style={{backgroundColor: paramIndex && 'rgb(243, 244, 246)', color: paramIndex && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100  transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>All</button>
                  <button onClick={() => handlePageType("latest")} style={{backgroundColor: checkParams('latest') && 'rgb(243, 244, 246)', color: checkParams('latest') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Latest</button>
                  <button onClick={() => handlePageType("most_viewed")} style={{backgroundColor: checkParams('most_viewed') && 'rgb(243, 244, 246)', color: checkParams('most_viewed') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Most Viewed</button>
                  <button onClick={() => handlePageType("popular")} style={{backgroundColor: checkParams('popular') && 'rgb(243, 244, 246)', color: checkParams('popular') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out'>Popular</button>
                  <div className='relative z-40 ml-2'>
                    <button onClick={() => setToggle({...toggle, categories: !toggle.categories, filtered: false})} className='cursor-pointer mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2 flex items-center'>
                        {selectedCategory ? selectedCategory : 'Categories'}
                        {toggle.categories ? <FontAwesomeIcon icon={faChevronUp} className='ml-1 font-bold'/> : <FontAwesomeIcon icon={faChevronDown} className='ml-1 font-bold'/> }
                    </button>
                    {
                      categories && categories.length > 0 &&
                        <div className={`${toggle.categories ? `absolute` : `hidden`}`}>
                            <ul className='w-full no-scroll max-h-[183px] overflow-y-auto flex flex-col mb-2 font-semibold text-sm bg-gray-800 text-gray-100  border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>
                            <button onClick={() => handleFilteredChange('')}><li className='px-4 py-2 hover:bg-gray-900 hover:text-gray-100 cursor-pointer text-left'>All</li></button>
                                {
                                    categories.map((item, index) => {
                                        return (
                                            <button onClick={() => handleFilteredChange(item.category)} key={index}><li className='text-left px-4 py-2 hover:bg-gray-900 hover:text-gray-100 cursor-pointer'>{item.category} ({item.count})</li></button>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                  </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">

              <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-600 rounded-md'>
                <img
                  className='object-cover w-full h-52'
                  src={heroBackgroundImage}
                />
                <div className='px-2 pb-2 font-poppins'>
                  <div className="flex justify-between items-center">
                    <div className='col-span-2 flex flex-wrap items-center pt-2'>
                      <img 
                          src={heroBackgroundImage}
                          className='w-6 h-6 object-cover rounded-full border border-gray-700'
                          alt="avatar"
                      />
                      <p className='ml-2 break-all text-xs font-semibold text-[#FB2736] drop-shadow-sm'>RazorScythe</p>
                    </div>
                    <p className='mr-2 break-all text-xs font-semibold drop-shadow-sm mt-1 text-[#FB2736]'><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> <span> {convertTimezone('2023-08-21T15:01:34.112+00:00')} </span></p>
                  </div>
                  <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                  <div className='flex flex-wrap'>
                    <p className='text-sm text-gray-600'>2310 views • </p>
                    <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                    <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                  </div>
                </div>
              </div>

              <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-600 rounded-md'>
                <img
                  className='object-cover w-full h-52'
                  src={heroBackgroundImage}
                />
                <div className='px-2 pb-2 font-poppins'>
                  <div className="flex justify-between items-center">
                    <div className='col-span-2 flex flex-wrap items-center pt-2'>
                      <img 
                          src={heroBackgroundImage}
                          className='w-6 h-6 object-cover rounded-full border border-gray-700'
                          alt="avatar"
                      />
                      <p className='ml-2 break-all text-xs font-semibold text-[#FB2736] drop-shadow-sm'>RazorScythe</p>
                    </div>
                    <p className='mr-2 break-all text-xs font-semibold drop-shadow-sm mt-1 text-[#FB2736]'><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> <span> {convertTimezone('2023-08-21T15:01:34.112+00:00')} </span></p>
                  </div>
                  <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                  <div className='flex flex-wrap'>
                    <p className='text-sm text-gray-600'>2310 views • </p>
                    <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                    <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                  </div>
                </div>
              </div>

              <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-600 rounded-md'>
                <img
                  className='object-cover w-full h-52'
                  src={heroBackgroundImage}
                />
                <div className='px-2 pb-2 font-poppins'>
                  <div className="flex justify-between items-center">
                    <div className='col-span-2 flex flex-wrap items-center pt-2'>
                      <img 
                          src={heroBackgroundImage}
                          className='w-6 h-6 object-cover rounded-full border border-gray-700'
                          alt="avatar"
                      />
                      <p className='ml-2 break-all text-xs font-semibold text-[#FB2736] drop-shadow-sm'>RazorScythe</p>
                    </div>
                    <p className='mr-2 break-all text-xs font-semibold drop-shadow-sm mt-1 text-[#FB2736]'><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> <span> {convertTimezone('2023-08-21T15:01:34.112+00:00')} </span></p>
                  </div>
                  <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                  <div className='flex flex-wrap'>
                    <p className='text-sm text-gray-600'>2310 views • </p>
                    <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                    <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                  </div>
                </div>
              </div>

              <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-600 rounded-md'>
                <img
                  className='object-cover w-full h-52'
                  src={heroBackgroundImage}
                />
                <div className='px-2 pb-2 font-poppins'>
                  <div className="flex justify-between items-center">
                    <div className='col-span-2 flex flex-wrap items-center pt-2'>
                      <img 
                          src={heroBackgroundImage}
                          className='w-6 h-6 object-cover rounded-full border border-gray-700'
                          alt="avatar"
                      />
                      <p className='ml-2 break-all text-xs font-semibold text-[#FB2736] drop-shadow-sm'>RazorScythe</p>
                    </div>
                    <p className='mr-2 break-all text-xs font-semibold drop-shadow-sm mt-1 text-[#FB2736]'><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> <span> {convertTimezone('2023-08-21T15:01:34.112+00:00')} </span></p>
                  </div>
                  <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                  <div className='flex flex-wrap'>
                    <p className='text-sm text-gray-600'>2310 views • </p>
                    <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                    <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
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

export default Projects