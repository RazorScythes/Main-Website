import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { Header } from './index'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { getOverviewData } from '../../actions/admin';
import { convertDriveImageLink } from '../Tools'

import CountUp from 'react-countup';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

import moment from 'moment-timezone';
import Avatar from '../../assets/avatar.png'
const AdminOverview = ({ user, path }) => {

    const dispatch = useDispatch()

    const overview = useSelector((state) => state.admin.data)
    const itemsPerPage = 10; // Number of items per page

    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState({})

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        if(!user) navigate(`/`)
        dispatch(getOverviewData())
    }, [])

    useEffect(() => {
        if (Object.keys(overview).length > 0) {
            setData(overview)
            console.log(overview)
        }
    }, [overview])

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
        return formattedDate
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} path={path}/>
            <div class="flex flex-col flex-1">
                <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} path={path}/>
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="mx-auto grid">  
                        {/* <Header 
                            heading='Welcome'
                            description="Select a website to manage, or create a new one from scratch."
                            button_text="Explore Now!"
                            button_link={`#`}
                        /> */}
                        <div className="relative bg-[#F0F4F7] mt-8">   
                            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                <div className={`${styles.boxWidthEx}`}>
                                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2  grid-cols-1 gap-4">
                                        <div style={{borderColor: "#CD3242"}} className='relative font-poppins grid grid-cols-3 rounded-sm w-full border-l-[6px] border-solid bg-gray-100 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] px-6 py-4'>
                                            <div className='col-span-2'>
                                                <p className='text-gray-800 font-semibold text-lg'>Total Users</p>
                                                <Link to={`/archive/`}><p style={{color: "#CD3242"}} className='[text-shadow:_0_2px_0_rgb(0_0_0_/_30%)] text-2xl my-2 font-semibold'><CountUp end={data?.users_count ? data.users_count.users_count : 0} duration={2}/></p></Link>
                                                <p className='text-gray-800 text-sm'>{moment(data?.users_count?.latest_user.createdAt).fromNow()}</p>
                                            </div>
                                            <div className='flex items-center justify-end'>
                                                <FontAwesomeIcon icon={['fas', 'fa-user']} title={'test'} style={{color: "#FFF", background: "#CD3242", borderColor: "#CD3242"}}  className='text-xl transition-all p-4 border rounded-full'/>
                                            </div>
                                        </div>

                                        <div style={{borderColor: "#15CA20"}} className='relative font-poppins grid grid-cols-3 rounded-sm w-full border-l-[6px] border-solid bg-gray-100 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] px-6 py-4'>
                                            <div className='col-span-2'>
                                                <p className='text-gray-800 font-semibold text-lg'>Total Videos</p>
                                                <Link to={`/archive/`}><p style={{color: "#15CA20"}} className='[text-shadow:_0_2px_0_rgb(0_0_0_/_50%)] text-2xl my-2 font-semibold'><CountUp end={data?.video_count ? data.video_count.video_count : 0} duration={2}/></p></Link>
                                                <p className='text-gray-800 text-sm'>{moment(data?.video_count?.latest_video.createdAt).fromNow()}</p>
                                            </div>
                                            <div className='flex items-center justify-end'>
                                                <FontAwesomeIcon icon={['fas', 'fa-video']} title={'test'} style={{color: "#FFF", background: "#15CA20", borderColor: "#15CA20"}}  className='text-xl transition-all p-4 border rounded-full'/>
                                            </div>
                                        </div>

                                        <div style={{borderColor: "#0DCAF0"}} className='relative font-poppins grid grid-cols-3 rounded-sm w-full border-l-[6px] border-solid bg-gray-100 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] px-6 py-4'>
                                            <div className='col-span-2'>
                                                <p className='text-gray-800 font-semibold text-lg'>Total Games</p>
                                                <Link to={`/archive/`}><p style={{color: "#0DCAF0"}} className='[text-shadow:_0_2px_0_rgb(0_0_0_/_50%)] text-2xl my-2 font-semibold'><CountUp end={data?.games_count ? data.games_count.games_count : 0} duration={2}/></p></Link>
                                                <p className='text-gray-800 text-sm'>{moment(data?.games_count?.latest_game.createdAt).fromNow()}</p>
                                            </div>
                                            <div className='flex items-center justify-end'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gamepad']} title={'test'} style={{color: "#FFF", background: "#0DCAF0", borderColor: "#0DCAF0"}}  className='text-xl transition-all p-4 border rounded-full'/>
                                            </div>
                                        </div>

                                        <div style={{borderColor: "#FFC20D"}} className='relative font-poppins grid grid-cols-3 rounded-sm w-full border-l-[6px] border-solid bg-gray-100 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] px-6 py-4'>
                                            <div className='col-span-2'>
                                                <p className='text-gray-800 font-semibold text-lg'>Total Blogs</p>
                                                <Link to={`/archive/`}><p style={{color: "#FFC20D"}} className='[text-shadow:_0_2px_0_rgb(0_0_0_/_50%)] text-2xl my-2 font-semibold'><CountUp end={data?.blogs_count ? data.blogs_count.blogs_count : 0} duration={2}/></p></Link>
                                                <p className='text-gray-800 text-sm'>{moment(data?.blogs_count?.latest_blog.createdAt).fromNow()}</p>
                                            </div>
                                            <div className='flex items-center justify-end'>
                                                <FontAwesomeIcon icon={['fas', 'fa-note-sticky']} title={'test'} style={{color: "#FFF", background: "#FFC20D", borderColor: "#FFC20D"}}  className='text-xl transition-all p-4 border rounded-full'/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-8">
                                        <div class="xs:w-full overflow-hidden rounded-sm shadow-xs col-span-2">
                                            <p className='text-gray-800 font-bold text-lg mb-2'>Recent Activity</p>
                                            <div class="w-full overflow-x-auto">
                                                <table class="min-w-full overflow-x-auto whitespace-no-wrap">
                                                    <thead>
                                                        <tr
                                                            class="text-sm font-normal text-left text-gray-800 border border-solid dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                                        >
                                                            <th class="pl-4 py-3">User</th>
                                                            <th class="px-4 py-3">Type</th>
                                                            <th class="px-4 py-3">Message</th>
                                                            <th class="px-4 py-3">Method</th>
                                                            <th class="px-4 py-3">Timestamp</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                                        {
                                                            data?.activity_logs?.length > 0 &&
                                                            data.activity_logs.slice(startIndex, endIndex).map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td class="px-4 py-3 text-xs">
                                                                            <div class="flex items-center text-sm">
                                                                                <div
                                                                                    className="relative w-8 h-8 mr-3 rounded-full="
                                                                                >
                                                                                    <img
                                                                                        className="object-cover w-full h-full rounded-full"
                                                                                        src={item.user.avatar ? convertDriveImageLink(item.user.avatar) : Avatar}
                                                                                        alt=""
                                                                                        loading="lazy"
                                                                                    />
                                                                                    <div
                                                                                        className="absolute inset-0 rounded-full shadow-inner"
                                                                                        aria-hidden="true"
                                                                                    ></div>
                                                                                </div>
                                                                                <div>
                                                                                    <p className="font-semibold">{item.user.username}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="px-4 py-3 text-xs">
                                                                            {
                                                                                item.type === 'video' ?
                                                                                <div className='w-14 px-2 py-1 rounded-lg bg-[#15CA20] text-[#FFF] font-bold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)]'>video</div>
                                                                                : item.type === 'game' ?
                                                                                <div className='w-14 px-2 py-1 rounded-lg bg-[#0DCAF0] text-[#FFF] font-bold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)]'>game</div>
                                                                                : item.type === 'blog' ?
                                                                                <div className='w-14 px-2 py-1 rounded-lg bg-[#FFC20D] text-[#FFF] font-bold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)]'>blog</div>
                                                                                : item.type === 'user' &&
                                                                                <div className='w-14 px-2 py-1 rounded-lg bg-[#CD3242] text-[#FFF] font-bold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)]'>user</div>
                                                                            }
                                                                        </td>
                                                                        <td class="px-4 py-3 text-sm">
                                                                            {item.message}
                                                                        </td>
                                                                        <td class="px-4 py-3 text-xs">
                                                                            {
                                                                                item.method === 'GET' ?
                                                                                <div className='w-12 px-2 py-1 rounded-lg bg-[#15CA20] text-[#FFF] font-semibold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_50%)]'>GET</div>
                                                                                : item.method === 'POST' ?
                                                                                <div className='w-12 px-2 py-1 rounded-lg bg-[#0DCAF0] text-[#FFF] font-semibold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_50%)]'>POST</div>
                                                                                : item.method === 'PATCH' ?
                                                                                <div className='w-14 px-2 py-1 rounded-lg bg-[#FFC20D] text-[#FFF] font-semibold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_50%)]'>PATCH</div>
                                                                                : item.method === 'DELETE' &&
                                                                                <div className='w-14 px-2 py-1 rounded-lg bg-[#CD3242] text-[#FFF] font-semibold text-center [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)]'>DELETE</div>
                                                                            }
                                                                        </td>
                                                                        <td class="px-4 py-3 text-sm">
                                                                            {dateFormat(item.createdAt)}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                class="md:block hidden px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                                                >
                                                <span class="flex items-center col-span-3">
                                                    Showing 0 of 0
                                                </span>
                                                <span class="col-span-2"></span>
                                                <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                                    <nav aria-label="Table navigation">
                                                        <ul class="inline-flex items-center">
                                                            <li>
                                                                <button
                                                                    // disabled={gameCurrentPage === 1} onClick={() => goToGamePage(1)}
                                                                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                                                    aria-label="Previous"
                                                                    >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                                                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    // disabled={gameCurrentPage === 1} onClick={() => goToGamePage(gameCurrentPage - 1)}
                                                                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                                                    aria-label="Previous"
                                                                    >
                                                                    <svg
                                                                        class="w-4 h-4 fill-current"
                                                                        aria-hidden="true"
                                                                        viewBox="0 0 20 20"
                                                                        >
                                                                        <path
                                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                        clip-rule="evenodd"
                                                                        fill-rule="evenodd"
                                                                        ></path>
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    // disabled={gameEndIndex >= gameData?.length} onClick={() => goToGamePage(gameCurrentPage + 1)}
                                                                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                                                    aria-label="Next"
                                                                    >
                                                                    <svg
                                                                        class="w-4 h-4 fill-current"
                                                                        aria-hidden="true"
                                                                        viewBox="0 0 20 20"
                                                                        >
                                                                        <path
                                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                        clip-rule="evenodd"
                                                                        fill-rule="evenodd"
                                                                        ></path>
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    // disabled={gameEndIndex >= gameData?.length} onClick={() => goToGamePage(gameData?.length / itemsPerPage)} 
                                                                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                                                    aria-label="Next"
                                                                    >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="xs:w-full overflow-hidden rounded-sm shadow-xs">
                                            <p className='text-gray-800 font-bold text-lg mb-2'>User Contribution</p>
                                            <div class="w-full overflow-x-auto">
                                                <table class="min-w-full overflow-x-auto whitespace-no-wrap">
                                                    <thead>
                                                        <tr
                                                            class="text-sm font-normal text-left text-gray-800 border border-solid dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                                        >
                                                            <th class="pl-4 py-3">User</th>
                                                            <th class="px-4 py-3">Points</th>
                                                        </tr>
                                                    </thead>
                                                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                                            {   
                                                                data?.users?.length > 0 &&
                                                                data?.users.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td class="px-4 py-3 text-xs">
                                                                                <div class="flex items-center text-sm">
                                                                                    <div
                                                                                        className="relative w-8 h-8 mr-3 rounded-full="
                                                                                    >
                                                                                        <img
                                                                                            className="object-cover w-full h-full rounded-full"
                                                                                            src={item.avatar ? convertDriveImageLink(item.avatar) : Avatar}
                                                                                            alt=""
                                                                                            loading="lazy"
                                                                                        />
                                                                                        <div
                                                                                            className="absolute inset-0 rounded-full shadow-inner"
                                                                                            aria-hidden="true"
                                                                                        ></div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="font-semibold">{item.username}</p>
                                                                                        {
                                                                                            item.role === 'Admin' ? <p className="text-xs font-semibold text-[#DC2626]">Admin</p> :
                                                                                            item.role === 'Moderator' ? <p className="text-xs font-semibold text-[#FFAA33]">Moderator</p> 
                                                                                            : <p class="text-xs font-semibold text-[#2563EB]">User</p>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="px-4 py-3 text-xs">
                                                                                {item.points}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                </table>
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

export default AdminOverview