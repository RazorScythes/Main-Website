import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../style'
const Header = ({ heading, description, button_text, button_link, api_call}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        if(!api_call) return
    }

    return (
        <div className="relative bg-white">   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto relative px-0 pt-12 md:pb-12 pb-8">
                        <div className="lg:flex md:flex items-center justify-center">
                            <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                <h2 className='text-4xl font-bold text-gray-800 mb-2'>{ heading || 'Welcome' }</h2>
                                <p className='text-lg text-gray-600 font-semibold'>{ description || 'Select a website to manage, or create a new one from scratch.' }</p>
                            </div>
                            <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4 flex items-center md:justify-end justify-start">
                                {
                                    button_link ? 
                                    <Link to={button_link || "#"}>
                                        <button className="bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 font-semibold my-8 py-2 px-8 border border-gray-800 rounded transition-colors duration-300 ease-in-out">
                                            { button_text || 'Explore Now!' }
                                        </button>
                                    </Link>
                                    :
                                    <button onClick={handleClick} className="bg-gray-100 hover:bg-gray-800 hover:text-gray-100 text-gray-800 font-semibold mt-8 py-2 px-8 border border-gray-800 rounded transition-colors duration-300 ease-in-out">
                                        { button_text || 'Explore Now!' }
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header