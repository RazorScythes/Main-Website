import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Sidebar = ({ path }) => {

    const firstPath = location.pathname.split('/')[2]

    const [deviceType, setDeviceType] = useState('');
    const [prevDeviceType, setPrevDeviceType] = useState('');

    useEffect(() => {
        const checkDeviceType = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1060) {
                setDeviceType('Desktop');
            } else if (screenWidth >= 768) {
                setDeviceType('Tablet');
            } else {
                setDeviceType('Mobile');
            }
        };

        // Initial check when the component mounts
        checkDeviceType();

        // Add a listener to update the device type when the window is resized
        window.addEventListener('resize', checkDeviceType);

        // Clean up the listener when the component unmounts
        return () => {
        window.removeEventListener('resize', checkDeviceType);
        };
    }, []);

    // Check for changes in device type
    useEffect(() => {
        if (deviceType !== prevDeviceType) {
            // Device type has changed
            // console.log(`Device type changed from ${prevDeviceType} to ${deviceType}`);
            if(prevDeviceType == 'Desktop') setIsOpen(true)
            if(deviceType == 'Desktop') setIsOpen(false)

            setPrevDeviceType(deviceType);
        }
    }, [deviceType, prevDeviceType]);

    return (
        <>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <aside style={{animation: !isOpen ? "slide-to-right 0.2s" : "slide-out-left 0.2s", left: !isOpen ? '0px' : '-400px'}} className={`absolute md:relative scrollbar-hide z-20 w-full xs:w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 transition-all`}>
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <div className='flex justify-between items-start'>
                    <Link className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
                        RazorScythe
                    </Link>
                    <button
                        className={`p-1 -ml-1 mr-5 rounded-md ${isOpen && 'hidden'} md:hidden focus:outline-none focus:shadow-outline-purple`}
                        aria-label="Menu"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <ul className="mt-6">
                    <li className="relative px-6 py-3">

                        { (firstPath === '' || firstPath === undefined) && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> }

                        {/* text-gray-800 dark:text-gray-100 */}
                        <Link to="/admin" style={{color: (firstPath === '' || firstPath === undefined) && 'rgb(31 41 55)'}} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                        </svg>
                        <span className="ml-4">Dashboard</span>
                        </Link>
                    </li>
                    </ul>
                    <ul>
                    <li className="relative px-6 py-3">
                        { firstPath === 'portfolio' && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> }

                        <Link to='/admin/portfolio' style={{color: (firstPath === 'portfolio') && 'rgb(31 41 55)'}}className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" href="/admin/portfolio">
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                ></path>
                            </svg>
                            <span className="ml-4">Portfolio</span>
                        </Link>
                    </li>
                    <li className="relative px-6 py-3">
                        <Link
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        href="../cards.html"
                        >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            ></path>
                        </svg>
                        <span className="ml-4">Cards</span>
                        </Link>
                    </li>
                    <li className="relative px-6 py-3">
                        <Link
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        href="../charts.html"
                        >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                            ></path>
                            <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                        </svg>
                        <span className="ml-4">Charts</span>
                        </Link>
                    </li>
                    <li className="relative px-6 py-3">
                        <Link
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        href="../buttons.html"
                        >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            ></path>
                        </svg>
                        <span className="ml-4">Buttons</span>
                        </Link>
                    </li>
                    <li className="relative px-6 py-3">
                        <Link
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        href="../modals.html"
                        >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                        </svg>
                        <span className="ml-4">Modals</span>
                        </Link>
                    </li>
                    <li className="relative px-6 py-3">
                        <Link
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        href="../tables.html"
                        >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                        </svg>
                        <span className="ml-4">Tables</span>
                        </Link>
                    </li>
                    <li className="relative px-6 py-3">
                        <button
                            className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                            onClick={() => setOpen(!open)}
                            aria-haspopup="true"
                        >
                        <span className="inline-flex items-center">
                            <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            ></path>
                            </svg>
                            <span className="ml-4">Pages</span>
                        </span>
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            ></path>
                        </svg>
                        </button>
                        {
                            open &&
                            <ul
                                x-transition:enter="transition-all ease-in-out duration-300"
                                x-transition:enter-start="opacity-25 max-h-0"
                                x-transition:enter-end="opacity-100 max-h-xl"
                                x-transition:leave="transition-all ease-in-out duration-300"
                                x-transition:leave-start="opacity-100 max-h-xl"
                                x-transition:leave-end="opacity-0 max-h-0" 
                                className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                                aria-label="submenu"
                                >
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <Link className="w-full" href="./login.html">Login</Link>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <Link className="w-full" href="./create-account.html">
                                    Create account
                                    </Link>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <Link className="w-full" href="./forgot-password.html">
                                    Forgot password
                                    </Link>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <Link className="w-full" href="./404.html">404</Link>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <Link className="w-full" href="./blank.html">Blank</Link>
                                </li>
                            </ul>
                                
                        }
                        </li>
                    </ul>
                <div className="px-6 my-6">
                <button
                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                    Create account
                    <span className="ml-2" aria-hidden="true">+</span>
                </button>
                </div>
            </div>
            </aside>
            <div class="flex flex-col flex-1">
                <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} path={path}/>
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="px-6 mx-auto grid">
                        <h2
                        class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Blank
                        </h2>
                    </div>
                </main>
            </div>
        </div>
        </>
    );
};

export default Sidebar;
