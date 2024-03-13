import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error_forbiden } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { getGames, countTags, clearAlert } from "../../actions/game";
import { MotionAnimate } from 'react-motion-animate'
import GamesCards from './GamesCards';
import loading from '../../assets/loading.gif'
import image from '../../assets/hero-bg.jpg'
import avatar from '../../assets/avatar.png'
import styles from "../../style";

const divideAndScale = (ratings) => {
    const totalRating = ratings.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / ratings.length;

    return averageRating.toFixed(1);
}

const Games = ({ user }) => {
    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const game = useSelector((state) => state.game.games)
    const tagsList = useSelector((state) => state.game.tagsCount)
    const message = useSelector((state) => state.game.message)

    const [rating, setRating] = useState(0);
    const [fixedRating, setFixedRating] = useState(3.5)
    const [games, setGames] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [displayedPages, setDisplayedPages] = useState([]);

    const pageIndex = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1
    const paramIndex = searchParams.get('type') === null || searchParams.get('type') === ''
    const checkParams = (val) => {return searchParams.get('type') === val}
    const [toggle, setToggle] = useState({
        tags: false
    })

    useEffect(() => {
        dispatch(getGames({
            id: user ? user.result?._id : ''
        }))
        dispatch(countTags({
            id: user ? user.result?._id : ''
        }))
    }, [])

    useEffect(() => {
        setCurrentPage(pageIndex)
      }, [pageIndex])
  
    const itemsPerPage = 20; // Number of items per page
    const totalPages = Math.ceil(games?.length / itemsPerPage); // Total number of pages
    const [currentPage, setCurrentPage] = useState(pageIndex);
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        window.scrollTo(0, 0)
        if(searchParams.get('type') === null || searchParams.get('type') === '') {
            setGames(game)
        }
        else if(searchParams.get('type') === 'latest') {
          // Filter and group the objects by date
          const groupedData = game.reduce((result, obj) => {
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
          const latestGames = groupedData[latestDate];
  
          if(latestGames !== undefined)
            setGames(latestGames)
        }
        else if(searchParams.get('type') === 'popular') {
          // Sort the data based on views in ascending order
          if(game.length > 0) {
            var arr = []
  
            game.forEach(item => {
              var popularity = divideAndScale(item.ratings)
              if(popularity > 0) { 
                arr.push({...item, popularity: popularity})
              }
            });
  
            const sortedData = arr.sort((a, b) => b.popularity - a.popularity);
  
            if(sortedData.length > 0)
            setGames(sortedData)
          }
        }
    },[game, searchParams.get('type')])

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

        navigate(`/games?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}`)
    };

    return (
        <div
            className="relative bg-cover bg-center"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0 my-10">
                        <div className="flex justify-between items-center">
                            <div className='flex flex-row flex-wrap items-start xs:justify-start justify-center'>
                                <Link to={`/games?page=${1}`}><p style={{backgroundColor: paramIndex && 'rgb(243, 244, 246)', color: paramIndex && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100  transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>All</p></Link>
                                <Link to={`/games?type=latest&page=${1}`}><p style={{backgroundColor: checkParams('latest') && 'rgb(243, 244, 246)', color: checkParams('latest') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Latest</p></Link>
                                <div className='relative'>
                                    <button onClick={() => setToggle({...toggle, tags: !toggle.tags})} style={{backgroundColor: checkParams('most_viewed') && 'rgb(243, 244, 246)', color: checkParams('most_viewed') && 'rgb(31, 41, 55)'}} className='cursor-pointer mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2 flex items-center'>
                                        Tags 
                                        {toggle.tags ? <FontAwesomeIcon icon={faChevronUp} className='ml-1 font-bold'/> : <FontAwesomeIcon icon={faChevronDown} className='ml-1 font-bold'/> }
                                    </button>
                                    {
                                        tagsList && tagsList.length > 0 &&
                                            <div className={`${toggle.tags ? `absolute` : `hidden`}`}>
                                                <ul className='no-scroll max-h-[183px] overflow-y-auto flex flex-col mb-2 font-semibold text-sm bg-gray-800 text-gray-100  border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>
                                                    {
                                                        tagsList.map((item, index) => {
                                                            return (
                                                                <Link key={index} to={`/games/tags/${item.tag}`}><li className='px-4 py-2 hover:bg-gray-900 hover:text-gray-100 cursor-pointer'>{item.tag}</li></Link>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                    }
                                </div>
                                <Link to={`/games?type=popular&page=${1}`}><p style={{backgroundColor: checkParams('popular') && 'rgb(243, 244, 246)', color: checkParams('popular') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out'>Popular</p></Link>
                            </div>
                        </div>
                        {
                            message.length > 0 ?
                                <div className='h-96 flex flex-col items-center justify-center'> 
                                    <h3 className='text-white xs:text-3xl text-2xl font-semibold text-center capitalize'>{message}</h3>
                                    <a href="/games">
                                        <button className="mt-6 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 transition-colors duration-300 ease-in-out">
                                            Reload Page
                                        </button>
                                    </a>
                                </div>
                            :
                            games && games.length > 0 ?
                            <>
                            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start mt-4">
                                {
                                    games.slice(startIndex, endIndex).map((item, index) => {
                                        return (
                                            <MotionAnimate key={index} animation='fadeInUp'>
                                                <GamesCards  
                                                    key={index}
                                                    id={item._id}
                                                    heading={item.title} 
                                                    image={item.featured_image} 
                                                    downloads={item.download_count}
                                                    category={item.category ? item.category : 'No Category'} 
                                                    uploader={item.user.username} 
                                                    ratings={item.ratings}
                                                    download_links={item.download_link}
                                                />
                                            </MotionAnimate>
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
                            </>
                            :
                            <div className='h-96 flex items-center justify-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <img className="w-16" src={loading} />
                                    <p className='text-white font-semibold text-lg mt-2'>Loading Data</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Games