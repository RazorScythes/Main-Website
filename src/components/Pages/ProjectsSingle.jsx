import React, { useState, useEffect } from 'react'
import styles from "../../style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams, useParams } from "react-router-dom";
import { faArrowLeft, faArrowRight, faArrowRightRotate, faChevronLeft, faChevronRight, faExternalLink, faFile, faHome, faHomeAlt, faHomeLg, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { getProjectByID, clearAlert } from "../../actions/project";
import { useDispatch, useSelector } from 'react-redux'
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Carousel from "react-multi-carousel";
import { convertDriveImageLink } from '../Tools'
import "react-multi-carousel/lib/styles.css";
import { MotionAnimate } from 'react-motion-animate';
import loading from '../../assets/loading.gif'
import moment from 'moment'

import { library, findIconDefinition  } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

const CustomRight = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faArrowRight}
        onClick={onClick}
        className="absolute sm:right-0 right-4 max-w-4 cursor-pointer text-primary-400 text-2xl font-bold text-[#0DBFDC] p-4 rounded-full drop-shadow-lg"
      />
    )
};
  
const CustomLeft = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={onClick}
        className="absolute sm:left-0 left-4 max-w-4 cursor-pointer text-primary-400 text-2xl font-bold text-[#0DBFDC] p-4 rounded-full drop-shadow-lg"
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

const ProjectsSingle = ({ user }) => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const project_data = useSelector((state) => state.project.data)
    const notFound = useSelector((state) => state.project.notFound)
    const forbiden = useSelector((state) => state.project.forbiden)
    const isLoading = useSelector((state) => state.project.isLoading)

    const [projectData, setProjectData] = useState({})

    useEffect(() => {
        dispatch(getProjectByID({ 
            id: user ? user.result?._id : '', 
            projectId: id 
        }))
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        if(Object.keys(project_data).length !== 0) {
            setProjectData(project_data)
        }
    }, [project_data])

    useEffect(() => {
        console.log(projectData)
    }, [projectData])

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

    const submitComment = () => {

    }

    return (
        <div
            className="relative bg-cover bg-center font-poppins"
            style={{ backgroundColor: "#0F172A" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className="container mx-auto py-12 xs:px-6 text-[#94a9c9]">
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
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Restricted Project</h1>
                                                    <p className="text-white text-lg mb-8 text-center">You don't have permission to view this project.</p>
                                                    <a href="/projects" className="text-white underline hover:text-gray-200">Go back to project page</a>
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
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Projects is Private</h1>
                                                    <p className="text-white text-lg mb-8 text-center">Contact the owner to provide information about this.</p>
                                                    <a href="/projects" className="text-white underline hover:text-gray-200">Go back to projects page</a>
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
                                                    <h1 className="text-white text-4xl font-bold mb-4 text-center">Project not Found</h1>
                                                    <p className="text-white text-lg mb-8 text-center">The project you're looking for doesn't exist.</p>
                                                    <a href="/projects" className="text-white underline hover:text-gray-200">Go back to projects page</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                Object.keys(projectData).length !== 0  &&
                                <>
                                    <div className='flex flex-row items-center text-sm'>
                                        <div className='mr-2'><FontAwesomeIcon icon={faHomeLg} className='mr-1'/> <a href='' className='hover:underline transition-all hover:text-[#0CBCDC]'> Home </a></div>
                                        <div className='mr-2'><FontAwesomeIcon icon={faChevronRight} className='mr-1'/> <a href='' className='hover:underline transition-all hover:text-[#0CBCDC]'> Projects </a></div>
                                        <div className='mr-2'><FontAwesomeIcon icon={faChevronRight} className='mr-1'/> {projectData.project.post_title} </div>
                                    </div>

                                    <hr className='border-[#94a9c9] my-4'/>

                                    <div className='flex flex-row items-center text-sm mt-12'>
                                        <div className='sm:w-3/4 w-full'>
                                            <h1 className='text-5xl font-semibold text-[#0DBFDC] leading-normal drop-shadow-md'> {projectData.project.post_title} </h1>
                                        </div>
                                        <div className='sm:w-1/4 w-full sm:block hidden'>

                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center text-sm mt-4'>
                                        <div className='sm:w-3/4 w-full'>
                                            <div className='flex mb-8'>
                                                <img
                                                    className='rounded-full xs:w-12 xs:h-12 w-10 h-10 border border-gray-400'
                                                    src={convertDriveImageLink(projectData.avatar)}
                                                    alt="user profile"
                                                />
                                                <div className='xs:ml-4 ml-2'>
                                                    <p className='text-white xs:text-sm text-lg break-all font-semibold'>{projectData.username}</p>
                                                    <p className='whitespace-pre-wrap xs:text-sm text-sm mt-1'>{convertTimezone(projectData.project.createdAt)} ({moment(projectData.project.createdAt).fromNow()})</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='sm:w-1/4 w-full sm:block hidden'>

                                        </div>
                                    </div>

                                    <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 place-content-start mt-8'>
                                        <div className='col-span-2'>
                                            {
                                                projectData.project.content?.map((data, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                data.container?.map((item, i) => {
                                                                    return (
                                                                        <div key={i}>
                                                                            {
                                                                                item.element === 'normal_naragraph' ?
                                                                                    <p className='leading-normal mt-2 whitespace-pre-wrap'>
                                                                                        {item.paragraph}
                                                                                    </p>
                                                                                :
                                                                                item.element === 'quoted_naragraph whitespace-pre-wrap' ?
                                                                                    <p className='my-8 '>
                                                                                        <FontAwesomeIcon icon={faQuoteLeft} className='mr-1 text-xs mb-1'/><span className='font-semibold'>{item.paragraph}</span><FontAwesomeIcon icon={faQuoteRight} className='ml-1 text-xs mb-1'/>
                                                                                    </p>
                                                                                :
                                                                                item.element === 'heading' ?
                                                                                    <h2 className='text-3xl font-semibold my-4 text-[#B9E0F2]'>{item.heading}</h2>
                                                                                :
                                                                                item.element === 'sub_heading' ?
                                                                                    <h2 className='text-2xl font-semibold my-4 text-[#B9E0F2]'>{item.heading}</h2>
                                                                                :
                                                                                item.element === 'number_list' ?
                                                                                    <ul className='list-decimal pl-4 text-[#B9E0F2] py-4 pt-2'>
                                                                                        {
                                                                                            item.list?.map((l, ix) => {
                                                                                                return (
                                                                                                    <li className='mb-1' key={ix}><p>{l}</p></li>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                :
                                                                                item.element === 'bullet_list' ?
                                                                                    <ul className='list-decimal pl-4 text-[#B9E0F2] py-4 pt-2'>
                                                                                        {
                                                                                            item.list?.map((l, ix) => {
                                                                                                return (
                                                                                                    <li className='mb-1' key={ix}><p>{l}</p></li>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                :
                                                                                item.element === 'download_list' ?
                                                                                    <div>
                                                                                        {
                                                                                            item.list?.map((l, ix) => {
                                                                                                return (
                                                                                                    <div className='grid sm:grid-cols-3 grid-cols-1 gap-1 place-content-start cursor-pointer'>
                                                                                                        <div className='col-span-2 flex items-center relative hover:bg-gray-700 transition-all p-2'>
                                                                                                            <FontAwesomeIcon icon={['fas', l.icon]} className='mr-2 text-[#0DBFDC]'/>
                                                                                                            <div>
                                                                                                                <p className='text-white xs:text-sm text-sm break-all'>{l.name}</p>
                                                                                                                <a><FontAwesomeIcon icon={faExternalLink} className='cursor-pointer text-[#0DBFDC] absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div></div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                :
                                                                                item.element === 'list_image' ?
                                                                                    <div>
                                                                                        {
                                                                                            item.list?.map((l, ix) => {
                                                                                                return (
                                                                                                    <div className='flex items-center relative hover:bg-gray-700 transition-all p-2'>
                                                                                                        <img
                                                                                                            className='rounded-sm xs:w-12 xs:h-12 w-10 h-10 border border-gray-400 object-cover'
                                                                                                            src={l.image}
                                                                                                            alt="user profile"
                                                                                                        />
                                                                                                        <div className='xs:ml-4 ml-2' key={ix}>
                                                                                                            <p className='text-white xs:text-sm text-sm break-all'>{l.heading}</p>
                                                                                                            <p className='whitespace-pre-wrap xs:text-xs text-xs mt-1 text-[#B9E0F2]'>{l.sub_heading}</p>
                                                                                                            <a><FontAwesomeIcon icon={faExternalLink} className='cursor-pointer text-[#0DBFDC] absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/></a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                :
                                                                                item.element === 'grid_image' ?
                                                                                    <div className={`grid ${(item.type === 'boxed') && 'sm:grid-cols-2'} grid-cols-1 gap-5 place-content-start my-4`}>
                                                                                        {
                                                                                            item.grid_image?.map((image, i) => {
                                                                                                return (
                                                                                                    <MotionAnimate key={i} variant={{
                                                                                                        hidden: { 
                                                                                                            opacity: 0,
                                                                                                            transform: 'scale(0)'
                                                                                                        },
                                                                                                        show: {
                                                                                                            opacity: 1,
                                                                                                            transform: 'scale(1)',
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                            }
                                                                                                        }
                                                                                                    }}>
                                                                                                        <div className='relative'>
                                                                                                            <img 
                                                                                                                src={image}
                                                                                                                className={`w-full ${item.type === 'boxed-full' && 'md:h-[500px] sm:h-[400px] h-[300px]'} ${(item.type === 'boxed' || item.type === 'rectangular') && 'md:h-60 h-48'} object-cover bg-top rounded-lg border border-[#1C1B19]`}
                                                                                                                alt={`Grid Image #${i+1}`}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </MotionAnimate>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                :
                                                                                item.element === 'single_image' ?
                                                                                    <MotionAnimate key={index} animation='fadeInUp'>
                                                                                        <img 
                                                                                            src={item.image}
                                                                                            className={`w-full ${item.type === 'boxed-full' && 'md:h-[500px] sm:h-[400px] h-[300px]'} ${(item.type === 'rectangular') && 'md:h-60 h-48'} object-cover bg-top rounded-lg border border-[#1C1B19] my-4`}
                                                                                            alt={`Grid Image`}
                                                                                        />
                                                                                    </MotionAnimate>
                                                                                :
                                                                                item.element === 'slider' ?
                                                                                    <div>
                                                                                        {
                                                                                            item.grid_image?.length > 0 && 
                                                                                            <Carousel 
                                                                                                showDots={true}
                                                                                                responsive={responsive} className="relative rounded-md border border-solid border-[#10192c]"
                                                                                                customLeftArrow={<CustomLeft />}
                                                                                                customRightArrow={<CustomRight />}
                                                                                                slidesToSlide={1}
                                                                                                swipeable
                                                                                                autoPlay={true}
                                                                                                infinite={true}
                                                                                            >
                                                                                                {
                                                                                                    item.grid_image.map((grid, x) => {
                                                                                                        return (
                                                                                                            <div key={x} className='md:px-0 md:py-4 w-full md:h-[400px] h-[200px] overflow-hidden rounded-md'>
                                                                                                                <img
                                                                                                                    src={grid}
                                                                                                                    alt={`gallery #${x+1}`}
                                                                                                                    className='w-full md:h-[400px] h-[200px] object-cover border border-gray-900 transition duration-500 ease-in-out transform hover:scale-105 rounded-md'
                                                                                                                />
                                                                                                            </div>  
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </Carousel>
                                                                                        }
                                                                                    </div>
                                                                                :
                                                                                item.element === 'code_highlights' &&
                                                                                    <div>
                                                                                        <p className='text-[#B9E0F2]'>{item.name}</p>
                                                                                        <SyntaxHighlighter language={item.language} style={hljsStyles[item.theme]} showLineNumbers={true} wrapLongLines={true}>
                                                                                            {`${item.paragraph}`}
                                                                                        </SyntaxHighlighter>
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <hr className='border-gray-700 my-6'/>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className='flex flex-wrap gap-2'>
                                                {
                                                    projectData.project?.tags.length > 0 &&
                                                    projectData.project?.tags.map((item, index) => {
                                                        return (
                                                            <span key={index} className='cursor-pointer transition-all p-4 py-3 text-sm rounded-lg bg-[#131C31] border border-solid border-[#222F43] text-gray-100 hover:text-[#0DBFDC]'>
                                                                #{item}
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <h2 className='text-3xl font-semibold my-4 mt-8 text-[#B9E0F2]'>Leave a comment</h2>
                                            <textarea
                                                value=""
                                                // onChange={(e) => setComment(e.target.value)}
                                                name="message"
                                                id="message"
                                                cols="30"
                                                rows="8"
                                                placeholder="Write a comment"
                                                className="w-full p-4 text-sm rounded-lg mt-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700"
                                            >
                                            </textarea>
                                            <button onClick={submitComment} className="text-sm float-right bg-[#0DBFDC] hover:bg-transparent hover:bg-[#131C31] text-gray-100 py-2 px-4 border border-[#222F43] rounded transition-colors duration-300 ease-in-out">
                                                {
                                                    // !submitted ?
                                                    (
                                                        <>
                                                            Post Comment
                                                        </>
                                                    )
                                                    // :
                                                    // (
                                                    //     <div className='flex flex-row justify-center items-center px-4'>
                                                    //         <div role="status">
                                                    //             <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    //                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    //                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    //             </svg>
                                                    //             <span class="sr-only">Loading...</span>
                                                    //         </div>
                                                    //         Commenting
                                                    //     </div>
                                                    // )
                                                }
                                            </button>
                                        </div>
                                        <div>
                                            HELLO
                                        </div>
                                    </div>
                                </>
                            }

                            <div className='grid sm:grid-cols-3 grid-cols-1 gap-5 place-content-start mt-8'>
                                <div className='col-span-2'>
                                    {/* <h2 className='text-3xl font-semibold my-4 text-[#0DBFDC]'>Lists w/ Image and Link</h2>

                                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-1 place-content-start mt-8'>
                                        <div className='flex items-center relative hover:bg-gray-700 transition-all p-2'>
                                            <img
                                                className='rounded-sm xs:w-12 xs:h-12 w-10 h-10 border border-gray-400 object-cover'
                                                src={'https://drive.google.com/thumbnail?id=1YYA-nZXtL9JO2DfCANY0U4aQnEBrXtB5&sz=w1000'}
                                                alt="user profile"
                                            />
                                            <div className='xs:ml-4 ml-2'>
                                                <p className='text-white xs:text-sm text-sm break-all'>{'RazorScythe'}</p>
                                                <p className='whitespace-pre-wrap xs:text-xs text-xs mt-1 text-[#B9E0F2]'>1 pcs</p>
                                                <a><FontAwesomeIcon icon={faExternalLink} className='cursor-pointer text-[#0DBFDC] absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/></a>
                                            </div>
                                        </div>
                                        <div className='flex items-center relative hover:bg-gray-700 transition-all p-2'>
                                            <img
                                                className='rounded-sm xs:w-12 xs:h-12 w-10 h-10 border border-gray-400 object-cover'
                                                src={'https://drive.google.com/thumbnail?id=1YYA-nZXtL9JO2DfCANY0U4aQnEBrXtB5&sz=w1000'}
                                                alt="user profile"
                                            />
                                            <div className='xs:ml-4 ml-2'>
                                                <p className='text-white xs:text-sm text-sm break-all'>{'RazorScythe'}</p>
                                                <p className='whitespace-pre-wrap xs:text-xs text-xs mt-1 text-[#B9E0F2]'>1 pcs</p>
                                                <a><FontAwesomeIcon icon={faExternalLink} className='cursor-pointer text-[#0DBFDC] absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/></a>
                                            </div>
                                        </div>
                                        <div className='flex items-center relative hover:bg-gray-700 transition-all p-2'>
                                            <img
                                                className='rounded-sm xs:w-12 xs:h-12 w-10 h-10 border border-gray-400 object-cover'
                                                src={'https://drive.google.com/thumbnail?id=1YYA-nZXtL9JO2DfCANY0U4aQnEBrXtB5&sz=w1000'}
                                                alt="user profile"
                                            />
                                            <div className='xs:ml-4 ml-2'>
                                                <p className='text-white xs:text-sm text-sm break-all'>{'RazorScythe'}</p>
                                                <p className='whitespace-pre-wrap xs:text-xs text-xs mt-1 text-[#B9E0F2]'>1 pcs</p>
                                                <a><FontAwesomeIcon icon={faExternalLink} className='cursor-pointer text-[#0DBFDC] absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2'/></a>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div>
                                    {/* <p>Hi</p> */}
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