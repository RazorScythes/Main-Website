import React from 'react'
import styles from "../../style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome, faHomeAlt, faHomeLg, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const ProjectsSingle = () => {
    return (
        <div
            className="relative bg-cover bg-center font-poppins"
            style={{ backgroundColor: "#0F172A" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className="container mx-auto py-12 xs:px-6 text-[#94a9c9]">
                            <div className='flex flex-row items-center text-sm'>
                                <div className='mr-2'><FontAwesomeIcon icon={faHomeLg} className='mr-1'/> <a href='' className='hover:underline transition-all hover:text-[#0CBCDC]'> Home </a></div>
                                <div className='mr-2'><FontAwesomeIcon icon={faChevronRight} className='mr-1'/> <a href='' className='hover:underline transition-all hover:text-[#0CBCDC]'> Projects </a></div>
                                <div className='mr-2'><FontAwesomeIcon icon={faChevronRight} className='mr-1'/> Project Name Here </div>
                            </div>
                            <hr className='border-[#94a9c9] my-4'/>
                            <div className='flex flex-row items-center text-sm mt-12'>
                                <div className='sm:w-3/4 w-full'>
                                    <h1 className='text-5xl font-semibold text-[#0DBFDC] leading-normal drop-shadow-md'>Are You Ready To Go Home After The Sunset View?</h1>
                                </div>
                                <div className='sm:w-1/4 w-full sm:block hidden'>

                                </div>
                            </div>

                            <div className='flex flex-row items-center text-sm mt-4'>
                                <div className='sm:w-3/4 w-full'>
                                    <div className='flex mb-8'>
                                        <img
                                            className='rounded-full xs:w-12 xs:h-12 w-10 h-10 border border-gray-400'
                                            src={'https://drive.google.com/thumbnail?id=1YYA-nZXtL9JO2DfCANY0U4aQnEBrXtB5&sz=w1000'}
                                            alt="user profile"
                                        />
                                        <div className='xs:ml-4 ml-2'>
                                            <p className='text-white xs:text-sm text-lg break-all font-semibold'>{'RazorScythe'}</p>
                                            <p className='whitespace-pre-wrap xs:text-sm text-sm mt-1'>{'Jul 04, 2023'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='sm:w-1/4 w-full sm:block hidden'>

                                </div>
                            </div>

                            <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 place-content-start mt-8'>
                                <div className='col-span-2'>
                                    <p className='leading-normal'>The fancy moon going in little artist painting. Thirty days of lavender in the dreamy light inside. Other perfect oh plants, for and again. I’ve honey feeling. Caring dreamland projects noteworthy than minimal, their it oh pretty feeling may. Include pink be.</p>
                                
                                    <p className='my-8 '>
                                        <FontAwesomeIcon icon={faQuoteLeft} className='mr-1 text-xs mb-1'/><span className='font-semibold'>Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat.</span><FontAwesomeIcon icon={faQuoteRight} className='ml-1 text-xs mb-1'/>
                                    </p>

                                    <h2 className='text-2xl font-semibold my-4 text-[#B9E0F2]'>Are You Ready To Go Home After The Sunset View?</h2>
                                </div>
                                <div>
                                    <p>Hi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSingle