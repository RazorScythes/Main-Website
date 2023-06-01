import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { faCalendar, faInfoCircle, faImage, faDownload, faMinus, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getGames, clearAlert } from "../../actions/game";
import Carousel from "react-multi-carousel";
import GamesCards from './GamesCards';
import styles from "../../style";
import image from '../../assets/hero-bg.jpg'
import avatar from '../../assets/avatar.png'
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

const GamesSingle = ({ user }) => {

    const { id } = useParams();

    const dispatch = useDispatch()

    const game = useSelector((state) => state.game.games)

    const [active, setActive] = useState(0)
    const [games, setGames] = useState([])

    useEffect(() => {
        dispatch(getGames({
            id: user ? user.result?._id : ''
        }))

        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(game.length > 0) {
            const filteredObjects = game.filter(item => item._id !== id);
            setGames(game)
        }
    }, [game])

    return (
        <div
            className="relative bg-cover bg-center py-14"
            style={{ backgroundColor: "#111221" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                            <div className="md:col-span-2 bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] sm:p-16 p-8 text-white">
                                <div className='flex flex-row flex-wrap justify-start mb-4'>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-900 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>18+</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-900 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>adventure</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-900 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>rpg</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-900 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>puzzel</p></Link>
                                    <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-900 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>simulation</p></Link>
                                </div>

                                <h1 className='xs:text-4xl text-3xl font-semibold mb-3'>Adventure Time</h1>

                                <div className='flex flex-row mb-8'>
                                    <div className='mr-4'>
                                        <Link to={`/tag/adventure`} className='flex items-center'>
                                                <img
                                                    className='rounded-full w-6 h-6'
                                                    src={avatar}
                                                    alt="user profile"
                                                />
                                                <p className='text-white xs:text-sm text-xs ml-2 break-all'>RazorScythe</p>
                                        </Link>
                                    </div>
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon icon={faCalendar} className="text-white"/>
                                        <p className='text-gray-400 xs:text-sm text-xs ml-2 break-all'>1 month</p>
                                    </div>
                                </div>

                                <img
                                    className='border border-solid border-gray-600 w-full rounded-md mb-6'
                                    src={image}
                                    alt="Featured Image"
                                />

                                <p className='border-solid border-l-[3px] border-gray-400 pl-4 mb-12 xs:text-base text-sm'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tellus nulla. Pellentesque eget libero semper, commodo mauris vel, vehicula est.
                                </p>

                                <div className='flex flex-row border-b border-white border-solid mb-8'>
                                    <FontAwesomeIcon onClick={() => setActive(0)} style={{color: active === 0 ? '#FFF' : '#00FFFF', border: active === 0 ? "1px solid white" : '1px solid transparent', borderBottom: 'none'}} icon={faInfoCircle} className="text-[#00FFFF] text-lg px-4 py-2 rounded-t-md cursor-pointer transition-all"/>
                                    <FontAwesomeIcon onClick={() => setActive(1)} style={{color: active === 1 ? '#FFF' : '#00FFFF', border: active === 1 ? "1px solid white" : '1px solid transparent', borderBottom: 'none'}} icon={faImage} className="text-[#00FFFF] text-lg px-4 py-2 rounded-t-md cursor-pointer transition-all"/>
                                    <FontAwesomeIcon onClick={() => setActive(2)} style={{color: active === 2 ? '#FFF' : '#00FFFF', border: active === 2 ? "1px solid white" : '1px solid transparent', borderBottom: 'none'}} icon={faDownload} className="text-[#00FFFF] text-lg px-4 py-2 rounded-t-md cursor-pointer transition-all"/>
                                </div>
                                {
                                    active === 0 && (
                                        <div className='sm:pl-4 xs:text-base text-sm'>
                                            <div className='flex flex-row items-center mb-2'>
                                                <FontAwesomeIcon icon={faMinus} className="text-white"/>
                                                <p className='text-white ml-2 break-all'><span className='text-[#00FFFF] font-semibold'>Version: </span> 0.2</p>
                                            </div>
                                            <div className='flex flex-row items-center mb-2'>
                                                <FontAwesomeIcon icon={faMinus} className="text-white"/>
                                                <p className='text-white ml-2 break-all'><span className='text-[#00FFFF] font-semibold'>Censorship: </span> Uncensored</p>
                                            </div>
                                            <div className='flex flex-row items-center mb-2'>
                                                <FontAwesomeIcon icon={faMinus} className="text-white"/>
                                                <p className='text-white ml-2 break-all'><span className='text-[#00FFFF] font-semibold'>Language: </span> English</p>
                                            </div>
                                            <div className='flex flex-row items-center mb-2'>
                                                <FontAwesomeIcon icon={faMinus} className="text-white"/>
                                                <p className='text-white ml-2 break-all'><span className='text-[#00FFFF] font-semibold'>Developer: </span> WickedGoat</p>
                                            </div>
                                            <div className='flex flex-row items-center mb-2'>
                                                <FontAwesomeIcon icon={faMinus} className="text-white"/>
                                                <p className='text-white ml-2 break-all'><span className='text-[#00FFFF] font-semibold'>Release Date: </span> 10/04/2023</p>
                                            </div>
                                            <div className='flex flex-row items-center mb-2'>
                                                <FontAwesomeIcon icon={faMinus} className="text-white"/>
                                                <p className='text-white ml-2 break-all'><span className='text-[#00FFFF] font-semibold'>Platform: </span> Windows, Android, Linux</p>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    active === 1 && (
                                        <>
                                            {
                                                image ? 
                                                <Carousel 
                                                    showDots={true}
                                                    responsive={responsive} className="relative"
                                                    customLeftArrow={<CustomLeft />}
                                                    customRightArrow={<CustomRight />}
                                                    slidesToSlide={1}
                                                    swipeable
                                                >
                                                    <img
                                                        src={image}
                                                        alt={"Gallery"}
                                                        className='rounded-md'
                                                    />
                                                </Carousel> 
                                                :
                                                <>
                                                    <p className='pl-4'>No image available</p>
                                                </>
                                            }
                                        </>
                                    )
                                }
                                {
                                    active === 2 && (
                                        <div>
                                            <h2 className='xs:text-xl text-lg font-semibold mb-2'>Select where you want to download the program.</h2>
                                            <p className='mb-4'>Password: 12345</p>
                                            <div className='mb-6'>
                                                <h2 className='text-base font-semibold text-center border border-gray-300 border-solid py-2'>Google Drive.</h2>
                                                <div className='grid xs:grid-cols-4 grid-cols-1'>
                                                    <h2 className='flex items-center xs:justify-start justify-center text-sm xs:col-span-2 break-all xs:text-left text-center xs:border-r-0 border-r xs:border-b border-b-0 border-l px-2 border-gray-300 border-solid py-1'>1-oeq9Rc5xABeRFb2ZPLNt9HGPJ-LrZ0l</h2>
                                                    <h2 className='flex items-center justify-center text-sm xs:border-b border-b-0 xs:border-r-0 border-r xs:border-l-0 border-l text-center border-gray-300 border-solid py-1'>{formatDate("2023-05-22T13:49:26.531Z")}</h2>
                                                    <h2 className='flex items-center justify-center text-sm xs:border-l-0 border-l border-b border-r text-center border-gray-300 border-solid py-1 cursor-pointer'><FontAwesomeIcon icon={faDownload} className="mr-2"/> download</h2>
                                                </div>
                                                <div className='grid xs:grid-cols-4 grid-cols-1'>
                                                    <h2 className='flex items-center xs:justify-start justify-center text-sm xs:col-span-2 break-all xs:text-left text-center xs:border-r-0 border-r xs:border-b border-b-0 border-l px-2 border-gray-300 border-solid py-1'>1-oeq9Rc5xABeRFb2ZPLNt9HGPJ-LrZ0l</h2>
                                                    <h2 className='flex items-center justify-center text-sm xs:border-b border-b-0 xs:border-r-0 border-r xs:border-l-0 border-l text-center border-gray-300 border-solid py-1'>{formatDate("2023-05-22T13:49:26.531Z")}</h2>
                                                    <h2 className='flex items-center justify-center text-sm xs:border-l-0 border-l border-b border-r text-center border-gray-300 border-solid py-1 cursor-pointer'><FontAwesomeIcon icon={faDownload} className="mr-2"/> download</h2>
                                                </div>
                                                <div className='grid xs:grid-cols-4 grid-cols-1'>
                                                    <h2 className='flex items-center xs:justify-start justify-center text-sm xs:col-span-2 break-all xs:text-left text-center xs:border-r-0 border-r xs:border-b border-b-0 border-l px-2 border-gray-300 border-solid py-1'>1-oeq9Rc5xABeRFb2ZPLNt9HGPJ-LrZ0l</h2>
                                                    <h2 className='flex items-center justify-center text-sm xs:border-b border-b-0 xs:border-r-0 border-r xs:border-l-0 border-l text-center border-gray-300 border-solid py-1'>{formatDate("2023-05-22T13:49:26.531Z")}</h2>
                                                    <h2 className='flex items-center justify-center text-sm xs:border-l-0 border-l border-b border-r text-center border-gray-300 border-solid py-1 cursor-pointer'><FontAwesomeIcon icon={faDownload} className="mr-2"/> download</h2>
                                                </div>     
                                            </div>     
                                        </div>
                                    )
                                }
                            </div>
                            <div className="">
                                <div className='bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] mb-4 p-8 text-white'>
                                    <h2 className='text-xl font-semibold mb-6'>Categories</h2>
                                    <ul className='sm:text-base text-sm'>
                                        <li className='capitalize flex justify-between hover:text-[#00FFFF] cursor-pointer hover:ml-3 transition-all mb-2 font-semibold border-b border-solid border-gray-500 pb-2'>adventure<span className='text-white'>(18)</span></li>
                                        <li className='capitalize flex justify-between hover:text-[#00FFFF] cursor-pointer hover:ml-3 transition-all mb-2 font-semibold border-b border-solid border-gray-500 pb-2'>games 3D<span className='text-white'>(18)</span></li>
                                        <li className='capitalize flex justify-between hover:text-[#00FFFF] cursor-pointer hover:ml-3 transition-all mb-2 font-semibold border-b border-solid border-gray-500 pb-2'>visual novel<span className='text-white'>(18)</span></li>
                                        <li className='capitalize flex justify-between hover:text-[#00FFFF] cursor-pointer hover:ml-3 transition-all mb-2 font-semibold border-b border-solid border-gray-500 pb-2'>flash<span className='text-white'>(18)</span></li>
                                        <li className='capitalize flex justify-between hover:text-[#00FFFF] cursor-pointer hover:ml-3 transition-all mb-2 font-semibold border-b border-solid border-gray-500 pb-2'>simulation<span className='text-white'>(18)</span></li>
                                    </ul>
                                </div>
                                <div className='bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] mb-8 p-8 text-white'>
                                    <h2 className='text-xl font-semibold mb-6'>Recent Posts</h2>
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
                        <h1 className='text-3xl font-semibold mb-8 text-gray-300 mt-8'>You may also like:</h1>
                        <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start my-10">
                            {
                                games && games.length > 0 &&
                                    games.map((item, index) => {
                                        return (
                                            <GamesCards  
                                                key={index}
                                                id={item._id}
                                                heading={item.title} 
                                                image={item.featured_image} 
                                                downloads={1}
                                                category={item.tags.length > 0 ? item.tags[0] : 'No Tag Available'} 
                                                uploader={item.user.username} 
                                                ratings={item.ratings}
                                                download_links={item.download_link}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamesSingle