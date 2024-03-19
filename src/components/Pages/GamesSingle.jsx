import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { faCalendar, faInfoCircle, faImage, faDownload, faMinus, faChevronRight, faChevronLeft, faArrowRight, faHeart, faComment, faArrowLeft, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom'
import { categoriesCount, addOneDownload, getRelatedGames, updateGameAccessKey, getGameByID, countTags, getRecentGameBlog, addRecentGamingBlogLikes, clearAlert } from "../../actions/game";
import { MotionAnimate } from 'react-motion-animate'
import { convertDriveImageLink } from '../Tools'
import ModalImage from "react-modal-image";
import Carousel from "react-multi-carousel";
import Cookies from 'universal-cookie';
import GamesCards from './GamesCards';
import styles from "../../style";
import image from '../../assets/hero-bg.jpg'
import avatar from '../../assets/avatar.png'
import loading from '../../assets/loading.gif'
import moment from 'moment';
import "react-multi-carousel/lib/styles.css";
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

const cookies = new Cookies();

const CustomRight = ({ onClick }) => {
    return (
      <div onClick={onClick} className='bg-transparent text-transparent transition-all h-full w-16 absolute sm:right-4 right-0 flex items-center justify-end cursor-pointer'>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="absolute sm:right-4 right-0 max-w-4 cursor-pointer text-primary-400 text-2xl font-bold"
        />
      </div>
    )
};
  
const CustomLeft = ({ onClick }) => {
    return (
      <div onClick={onClick} className='bg-transparent text-transparent transition-all h-full w-16 absolute sm:left-4 left-0 flex items-center cursor-pointer'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="absolute sm:left-4 left-0 max-w-4 text-primary-400 text-2xl font-bold"
        />
      </div>
    )
};

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 1
    },
    laptop: {
      breakpoint: { max: 1224, min: 890 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 890, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

function formatDate(dateString) {
    var date = new Date(dateString);
    var formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  
    return formattedDate;
}

const divideAndScale = (ratings) => {
    const totalRating = ratings.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / ratings.length;

    return averageRating.toFixed(1)
}

const GamesSingle = ({ user }) => {

    const { id } = useParams();

    const dispatch = useDispatch()

    const game_data = useSelector((state) => state.game.data)
    const related_games = useSelector((state) => state.game.relatedGames)
    const notFound = useSelector((state) => state.game.notFound)
    const forbiden = useSelector((state) => state.game.forbiden)
    const isLoading = useSelector((state) => state.game.isLoading)
    const sideAlert = useSelector((state) => state.game.sideAlert)
    const tagsList = useSelector((state) => state.game.tagsCount)
    const categoriesList = useSelector((state) => state.game.categoriesCount)
    const recentGameBlog = useSelector((state) => state.game.recentGameBlog)

    const [searchParams, setSearchParams] = useSearchParams();

    const [active, setActive] = useState(0)
    const [relatedGames, setRelatedGames] = useState([])
    const [gameData, setGameData] = useState({})
    const [recentBlogs, setRecentBlogs] = useState([])

    const [rating, setRating] = useState(0);
    const [fixedRating, setFixedRating] = useState(0)
    const [ratingNumber, setRatingNumber] = useState(0)

    const access_key = searchParams.get('access_key')

    useEffect(() => {
        if(forbiden === 'access_granted') {
            dispatch(updateGameAccessKey({ 
                id: user ? user.result?._id : '', 
                gameId: id,
                access_key: access_key,
                cookie_id: cookies.get('uid')
            }))
        }
    }, [forbiden])

    useEffect(() => {
        setGameData({})
        dispatch(getRelatedGames({
            id: user ? user.result?._id : '',
            gameId: id
        }))
        dispatch(getGameByID({ 
            id: user ? user.result?._id : '', 
            gameId: id,
            access_key: access_key,
            cookie_id: cookies.get('uid')
        }))
        dispatch(getRecentGameBlog({ 
            id: user ? user.result?._id : '', 
        }))
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        dispatch(countTags({
            id: user ? user.result?._id : ''
        }))
        dispatch(categoriesCount({
            id: user ? user.result?._id : ''
        }))
    }, [])
    
    useEffect(() => {
        if(Object.keys(game_data).length !== 0) {
            if(game_data?.game?.ratings) {
                setFixedRating(game_data.game.ratings ? divideAndScale(game_data.game.ratings) : 0)
                setRatingNumber(game_data.game.ratings ? divideAndScale(game_data.game.ratings) : 0)
            }
            setGameData(game_data)
        }
    }, [game_data])

    useEffect(() => {
        if(related_games.length > 0) {
            // const filteredObjects = relatedGames.filter(item => item._id !== id);
            // console.log(filteredObjects)
            setRelatedGames(related_games)
        }
        if(recentGameBlog.length > 0) {
            setRecentBlogs(recentGameBlog)
        }
    }, [related_games, recentGameBlog])

    const checkedForLikedBLogs = (likes) => {
        var liked = likes.some((item) => { if(item === cookies.get('uid')) return true })
        return liked ? liked : false;
    }

    const addLikes = (index) => {
        var array = [...recentBlogs]
        var duplicate = false

        array[index].likes.forEach((item) => { if(item === cookies.get('uid')) duplicate = true })
        if(!duplicate) {
            var updatedBlog = { ...array[index] }; 

            updatedBlog.likes = Array.isArray(updatedBlog.likes)
            ? [...updatedBlog.likes]
            : [];

            updatedBlog.likes.push(cookies.get('uid'));

            array[index] = updatedBlog;

            setRecentBlogs(array);
        }
        else {
            var updatedBlog = { ...array[index] };

            updatedBlog.likes = Array.isArray(updatedBlog.likes)
            ? [...updatedBlog.likes]
            : [];

            updatedBlog.likes = updatedBlog.likes.filter((item) => item !== cookies.get('uid'))

            array[index] = updatedBlog;

            setRecentBlogs(array);
        }

        dispatch(addRecentGamingBlogLikes({
            id: array[index]._id,
            likes: array[index].likes,
            userId: user ? user.result?._id : ''
        }))
    }

    const addDownloadCount = () => {
        var duplicate = false
        gameData?.game?.download_count.forEach(item => { if(cookies.get('uid') === item) duplicate = true })
        if(!duplicate) {
            dispatch(addOneDownload({
                id: cookies.get('uid'),
                gameId: id
            }))
        }
    }

    const checkDownloadLinks = () => {
        var default_link = ''
        var find_link = gameData?.game?.download_link.some((link) => {
            if(link.links.length > 0) {
                default_link = link.links[0]
                console.log(link.links[0])
                return true
            }
        })

        if(find_link) { return false }
        else { return true }
    }
    
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

    return (
        <div
            className="relative bg-cover bg-center xs:py-14 py-4 font-poppins"
            style={{ backgroundColor: "#111221" }}
        >   
            <div className={`${styles.marginX2} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto relative xs:px-6">
                            {
                                isLoading ?
                                    <div className='h-96 flex items-center justify-center'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <img className="w-16" src={loading} />
                                            <p className='text-white font-semibold text-lg mt-2'>Loading Data</p>
                                        </div>
                                    </div>
                                :
                                forbiden === 'strict' ?
                                    <div
                                        className="relative bg-cover bg-center py-20"
                                        style={{ backgroundColor: "#111827" }}
                                    >   
                                        <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                            <div className={`${styles.boxWidthEx}`}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Restricted Game</h1>
                                                    <p className="text-white text-lg mb-8 text-center">You don't have permission to view this games.</p>
                                                    <a href="/games" className="text-white underline hover:text-gray-200">Go back to games page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                forbiden === 'access_limit' ?
                                    <div
                                        className="relative bg-cover bg-center py-20"
                                        style={{ backgroundColor: "#111827" }}
                                    >   
                                        <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                            <div className={`${styles.boxWidthEx}`}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Access Key Unavailable</h1>
                                                    <p className="text-white text-lg mb-8 text-center">Access key has been expired or has reach limit.</p>
                                                    <a href="/games" className="text-white underline hover:text-gray-200">Go back to games page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                forbiden === 'access_invalid' ?
                                    <div
                                        className="relative bg-cover bg-center py-20"
                                        style={{ backgroundColor: "#111827" }}
                                    >   
                                        <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                            <div className={`${styles.boxWidthEx}`}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Invalid Access Key</h1>
                                                    <p className="text-white text-lg mb-8 text-center">Please contact the owner if this is a misunderstanding.</p>
                                                    <a href="/games" className="text-white underline hover:text-gray-200">Go back to games page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                forbiden === 'private' ?
                                    <div
                                        className="relative bg-cover bg-center py-20"
                                        style={{ backgroundColor: "#111827" }}
                                    >   
                                        <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                            <div className={`${styles.boxWidthEx}`}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Game is Private</h1>
                                                    <p className="text-white text-lg mb-8 text-center">Contact the owner to provide information about this.</p>
                                                    <a href="/games" className="text-white underline hover:text-gray-200">Go back to games page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                notFound ?
                                    <div
                                        className="relative bg-cover bg-center py-20"
                                        style={{ backgroundColor: "#111827" }}
                                    >   
                                        <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                            <div className={`${styles.boxWidthEx}`}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Game not Found</h1>
                                                    <p className="text-white text-lg mb-8 text-center">The game you're looking for doesn't exist.</p>
                                                    <a href="/games" className="text-white underline hover:text-gray-200">Go back to games page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                <>
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                        <div className="md:col-span-2">
                                            <div className='rounded-lg bg-[#131C31] border border-solid border-[#222F43] text-gray-100 font-poppins sm:p-12 p-8'>
                                            {
                                                Object.keys(gameData).length !== 0  &&
                                                <>
                                                <div className={`grid ${gameData.game.landscape ? 'sm:grid-cols-1' : 'sm:grid-cols-2'} grid-cols-1 gap-5 place-content-start mb-4`}>
                                                    <img
                                                        src={gameData.game.featured_image}
                                                        alt="Featured Image"
                                                        className='object-cover w-full border-[#222F43] border-2 rounded-md'
                                                    />
                                                    <div className='my-2'>

                                                        <h2 className='text-3xl font-semibold text-[#0DBFDC] mb-1'>{gameData.game.title}</h2>
                                                        <p className='whitespace-pre-wrap'><span className='font-semibold text-[#B9E0F2]'>Developer</span>:
                                                            {
                                                                gameData.game.details?.developer ?
                                                                    <Link to={`/games/developer/${gameData.game.details.developer}`} className='hover:text-[#0DBFDC] transition-all'> {gameData.game.details.developer}</Link>
                                                                :
                                                                    <Link to={`/games/developer/Anonymous`} className='hover:text-[#0DBFDC] transition-all'> Anonymous</Link>
                                                            }
                                                        </p>
                                                        <hr className='border-gray-700 mt-2'/>                                   
                                                        
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-4'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Language</p><span className='col-span-2'>: {gameData.game.details.language}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Version</p><span className='col-span-2'>: {gameData.game.details.latest_version}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Uploaded</p><span className='col-span-2'>: {gameData.game.details.upload_date}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Platform</p><span className='col-span-2'>: {gameData.game.details.platform}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Censorhip</p><span className='col-span-2'>: {gameData.game.details.censorship}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Downloaded</p><span className='col-span-2'>: {gameData.game.download_count.length > 0 ? gameData.game.download_count.length : 0}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-semibold text-[#B9E0F2]'>Ratings:</p>
                                                        </div>
                                                        <div className="flex items-center star-rating">
                                                            {[...Array(5)].map((_, index) => ( 
                                                                <span
                                                                    key={index}
                                                                    className={`relative star ${fixedRating >= index + 1 ? 'filled' : rating >= index + 1 ? 'filled' : ''} ${
                                                                        fixedRating > (index + 0.5) ? 'half-filled' : rating > (index + 0.5) ? 'half-filled' : ''
                                                                    }`}
                                                                >
                                                                    &#9733;
                                                                </span>
                                                            ))}
                                                            <span className='ml-1'>({!isNaN(ratingNumber) ? ratingNumber : 0})</span>
                                                        </div>
                                                        <p className='mt-1 whitespace-pre-wrap'><span className='font-bold'>Tags</span>:</p>
                                                        <div className='flex flex-wrap items-center mt-2 mb-4 gap-2 relative'>
                                                            {
                                                                gameData.game.tags && gameData.game.tags.length > 0 &&
                                                                    gameData.game.tags.map((item, index) => {
                                                                        return (
                                                                            <a href={`/games?tags=${item}`} key={index} className='flex justify-between items-center cursor-pointer transition-all p-3 py-2 text-sm rounded-lg border border-solid border-[#222F43] text-gray-100 hover:text-[#0DBFDC]'>
                                                                                <span>
                                                                                    #{item}
                                                                                </span>
                                                                            </a>
                                                                            // <div key={index} className='mt-1 flex items-center relative bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] border border-[#CAD5DF] px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                            //     <p>{item}</p>  
                                                                            // </div>  
                                                                        )
                                                                })
                                                            }
                                                            {
                                                                !(gameData.game.tags && gameData.game.tags.length > 0) &&
                                                                <p className='mt-1 whitespace-pre-wrap'>No tags to show</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='whitespace-pre-wrap font-bold text-2xl mb-2 text-[#B9E0F2]'>Description</p>
                                                <p className='whitespace-pre-wrap text-[#94a9c9]'>{gameData.game.description}</p>
                                                
                                                <p className='whitespace-pre-wrap font-bold text-2xl mt-4 mb-2 text-[#B9E0F2]'>Gallery</p>
                                                {
                                                    (gameData.game.carousel && gameData.game.gallery && gameData.game.gallery.length > 0) ?
                                                    <Carousel 
                                                        showDots={true}
                                                        responsive={responsive} className="relative"
                                                        customLeftArrow={<CustomLeft />}
                                                        customRightArrow={<CustomRight />}
                                                        slidesToSlide={1}
                                                        swipeable
                                                        autoPlay={true}
                                                        infinite={true}
                                                    >
                                                
                                                        {
                                                            gameData.game.gallery && gameData.game.gallery.length > 0 &&
                                                                gameData.game.gallery.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className='md:py-4 w-full md:h-[400px] h-[200px] overflow-hidden'>
                                                                            <img
                                                                                src={item}
                                                                                alt={`gallery #${index+1}`}
                                                                                className='w-full md:h-[400px] h-[200px] object-cover border border-gray-900 transition duration-500 ease-in-out transform hover:scale-105'
                                                                            />
                                                                        </div>  
                                                                    )
                                                                })
                                                            }
                                                
                                                    </Carousel>
                                                    :
                                                    <div className='flex flex-wrap'>
                                                        {
                                                            gameData.game.gallery && gameData.game.gallery.length > 0 &&
                                                                gameData.game.gallery.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className='md:w-1/3 sm:w-1/2 w-full h-[200px] overflow-hidden'>
                                                                            <ModalImage 
                                                                                small={item}
                                                                                large={item}
                                                                                alt={`gallery #${index+1}`}
                                                                                className='w-full h-[200px] object-cover border border-gray-900 transition duration-500 ease-in-out transform hover:scale-105'
                                                                            />
                                                                        </div>  
                                                                    )
                                                            })
                                                        }
                                                    </div>
                                                }

                                                {
                                                    !(gameData.game.gallery && gameData.game.gallery.length > 0) &&
                                                    <p className='mt-1 whitespace-pre-wrap text-[#94a9c9]'>No image to show</p>
                                                }
                                                <p className='whitespace-pre-wrap font-bold text-2xl mt-4 mb-2 text-[#B9E0F2]'>Downloads</p>

                                                {
                                                    gameData.game.download_link && gameData.game.download_link.length > 0 &&
                                                        gameData.game.download_link.map((item, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    {
                                                                        item.links.length > 0 &&
                                                                        <>
                                                                            <p className='whitespace-pre-wrap font-semibold text-base mt-4 font-poppins'>{item.storage_name}: <span className='font-normal text-sm'>{gameData.game.password}</span></p>
                                                                            <hr className='border-gray-700 mt-1 mb-2 w-32'/>   
                                                                            <div className=''>
                                                                                {
                                                                                    item.links.map((link, i) => {
                                                                                        return (
                                                                                            <div className='grid sm:grid-cols-3 grid-cols-1 gap-1 place-content-start cursor-pointer'>
                                                                                                <div className='col-span-2 flex items-center relative hover:bg-gray-700 transition-all p-2'>
                                                                                                    <FontAwesomeIcon icon={faGoogleDrive} className='mr-2 text-[#0DBFDC]'/>
                                                                                                    <div>
                                                                                                        <p className='text-white xs:text-sm text-sm break-all'>Link #{i+1}</p>
                                                                                                        <a href={link} onClick={() => addDownloadCount()} target="_blank"><FontAwesomeIcon icon={faExternalLink} className='cursor-pointer text-[#0DBFDC] absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/></a>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div></div>
                                                                                            </div>
                                                                                            // <>  
                                                                                            //     <a href={link} onClick={() => addDownloadCount()}  target="_blank" className="text-center font-semibold text-base sm:w-1/3 xs:w-1/2 w-full mr-2 mt-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                                                                            //         <FontAwesomeIcon icon={faDownload} className="text-white mr-1"/> Link #{i+1}
                                                                                            //     </a>
                                                                                            // </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </>
                                                                    } 
                                                                </div>
                                                            )
                                                    })
                                                }
                                                {
                                                    checkDownloadLinks() &&
                                                        <p className='mt-1 whitespace-pre-wrap text-[#94a9c9]'>No download link to show</p>
                                                }

                                                <hr className='border-gray-700 mt-8 mb-4'/>   
                    
                                                <div className='flex mb-8'>
                                                    <img
                                                        className='rounded-full xs:w-20 xs:h-20 w-12 h-12 border border-gray-400'
                                                        src={convertDriveImageLink(gameData.avatar)}
                                                        alt="user profile"
                                                    />
                                                    <div className='xs:ml-4 ml-2 xs:my-2'>
                                                        <p className='xs:text-xl text-lg break-all font-bold text-[#0DBFDC]'>{gameData.username}</p>
                                                        <p className='whitespace-pre-wrap xs:text-base text-sm xs:mt-2 mt-1 text-[#94a9c9]'>{gameData.game.leave_uploader_message}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className='flex justify-between items-center'>
                                                    <p className='text-sm text-[#94a9c9]'>{/*<FontAwesomeIcon icon={faCalendar} className="text-gray-400 mr-1"/>*/}{convertTimezone(gameData.game.createdAt)} ({moment(gameData.game.createdAt).fromNow()})</p>
                                                    {
                                                        gameData.game.guide_link && 
                                                            <a href={gameData.game.guide_link} target='_blank' className="cursor-pointer text-sm float-right bg-[#0DBFDC] hover:bg-transparent hover:bg-[#131C31] text-gray-100 py-2 px-4 border border-[#222F43] rounded transition-colors duration-300 ease-in-out">
                                                                View Guides
                                                            </a>
                                                    }
                                                </div>
                                                </>
                                            }
                                            </div>

                                            {
                                                relatedGames && relatedGames.length > 0 &&
                                                <>
                                                    <h1 className='text-3xl font-semibold mb-8 mt-8 text-[#0DBFDC]'>Related Games:</h1>
                                                    <div className="grid md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start my-10">
                                                        {
                                                            relatedGames.map((item, index) => {
                                                                return (
                                                                    <MotionAnimate key={index} animation='fadeInUp'>
                                                                        <GamesCards  
                                                                            id={item._id}
                                                                            heading={item.title} 
                                                                            image={item.featured_image} 
                                                                            downloads={item.download_count}
                                                                            category={item.tags.length > 0 ? item.tags[0] : 'No Tag Available'} 
                                                                            uploader={item.user.username} 
                                                                            ratings={item.ratings}
                                                                            download_links={item.download_link}
                                                                            relatedGames={true}
                                                                        />
                                                                    </MotionAnimate>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className="sm:px-2 flex flex-col gap-8">

                                            <div className='transition-all p-4 py-5 text-sm rounded-lg bg-[#131C31] border border-solid border-[#222F43] text-gray-100 font-poppins'>
                                                <h2 className='text-xl font-semibold mb-2 text-[#0DBFDC]'>Categories</h2>
                                                <hr className='border-[1.8px] border-[#0DBFDC] mb-6 w-1/3'/>

                                                <div className='flex flex-col gap-2 mb-4'>
                                                    {
                                                        categoriesList?.length > 0 &&
                                                        categoriesList.map((item, index) => {
                                                            return (
                                                                <a href={`/games?category=${item.category}`} key={index} className='flex justify-between items-center cursor-pointer transition-all p-4 py-3 text-sm rounded-lg border border-solid border-[#222F43] text-gray-100 hover:text-[#0DBFDC]'>
                                                                    <span>
                                                                        {/* <FontAwesomeIcon icon={['fas', item.icon]} className='mr-2'/> */}
                                                                        {item.category}
                                                                    </span>

                                                                    <p className='bg-[#222F43] px-3 py-1 rounded-full text-xs'>{item.count}</p>
                                                                </a>
                                                            )
                                                        })
                                                    } 
                                                </div>
                                            </div>

                                            <div className='transition-all p-4 py-5 text-sm rounded-lg bg-[#131C31] border border-solid border-[#222F43] text-gray-100 font-poppins'>
                                                <h2 className='text-xl font-semibold mb-2 text-[#0DBFDC]'>Tags</h2>
                                                <hr className='border-[1.8px] border-[#0DBFDC] mb-6 w-1/3'/>

                                                <div className='flex flex-col gap-2 mb-4'>
                                                    {
                                                        tagsList?.length > 0 &&
                                                        tagsList.map((item, index) => {
                                                            return (
                                                                <a href={`/games?tags=${item.tag}`} key={index} className='flex justify-between items-center cursor-pointer transition-all p-4 py-3 text-sm rounded-lg border border-solid border-[#222F43] text-gray-100 hover:text-[#0DBFDC]'>
                                                                    <span>
                                                                        {/* <FontAwesomeIcon icon={['fas', item.icon]} className='mr-2'/> */}
                                                                        #{item.tag}
                                                                    </span>

                                                                    <p className='bg-[#222F43] px-3 py-1 rounded-full text-xs'>{item.count}</p>
                                                                </a>
                                                            )
                                                        })
                                                    } 
                                                </div>
                                            </div>

                                            {
                                                recentBlogs?.length > 0 &&
                                                <div className='transition-all p-4 py-5 text-sm rounded-lg bg-[#131C31] border border-solid border-[#222F43] text-gray-100 font-poppins'>
                                                    <h2 className='text-xl font-semibold mb-2 text-[#0DBFDC]'>Latest Gaming Blog{recentBlogs?.length > 1 && 's'}</h2>
                                                    <hr className='border-[1.8px] border-[#0DBFDC] mb-6 w-1/3'/>
                                                    
                                                    {
                                                        recentBlogs?.length > 0 &&
                                                        recentBlogs.map((item, index) => {
                                                            var liked_blogs = checkedForLikedBLogs(item.likes);
                                                            return (
                                                                <MotionAnimate key={index} variant={{
                                                                    hidden: { 
                                                                        transform: 'scale(0)'
                                                                    },
                                                                    show: {
                                                                        opacity: 1,
                                                                        transform: 'scale(1)',
                                                                        transition: {
                                                                            duration: 0.2,
                                                                        }
                                                                    }
                                                                }}>
                                                                <div className='flex flex-row items-center text-sm mt-4 hover:text-[#0DBFDC] text-[#B9E0F2] transition-all'>
                                                                    <div className='w-full'>
                                                                        <div className='flex items-center mb-2'>
                                                                            <img
                                                                                className='rounded-full xs:w-16 xs:h-16 w-12 h-12 border border-gray-400 object-cover'
                                                                                src={convertDriveImageLink(item.featured_image)}
                                                                                alt="user profile"
                                                                            />
                                                                            <div className='xs:ml-4 ml-2'>
                                                                                <Link to={`/blogs/${item._id}`}><p className='text-base font-semibold cursor-pointer'>{item.post_title}</p></Link>
                                                                                <p className='whitespace-pre-wrap text-sm mt-1 text-[#94a9c9]'>#{item.categories} • {convertTimezone(item.createdAt)}</p>
                                                                                
                                                                                <div className='flex flex-wrap items-center text-gray-100 mt-1'>
                                                                                    <button className='cursor-pointer' onClick={() => addLikes(index, item._id)}><FontAwesomeIcon icon={faHeart} style={{color: liked_blogs ? '#CD3242' : '#FFF'}} className='pt-[0.15rem] font-bold text-base'/> {item.likes?.length > 0 ? item.likes.length : 0} </button>
                                                                                    <span className='mx-2 text-lg'>•</span>
                                                                                    <p className='text-sm'><FontAwesomeIcon icon={faComment} className='mx-1'/> {item.comments > 0 ? item.comments : 0}</p>
                                                                                </div>
                                                                                
                                                                                <hr className='border-gray-700 mt-2'/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </MotionAnimate>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    {/* {
                                        relatedGames && relatedGames.length > 0 &&
                                        <>
                                            <h1 className='text-3xl font-semibold mb-8 text-gray-300 mt-8'>Related Games:</h1>
                                            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start my-10">
                                                {
                                                    relatedGames.map((item, index) => {
                                                        return (
                                                            <MotionAnimate key={index} animation='fadeInUp'>
                                                                <GamesCards  
                                                                    id={item._id}
                                                                    heading={item.title} 
                                                                    image={item.featured_image} 
                                                                    downloads={item.download_count > 0 ? item.download_count : 0}
                                                                    category={item.tags.length > 0 ? item.tags[0] : 'No Tag Available'} 
                                                                    uploader={item.user.username} 
                                                                    ratings={item.ratings}
                                                                    download_links={item.download_link}
                                                                    relatedGames={true}
                                                                />
                                                            </MotionAnimate>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    } */}
                                </>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamesSingle