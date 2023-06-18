import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faArrowRight, faCalendar, faQuoteLeft, faQuoteRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero-image.jpg';
import styles from "../../style";

const BlogsSingle = () => {
    const navigate  = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div
            className="relative bg-cover bg-center"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className="container mx-auto py-12 xs:px-6 text-white">
                            <img 
                                src={heroImage}
                                className='w-full xs:h-80 object-cover bg-top rounded-lg'
                                alt="Display Image"
                            />
                            <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 place-content-start mt-8'>
                                <div className='col-span-2'>
                                    <h2 className='text-3xl font-semibold'>Lorem ipsum dolor sit amet</h2>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className='flex py-3'>
                                            <div className='col-span-2 flex flex-wrap items-center'>
                                                <img 
                                                    src={heroImage}
                                                    className='w-8 h-8 object-cover rounded-full border border-gray-400'
                                                    alt="avatar"
                                                />
                                                <p className='ml-2 break-all text-white'><span className='font-semibold'>By:</span> RazorScythe</p>
                                            </div>
                                        </div>
                                        <p><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> Jun 18, 2023</p>
                                    </div>

                                    {/* "Normal Paragraph" */}
                                    <p className='mt-2'>
                                    Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. Quisque volutpat, enim id volutpat interdum, purus odio euismod neque, sit amet faucibus justo dolor tincidunt dui.
Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. 
                                    </p>

                                    {/* "Quoted Paragraph" */}
                                    <p className='my-8 '>
                                        <FontAwesomeIcon icon={faQuoteLeft} className='mr-1 text-xs mb-1'/><span className='font-semibold'>Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat.</span><FontAwesomeIcon icon={faQuoteRight} className='ml-1 text-xs mb-1'/>
                                    </p>

                                    {/* "Grid Image" */}
                                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 place-content-start my-4'>
                                        <img 
                                            src={heroImage}
                                            className='w-full md:h-72 h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <img 
                                            src={heroImage}
                                            className='w-full md:h-72 h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <img 
                                            src={heroImage}
                                            className='w-full md:h-72 h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <img 
                                            src={heroImage}
                                            className='w-full md:h-72 h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                    </div>

                                    {/* "Sub Heading" */}
                                    <h2 className='text-2xl font-semibold my-4'>Lorem ipsum dolor sit amet</h2>

                                    {/* "Normal Paragraph" */}
                                    <p className='mt-2'>
                                    Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. Quisque volutpat, enim id volutpat interdum, purus odio euismod neque, sit amet faucibus justo dolor tincidunt dui.
Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. 
                                    </p>

                                    {/* "Bullet List" */}
                                    <ul className='list-disc ml-4 my-6'>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                    </ul>

                                    {/* "Single Image" */}
                                    <img 
                                        src={heroImage}
                                        className='w-full sm:h-64 object-cover bg-top rounded-lg my-8'
                                        alt="Display Image"
                                    />

                                    {/* "Normal Paragraph" */}
                                    <p className='mt-2'>
                                    Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. Quisque volutpat, enim id volutpat interdum, purus odio euismod neque, sit amet faucibus justo dolor tincidunt dui.
Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. 
                                    </p>

                                    {/* "Number List" */}
                                    <ul className='list-decimal ml-4 my-6'>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                        <li>Etiam placerat velit vitae dui blandit sollicitudin.</li>
                                    </ul>

                                    {/* "Normal Paragraph" */}
                                    <p className='mt-2'>
                                    Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. Quisque volutpat, enim id volutpat interdum, purus odio euismod neque, sit amet faucibus justo dolor tincidunt dui.
Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. 
                                    </p>

                                    {/* "Quotes" */}
                                    {/* <div className='flex flex-col items-center justify-center my-8'>
                                        <div className="w-full md:col-span-2 bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] md:p-16 py-16 p-8 sm: text-white text-center">
                                            <h3 className='text-white lg:text-4xl md:text-3xl text-2xl font-semibold text-center capitalize'><FontAwesomeIcon icon={faQuoteLeft} className='mr-1 text-base mb-2'/> Don’t worry, be happy – or atleast just fake it. That’s what I do <FontAwesomeIcon icon={faQuoteRight} className='ml-1 text-base mb-2'/></h3>
                                            <p className="text-white text-lg italic mt-4">- Maderas, James Arvie</p>
                                        </div>
                                    </div> */}
                                    
                                    <div className='flex items-center justify-between my-8'>
                                        <button className='flex items-center cursor-pointer bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-8 px-4 border border-gray-100 rounded-full transition-colors duration-300 ease-in-out'>
                                            <FontAwesomeIcon icon={faArrowLeft} className='mr-2 text-xs'/> Previous Post
                                        </button>
                                        <button className='flex items-center cursor-pointer bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-8 px-4 border border-gray-100 rounded-full transition-colors duration-300 ease-in-out'>
                                             Next Post <FontAwesomeIcon icon={faArrowRight} className='ml-2 text-xs'/>
                                        </button>
                                    </div>
                                </div>
                                <div className='sm:px-8'>
                                    <h2 className='text-2xl font-semibold mb-4'>Latest Post</h2>
                                    <div className='mb-4'>
                                        <img 
                                            src={heroImage}
                                            className='w-full h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <h2 className='text-xl font-semibold my-2'>Lorem ipsum dolor sit amet</h2>
                                        <div className='flex items-center'>
                                            <p><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> Jun 18, 2023</p>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <img 
                                            src={heroImage}
                                            className='w-full h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <h2 className='text-xl font-semibold my-2'>Lorem ipsum dolor sit amet</h2>
                                        <div className='flex items-center'>
                                            <p><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> Jun 18, 2023</p>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <img 
                                            src={heroImage}
                                            className='w-full h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <h2 className='text-xl font-semibold my-2'>Lorem ipsum dolor sit amet</h2>
                                        <div className='flex items-center'>
                                            <p><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> Jun 18, 2023</p>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <img 
                                            src={heroImage}
                                            className='w-full h-48 object-cover bg-top rounded-lg'
                                            alt="Display Image"
                                        />
                                        <h2 className='text-xl font-semibold my-2'>Lorem ipsum dolor sit amet</h2>
                                        <div className='flex items-center'>
                                            <p><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> Jun 18, 2023</p>
                                        </div>
                                    </div>

                                    <h2 className='text-2xl font-semibold mb-4 mt-8'>Tags</h2>
                                    <div className='flex flex-wrap'>
                                        <button className='text-sm mb-2 mr-2 flex items-center cursor-pointer bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded-full transition-colors duration-300 ease-in-out'>
                                            Simulation
                                        </button>
                                        <button className='text-sm mb-2 mr-2 flex items-center cursor-pointer bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded-full transition-colors duration-300 ease-in-out'>
                                            Puzzel
                                        </button>
                                        <button className='text-sm mb-2 mr-2 flex items-center cursor-pointer bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded-full transition-colors duration-300 ease-in-out'>
                                            3D Games
                                        </button>
                                        <button className='text-sm mb-2 mr-2 flex items-center cursor-pointer bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 rounded-full transition-colors duration-300 ease-in-out'>
                                            Adventure
                                        </button>
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

export default BlogsSingle