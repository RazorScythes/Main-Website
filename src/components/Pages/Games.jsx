import React from 'react'
import styles from "../../style";
import { Error_forbiden } from '../../assets';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import image from '../../assets/hero-bg.jpg'
import avatar from '../../assets/avatar.png'
const Games = () => {
  return (
    <div
        className="relative bg-cover bg-center"
        style={{ backgroundColor: "#111827" }}
    >   
        <div className={`${styles.marginX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidthEx}`}>
                <div className="container mx-auto file:lg:px-8 relative px-0">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start text-center my-10">
                        <Link to='/games/adventure_time'>
                            <div className='lg:w-[350px] md:[300px] sm:w-[325px] xs:w-[350px] mx-auto h-[300px] relative border border-solid border-gray-600'>
                                <div className="absolute inset-0 bg-black opacity-30"></div>
                                <img
                                    className='h-full w-full object-cover'
                                    alt="game feature image"
                                    src={image}
                                />
                                <div className='absolute left-0 top-0 py-6 px-4'>
                                    <div className='flex flex-row flex-wrap break-keep relative z-10'>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>18+</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>adventure</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>rpg</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>puzzel</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>simulation</p></Link>
                                    </div>
                                    <h1 className='text-left text-white xs:text-2xl text-xl font-semibold mt-2'>Adventure Time</h1>
                                </div>
                                <div className="w-full absolute left-0 bottom-0 pb-6 px-4">
                                    <div className="grid grid-cols-3 gap-2 place-content-start">
                                        <div className='col-span-2'>
                                            <Link to={`/tag/adventure`} className='flex items-center'>
                                                    <img
                                                        className='rounded-full xs:w-8 xs:h-8 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='text-white xs:text-sm text-xs font-semibold ml-2 break-all'>RazorScythe</p>
                                            </Link>
                                        </div>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon icon={faCalendar} className="text-white"/>
                                            <p className='text-gray-400 xs:text-sm text-xs font-semibold ml-2 break-all'>1 month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/games/adventure_time'>
                            <div className='lg:w-[350px] md:[300px] sm:w-[325px] xs:w-[350px] mx-auto h-[300px] relative border border-solid border-gray-600'>
                                <div className="absolute inset-0 bg-black opacity-30"></div>
                                <img
                                    className='h-full w-full object-cover'
                                    alt="game feature image"
                                    src={image}
                                />
                                <div className='absolute left-0 top-0 py-6 px-4'>
                                    <div className='flex flex-row flex-wrap break-keep relative z-10'>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>18+</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>adventure</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>rpg</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>puzzel</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>simulation</p></Link>
                                    </div>
                                    <h1 className='text-left text-white xs:text-2xl text-xl font-semibold mt-2'>Adventure Time</h1>
                                </div>
                                <div className="w-full absolute left-0 bottom-0 pb-6 px-4">
                                    <div className="grid grid-cols-3 gap-2 place-content-start">
                                        <div className='col-span-2'>
                                            <Link to={`/tag/adventure`} className='flex items-center'>
                                                    <img
                                                        className='rounded-full xs:w-8 xs:h-8 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='text-white xs:text-sm text-xs font-semibold ml-2 break-all'>RazorScythe</p>
                                            </Link>
                                        </div>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon icon={faCalendar} className="text-white"/>
                                            <p className='text-gray-400 xs:text-sm text-xs font-semibold ml-2 break-all'>1 month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/games/adventure_time'>
                            <div className='lg:w-[350px] md:[300px] sm:w-[325px] xs:w-[350px] mx-auto h-[300px] relative border border-solid border-gray-600'>
                                <div className="absolute inset-0 bg-black opacity-30"></div>
                                <img
                                    className='h-full w-full object-cover'
                                    alt="game feature image"
                                    src={image}
                                />
                                <div className='absolute left-0 top-0 py-6 px-4'>
                                    <div className='flex flex-row flex-wrap break-keep relative z-10'>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>18+</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>adventure</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>rpg</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>puzzel</p></Link>
                                        <Link to={`/tag/adventure`}><p className='text-white px-4 rounded-full py-1 mb-2 mr-2 bg-gray-800 xs:text-sm text-xs font-semibold hover:bg-white hover:text-gray-800 transition-all'>simulation</p></Link>
                                    </div>
                                    <h1 className='text-left text-white xs:text-2xl text-xl font-semibold mt-2'>Adventure Time</h1>
                                </div>
                                <div className="w-full absolute left-0 bottom-0 pb-6 px-4">
                                    <div className="grid grid-cols-3 gap-2 place-content-start">
                                        <div className='col-span-2'>
                                            <Link to={`/tag/adventure`} className='flex items-center'>
                                                    <img
                                                        className='rounded-full xs:w-8 xs:h-8 w-6 h-6'
                                                        src={avatar}
                                                        alt="user profile"
                                                    />
                                                    <p className='text-white xs:text-sm text-xs font-semibold ml-2 break-all'>RazorScythe</p>
                                            </Link>
                                        </div>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon icon={faCalendar} className="text-white"/>
                                            <p className='text-gray-400 xs:text-sm text-xs font-semibold ml-2 break-all'>1 month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* <div className="flex flex-col justify-center items-center text-center py-20">
                    <img
                        src={Error_forbiden}
                        alt="404 Error - Page Not Found"
                        className="md:w-[550px] w-96 h-auto mb-8"
                    />
                    <h1 className="text-white sm:text-4xl text-2xl font-bold mb-4">This page is not ready</h1>
                    <p className="text-white text-lg mb-8">Looks like the page hasn't started yet.</p>
                    <a href="/" className="text-white underline hover:text-gray-200">Go back to home page</a>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Games