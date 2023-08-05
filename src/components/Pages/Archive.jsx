import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { MotionAnimate } from 'react-motion-animate'
import { useDispatch, useSelector } from 'react-redux'
import { getArchiveNameById, newArchiveList, removeArchiveList, clearAlert } from "../../actions/archive";
import styles from "../../style";
import SideAlert from '../SideAlert'
import { Error_forbiden } from '../../assets';


const ListPicker = ({active, index, directory, type, parent_id, archive_sub, user_id}) => {
    const dispatch = useDispatch()
    const navigate  = useNavigate()

    const selector = () => { navigate(`/archive?type=${type}&directory=${directory}`)}
    const [submitted, setSubmitted] = useState(false)

    const removeDirectoryList = () => {
        if(!submitted) {
            if(confirm("Are you sure you want to remove this directory?")) {
                const newList = [...archive_sub]
                const filteredList = newList.filter(item => item !== directory)

                dispatch(removeArchiveList({
                    id: user_id,
                    archive_id: parent_id,
                    archive_list: filteredList,
                    archive_name: directory
                }))
                setSubmitted(true)
            }
        }
    }

    return (
        <li onClick={() => selector(index)} key={index} style={{backgroundColor: active ? '#0D131F' : '#1F2937'}} className='p-1 transition-all cursor-pointer'>
            <div className='flex justify-between'>
                {directory}
                { index !== 0 && <button onClick={() => removeDirectoryList()}><FontAwesomeIcon title="Add directory" icon={faTrash} className='text-base cursor-pointer transition-all'/></button>  }
            </div>
        </li>
    )
}

const Directory = ({ archive_name, archive_sub, user_id, archive_id }) => {
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const [activeForm, setActiveForm] = useState(false)
    const [names, setNames] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState('')

    const paramType = searchParams.get('type') ? searchParams.get('type') : '';
    const paramDirectory = searchParams.get('directory') ? searchParams.get('directory') : '';

    useEffect(() => {
        setSubmitted(false)
        setActiveForm(false)
        setForm('')
    }, [archive_sub])

    const addDirectoryList = () => {
        var duplicate = false
        archive_sub.forEach((item) => { if(item === form) duplicate = true })
        if(duplicate) return

        const newList = [...archive_sub]
        newList.push(form)

        if(!submitted) {
            dispatch(newArchiveList({
                id: user_id,
                archive_id: archive_id,
                archive_list: newList
            }))
            setSubmitted(true)
        }
    }

    return (
        <div className="bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] p-8 text-white">
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-semibold text-gray-300'>{archive_name}</h1>
                {
                    activeForm ?
                    <button onClick={() => setActiveForm(false)}><FontAwesomeIcon title="Cancel" icon={faMinus} className='text-xl cursor-pointer transition-all'/></button>
                    :
                    <button onClick={() => setActiveForm(true)}><FontAwesomeIcon title="Add directory" icon={faPlus} className='text-xl cursor-pointer transition-all'/></button>  
                }
            </div>
            {
                activeForm &&
                <MotionAnimate delay={0}>
                <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <input 
                                type="text" 
                                className='w-full p-1 border border-solid border-[#c0c0c0] text-gray-700'
                                onChange={(e) => setForm(e.target.value)}
                                value={form}
                            />
                            <div className='flex flex-row items-end'>
                                <button onClick={() => addDirectoryList()} className='float-left w-full bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] font-semibold py-1 px-4 border border-[#CAD5DF] transition-colors duration-300 ease-in-out'>Add</button>
                            </div>
                        </div>
                    </div>
                </div>  
                </MotionAnimate>
            }
            <ul>
                {
                    archive_sub?.length > 0 &&
                        archive_sub.map((item, i) => {
                            return (
                                <ListPicker 
                                    key={i}
                                    active={(paramType === archive_name && paramDirectory === item)}
                                    index={i}
                                    directory={item}
                                    type={archive_name}
                                    parent_id={archive_id}
                                    archive_sub={archive_sub}
                                    user_id={user_id}
                                />
                            )
                        })
                }
            </ul>
        </div>
    )
}
const Archive = ({ user }) => {
    const dispatch = useDispatch()
    const archiveNames = useSelector((state) => state.archive.archiveName)
    const sideAlert = useSelector((state) => state.archive.sideAlert)

    const [archiveNameData, setArchiveNameData] = useState([])
    const [alertActive, setAlertActive] = useState(false)
    const [alertSubActive, setAlertSubActive] = useState('')
    const [alertInfo, setAlertInfo] = useState({
        variant: '',
        heading: '',
        paragraph: ''
    })

    useEffect(() => {
        dispatch(getArchiveNameById({
            id: user ? user.result?._id : '',
        }))
    }, [getArchiveNameById])    

    useEffect(() => {
        setArchiveNameData(archiveNames)
    }, [archiveNames])

    useEffect(() => {
        if(Object.keys(sideAlert).length !== 0){
            setAlertInfo({
                variant: sideAlert.variant,
                heading: sideAlert.heading,
                paragraph: sideAlert.paragraph
            })
            setAlertActive(true)

            dispatch(clearAlert())
        }
    }, [sideAlert])

    return (
        <div
            className="relative bg-cover bg-center py-20"
            style={{ backgroundColor: "#111827" }}
        >   
            <SideAlert
                variants={alertInfo.variant}
                heading={alertInfo.heading}
                paragraph={alertInfo.paragraph}
                active={alertActive}
                setActive={setAlertActive}
            />
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                            <div>
                                {
                                    archiveNameData?.length > 0 &&
                                        archiveNameData.map((item, index) => {
                                            return (
                                                <div key={index} className={`${index !== (archiveNameData.length - 1) ? 'mb-2' : 'mb-0' }`}>
                                                    <Directory 
                                                        archive_name={item.archive_name}
                                                        archive_sub={item.archive_list}
                                                        user_id={item.user}
                                                        archive_id={item._id}
                                                    />
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            <div className="md:col-span-2 bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] sm:p-16 p-8 text-white">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Archive