import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear, faRightFromBracket, faFolder , faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../assets/avatar.png'

const AdminNavbar = ({ isOpen, setIsOpen, path }) => {

    const tokenResult = useSelector((state) => state.settings.tokenResult)
    const settings = useSelector((state) => state.settings.data)

    const [isActive, setIsActive] = useState(false);
    const [toggle, setToggle] = useState(false)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [avatar, setAvatar] = useState(settings.avatar ? settings.avatar : localStorage.getItem('avatar') ? localStorage.getItem('avatar')?.replaceAll('"', "") : '')

    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button
                className={`p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple`}
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
                <div className="flex justify-end flex-1 lg:mr-0 relative">
                    <div className="flex justify-items-end items-end">
                    {
                        user?.result? 
                        <>
                            <img className="h-8 w-8 rounded-full cursor-pointer object-cover border border-gray-400" src={avatar ? avatar : Avatar} alt="Profile" onClick={() => {
                            setToggle(!toggle)
                            setIsActive(false)
                            }} />
                            <div
                            className={`${
                                !toggle ? "hidden" : "flex"
                            } p-6 bg-gray-800 absolute top-[30px] right-[-10px] mx-2 my-2 min-w-[140px] rounded-xl sidebar text-sm font-poppins`}
                            >
                            <ul className="list-none flex justify-end items-start flex-1 flex-col">
                                <li
                                    className={`cursor-pointer text-white hover:text-blue-200 mb-4`}
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    <a href={`${path}/account`}>Account</a>
                                </li>
                                <li
                                    className={`cursor-pointer text-white hover:text-blue-200 mb-4`}
                                >
                                    <FontAwesomeIcon icon={faFolder} className="mr-2" />
                                    <a href={`${path}/${user.result.username}/portfolio`}>My Portfolio</a>
                                </li>
                                <li
                                    className={`cursor-pointer text-white hover:text-blue-200 mb-4`}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                    <a href={`${path}/${user.result.username}`}>Inbox</a>
                                </li>
                                <li
                                    className={`cursor-pointer text-white hover:text-blue-200 mb-4`}
                                >
                                    <FontAwesomeIcon icon={faGear} className="mr-2" />
                                    <a href={`${path}/account/settings`}>Settings</a>
                                </li>
                                <li
                                    className={`cursor-pointer text-white hover:text-blue-200 mb-0`}
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                                    <button onClick={() => sign_out()}>Logout</button>
                                </li>
                            </ul>
                            </div>
                        </>
                        :
                        <a href={`${path}/login`}>
                        <button className="bg-gray-100 hover:bg-transparent hover:text-gray-100 text-gray-800 font-semibold ml-2 text-sm py-2 px-4 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                            Login
                        </button>
                        </a>
                    }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminNavbar