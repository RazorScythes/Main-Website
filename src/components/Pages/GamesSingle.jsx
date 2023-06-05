import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { faCalendar, faInfoCircle, faImage, faDownload, faMinus, faChevronRight, faChevronLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getRelatedGames, getGameByID, countTags, clearAlert } from "../../actions/game";
import Carousel from "react-multi-carousel";
import GamesCards from './GamesCards';
import styles from "../../style";
import image from '../../assets/hero-bg.jpg'
import avatar from '../../assets/avatar.png'
import moment from 'moment';
import "react-multi-carousel/lib/styles.css";


const CustomRight = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClick}
        className="absolute right-6 max-w-4 cursor-pointer text-primary-400 text-2xl text-white"
      />
    )
};
  
const CustomLeft = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClick}
        className="absolute left-6 max-w-4 cursor-pointer text-primary-400 text-2xl text-white"
      />
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

    return averageRating.toFixed(2)
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

    const [active, setActive] = useState(0)
    const [relatedGames, setRelatedGames] = useState([])
    const [gameData, setGameData] = useState({})

    const [rating, setRating] = useState(0);
    const [fixedRating, setFixedRating] = useState(0)
    const [ratingNumber, setRatingNumber] = useState(0)

    useEffect(() => {
        setGameData({})
        dispatch(getRelatedGames({
            id: user ? user.result?._id : '',
            gameId: id
        }))
        dispatch(getGameByID({ 
            id: user ? user.result?._id : '', 
            gameId: id 
        }))
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        dispatch(countTags())
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
    }, [related_games])

    return (
        <div
            className="relative bg-cover bg-center xs:py-14 py-4"
            style={{ backgroundColor: "#111221" }}
        >   
            <div className={`${styles.marginX2} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                            {
                                isLoading ?
                                    <div className='h-96 flex items-center justify-center'>
                                        <div className='flex md:flex-row flex-col items-center justify-center'>
                                        
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
                                        <div className="md:col-span-2 bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] sm:p-16 p-8 text-white">
                                            {
                                                Object.keys(gameData).length !== 0  &&
                                                <>
                                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-4'>
                                                    <img
                                                        src={gameData.game.featured_image}
                                                        alt="Featured Image"
                                                        className='object-cover w-full border-gray-600 border-2 rounded-md'
                                                    />
                                                    <div className='my-2'>

                                                        <h2 className='text-3xl font-semibold'>{gameData.game.title}</h2>
                                                        <p className='whitespace-pre-wrap'><span className='font-semibold'>Developer</span>: {gameData.game.details.developer}</p>
                                                        <hr className='my-1 mb-2'/>                                   
                                                        
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-4'>
                                                            <p className='whitespace-pre-wrap font-bold'>Language</p><span className='col-span-2'>: {gameData.game.details.language}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-bold'>Version</p><span className='col-span-2'>: {gameData.game.details.latest_version}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-bold'>Uploaded</p><span className='col-span-2'>: {gameData.game.details.upload_date}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-bold'>Platform</p><span className='col-span-2'>: {gameData.game.details.platform}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-bold'>Censorhip</p><span className='col-span-2'>: {gameData.game.details.censorship}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-bold'>Downloaded</p><span className='col-span-2'>: {gameData.game.download_count ? gameData.game.download_count : 0}</span>
                                                        </div>
                                                        <div className='grid grid-cols-3 gap-5 place-content-start mt-1'>
                                                            <p className='whitespace-pre-wrap font-bold'>Ratings:</p>
                                                        </div>
                                                        <div className="flex items-center star-rating">
                                                            {[...Array(5)].map((_, index) => ( 
                                                                <span
                                                                    key={index}
                                                                    className={`relative star ${fixedRating >= index + 1 ? 'filled' : rating >= index + 1 ? 'filled' : ''} ${
                                                                        fixedRating === index + 0.5 ? 'half-filled' : rating === index + 0.5 ? 'half-filled' : ''
                                                                    }`}
                                                                >
                                                                    &#9733;
                                                                </span>
                                                            ))}
                                                            <span className='ml-1'>({ratingNumber})</span>
                                                        </div>
                                                        <p className='mt-1 whitespace-pre-wrap'><span className='font-bold'>Tags</span>:</p>
                                                        <div className='flex flex-wrap items-center mt-2 mb-4 relative'>
                                                            {
                                                                gameData.game.tags && gameData.game.tags.length > 0 &&
                                                                    gameData.game.tags.map((item, index) => {
                                                                        return (
                                                                            <div key={index} className='mt-1 flex items-center relative bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] border border-[#CAD5DF] px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                                <p>{item}</p>  
                                                                            </div>  
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
                                                <p className='whitespace-pre-wrap font-bold text-2xl mb-2'>Description</p>
                                                <p className='whitespace-pre-wrap'>{gameData.game.description}</p>
                                                
                                                <p className='whitespace-pre-wrap font-bold text-2xl mt-4 mb-2'>Gallery</p>
                                                <div className='flex flex-wrap'>
                                                    {
                                                        gameData.game.gallery && gameData.game.gallery.length > 0 &&
                                                            gameData.game.gallery.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='md:w-1/3 sm:w-1/2 w-full h-[200px] overflow-hidden'>
                                                                        <img 
                                                                            src={item}
                                                                            alt={`gallery #${index+1}`}
                                                                            className='w-full h-[200px] object-cover border border-gray-900 transition duration-500 ease-in-out transform hover:scale-105'
                                                                        />
                                                                    </div>  
                                                                )
                                                        })
                                                    }
                                                </div>
                                                {
                                                    !(gameData.game.gallery && gameData.game.gallery.length > 0) &&
                                                    <p className='mt-1 whitespace-pre-wrap'>No image to show</p>
                                                }
                                                <p className='whitespace-pre-wrap font-bold text-2xl mt-4 mb-2'>Downloads</p>

                                                {
                                                    gameData.game.download_link && gameData.game.download_link.length > 0 &&
                                                        gameData.game.download_link.map((item, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    {
                                                                        item.links.length > 0 &&
                                                                        <>
                                                                            <p className='whitespace-pre-wrap font-semibold text-lg mt-4'>{item.storage_name}: <span className='font-normal'>{gameData.game.password}</span></p>
                                                                            <div className='flex flex-wrap'>
                                                                                {
                                                                                    item.links.map((link, i) => {
                                                                                        return (
                                                                                            <>  
                                                                                                <a href={link} target="_blank" className="text-center font-semibold text-base sm:w-1/3 xs:w-1/2 w-full mr-2 mt-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                                                                                    <FontAwesomeIcon icon={faDownload} className="text-white mr-1"/> Link #{i+1}
                                                                                                </a>
                                                                                            </>
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
                                                    !(gameData.game.download_link && gameData.game.download_link[0].links.length > 0) &&
                                                    <p className='mt-1 whitespace-pre-wrap'>No download link to show</p>
                                                }
                                                <hr className='mt-8 mb-4'/>
                    
                                                <div className='flex mb-8'>
                                                    <img
                                                        className='rounded-full xs:w-20 xs:h-20 w-12 h-12 border border-gray-400'
                                                        src={gameData.avatar}
                                                        alt="user profile"
                                                    />
                                                    <div className='xs:ml-4 ml-2 xs:my-2'>
                                                        <p className='text-white xs:text-xl text-lg break-all font-bold'>{gameData.username}</p>
                                                        <p className='whitespace-pre-wrap xs:text-base text-sm xs:mt-2 mt-1'>{gameData.game.leave_uploader_message}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className='flex justify-between items-center'>
                                                    <p className='xs:text-base text-sm'><FontAwesomeIcon icon={faCalendar} className="text-gray-400 mr-1"/> {moment(gameData.game.createdAt).fromNow()}</p>
                                                    {
                                                        gameData.game.guide_link && 
                                                            <button title="guide" className='rounded-sm float-right bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-2 px-4 border border-[#CAD5DF] transition-colors duration-300 ease-in-out'>
                                                                Guides
                                                            </button>
                                                    }
                                                </div>
                                                </>
                                            }
                                        </div>
                                        <div className="">

                                            {
                                                tagsList && tagsList.length > 0 &&
                                                    <div className='bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] mb-4 p-8 text-white'>
                                                        <h2 className='text-xl font-semibold mb-6'>Tags</h2>
                                                        <ul className='sm:text-base text-sm'>
                                                            {
                                                                tagsList.map((item, index) => {
                                                                    return (
                                                                        <Link to={`/games/tags/${item.tag}`}><li className='capitalize flex justify-between hover:text-[#00FFFF] cursor-pointer hover:ml-3 transition-all mb-2 font-semibold border-b border-solid border-gray-500 pb-2'>{item.tag}<span className='text-white'>({item.count})</span></li></Link>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                            }
                                            
                                            <div className='bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] mb-8 p-8 text-white'>
                                                <h2 className='text-xl font-semibold mb-6'>Recent Blogs</h2>
                                                <div className='flex flex-col'>
                                                    <div className='flex flex-row mb-4'>
                                                        <img 
                                                            src={image}
                                                            alt="Post Image"
                                                            className='w-1/3 h-[75px] object-cover'
                                                        />
                                                        <div className='flex flex-col ml-2 relative'>
                                                            <h3 className='xs:text-base text-sm'>装脱騎士ニンフォリア</h3>
                                                            <div className='flex items-center absolute bottom-0 left-0'>
                                                                <FontAwesomeIcon icon={faCalendar} className="text-white text-xs"/>
                                                                <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>1 month</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row mb-4'>
                                                        <img 
                                                            src={image}
                                                            alt="Post Image"
                                                            className='w-1/3 h-[75px] object-cover'
                                                        />
                                                        <div className='flex flex-col ml-2 relative'>
                                                            <h3 className='xs:text-base text-sm'>密かな性癖を武器に悪の組織と戦う物語である。</h3>
                                                            <div className='flex items-center absolute bottom-0 left-0'>
                                                                <FontAwesomeIcon icon={faCalendar} className="text-white text-xs"/>
                                                                <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>1 month</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row mb-4'>
                                                        <img 
                                                            src={image}
                                                            alt="Post Image"
                                                            className='w-1/3 h-[75px] object-cover'
                                                        />
                                                        <div className='flex flex-col ml-2 relative'>
                                                            <h3 className='xs:text-base text-sm'>密かな性癖を武器に悪の組織と戦う物語である。</h3>
                                                            <div className='flex items-center absolute bottom-0 left-0'>
                                                                <FontAwesomeIcon icon={faCalendar} className="text-white text-xs"/>
                                                                <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>1 month</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row mb-4'>
                                                        <img 
                                                            src={image}
                                                            alt="Post Image"
                                                            className='w-1/3 h-[75px] object-cover'
                                                        />
                                                        <div className='flex flex-col ml-2 relative'>
                                                            <h3 className='xs:text-base text-sm'>密かな性癖を武器に悪の組織と戦う物語である。</h3>
                                                            <div className='flex items-center absolute bottom-0 left-0'>
                                                                <FontAwesomeIcon icon={faCalendar} className="text-white text-xs"/>
                                                                <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>1 month</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row mb-4'>
                                                        <img 
                                                            src={image}
                                                            alt="Post Image"
                                                            className='w-1/3 h-[75px] object-cover'
                                                        />
                                                        <div className='flex flex-col ml-2 relative'>
                                                            <h3 className='xs:text-base text-sm'>密かな性癖を武器に悪の組織と戦う物語である。</h3>
                                                            <div className='flex items-center absolute bottom-0 left-0'>
                                                                <FontAwesomeIcon icon={faCalendar} className="text-white text-xs"/>
                                                                <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>1 month</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        relatedGames && relatedGames.length > 0 &&
                                        <>
                                            <h1 className='text-3xl font-semibold mb-8 text-gray-300 mt-8'>Related Games:</h1>
                                            <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start my-10">
                                                {
                                                    relatedGames.map((item, index) => {
                                                        return (
                                                            <GamesCards  
                                                                key={index}
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
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    }
                                </>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamesSingle