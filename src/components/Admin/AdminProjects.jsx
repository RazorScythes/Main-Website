import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom'
import { Header } from './index'
import { Link } from 'react-router-dom'
import Alert from '../Alert';
import SideAlert from '../SideAlert';
import styles from '../../style'

import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

import heroBackgroundImage from '../../assets/1696333975880.jpg';
const AdminProjects = ({ user, path }) => {
    const dispatch = useDispatch()

    const alert = useSelector((state) => state.settings.alert)
    const variant = useSelector((state) => state.settings.variant)
    const heading = useSelector((state) => state.settings.heading)
    const paragraph = useSelector((state) => state.settings.paragraph)

    const [open, setOpen] = useState({
        portfolio: false,
        pages: false,
        uploads: false,
        manage: false,
    })
    const [isOpen, setIsOpen] = useState(false)

    const [submitted, setSubmitted] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertInfo, setAlertInfo] = useState({
        alert: '',
        variant: ''
    })
    const [message, setMessage] = useState({
        heading: '',
        paragraph: ''
    })
    const [active, setActive] = useState(false)

    const { options } = useParams();

    useEffect(() => {
        if(alert || variant){
            setAlertInfo({ ...alertInfo, alert: alert, variant: variant })
            setShowAlert(true)
            if(heading) {
                setMessage({...message, heading: heading, paragraph: paragraph})
                setActive(true)
            }
            setSubmitted(false)
            window.scrollTo(0, 0)
            dispatch(clearAlert())
        }
    }, [alert, variant, heading, paragraph])

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} path={path}/>
            <div class="flex flex-col flex-1">
                <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} path={path}/>
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="mx-auto grid"></div>
                        <div className="relative bg-[#F9FAFB]">   
                            <SideAlert
                                variants={alertInfo.variant}
                                heading={message.heading}
                                paragraph={message.paragraph}
                                active={active}
                                setActive={setActive}
                            />
                            {/* <Header 
                                heading='Settings'
                                description="Select a website to manage, or create a new one from scratch."
                                button_text="Explore Now!"
                                button_link={`#`}
                                show_button={false}
                            /> */}
                            <div className="sm:mx-16 mx-6 pt-8 flex justify-between items-center">
                                <h2 className='text-3xl font-semibold font-poppins'>Projects</h2>
                                <div>
                                <button className="sm:my-8 py-2 px-4 border-[#CAD5DF] leading-5 text-white font-semibold transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                                </div>
                            </div>
                            
                            <div className="relative">   
                                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                    <div className={`${styles.boxWidthEx}`}>
                                        <div className="container mx-auto relative px-0 pt-8 pb-16">
                                            {
                                                alertInfo.alert && alertInfo.variant && showAlert &&
                                                    <Alert variants={alertInfo.variant} text={alertInfo.alert} show={showAlert} setShow={setShowAlert} />
                                            }
                                            <div className='grid md:grid-cols-1 grid-cols-1 gap-5 place-content-start mb-4'>
                                                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">

                                                    <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                        <img
                                                            className='object-cover w-full h-52'
                                                            src={heroBackgroundImage}
                                                        />
                                                        <div className='px-2 pb-2 font-poppins'>
                                                            <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                                                            <div className='flex flex-wrap'>
                                                            <p className='text-sm text-gray-600'>2310 views • </p>
                                                            <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                                                            <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                        <img
                                                            className='object-cover w-full h-52'
                                                            src={heroBackgroundImage}
                                                        />
                                                        <div className='px-2 pb-2 font-poppins'>
                                                            <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                                                            <div className='flex flex-wrap'>
                                                            <p className='text-sm text-gray-600'>2310 views • </p>
                                                            <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                                                            <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                        <img
                                                            className='object-cover w-full h-52'
                                                            src={heroBackgroundImage}
                                                        />
                                                        <div className='px-2 pb-2 font-poppins'>
                                                            <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                                                            <div className='flex flex-wrap'>
                                                            <p className='text-sm text-gray-600'>2310 views • </p>
                                                            <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                                                            <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                        <img
                                                            className='object-cover w-full h-52'
                                                            src={heroBackgroundImage}
                                                        />
                                                        <div className='px-2 pb-2 font-poppins'>
                                                            <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                                                            <div className='flex flex-wrap'>
                                                            <p className='text-sm text-gray-600'>2310 views • </p>
                                                            <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                                                            <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                        <img
                                                            className='object-cover w-full h-52'
                                                            src={heroBackgroundImage}
                                                        />
                                                        <div className='px-2 pb-2 font-poppins'>
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
                            </div>  
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminProjects