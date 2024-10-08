import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newGroupList, editGroupList } from "../../../actions/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SideAlert from '../../SideAlert';

const GroupModalForm = ({ openModal, setOpenModal, data, sideAlert, type, user, edit, setEdit }) => {
    const dispatch = useDispatch()

    const closeModal = () => {
        setOpenModal(false)
        setEdit(false)
        setForm({
            id: '',
            group_name: '',
            description: '',
            type: type,
            user: user
        })
    }

    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({
        id: '',
        group_name: '',
        description: '',
        type: type,
        user: user
    })

    useEffect(() => {
        if(data && edit) {
            setForm({
                ...form, 
                id: data.id,
                group_name: data.group_name,
                description: data.description
            })
        }
    }, [data])

    useEffect(() => {
        setForm({
            ...form,
            id: '',
            group_name: '',
            description: '',
            type: type,
            user: user
        })
        setSubmitted(false)
    }, [sideAlert])

    const submit = () => {
        if(!form.group_name) return

        if(!submitted) {
            edit ? 
            dispatch(
                editGroupList({
                    data: form,
                    id: user
                })
            )
            :
            dispatch(
                newGroupList({
                    data: form,
                    id: user
                })
            )
            setSubmitted(true)
        }
    }

    return (
        <>
            {/* Backdrop */}
            {openModal && (
                <div className="fixed inset-0 bg-black opacity-90 z-[100]"></div>
            )}
            {
                openModal && (
                    <div
                        className="scrollbar-hide sm:w-[550px] w-full mx-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none mt-12"
                    >
                        <div className="sm:w-auto w-full rounded-sm shadow-lg relative flex flex-col bg-gray-50 border border-solid border-gray-500 font-poppins outline-none focus:outline-none">
                            {/*content*/}
                            <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 py-3 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-xl font-semibold text-gray-800 text-center">
                                        {edit ? 'Edit' : 'New'} Group List
                                    </h3>
                                    <button
                                        className="bg-transparent border-0 text-gray-100 float-right text-xl leading-none outline-none focus:outline-none"
                                        onClick={() => closeModal()}
                                    >
                                        <span className="bg-transparent text-gray-800 hover:text-gray-900 transition-all h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="p-5 pb-8 text-sm">

                                    <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold mb-2'> Group Name </label>
                                            <input 
                                                type="text" 
                                                className='p-2 px-4 border border-solid border-[#c0c0c0] outline-none'
                                                value={form.group_name}
                                                onChange={(e) => setForm({...form, group_name: e.target.value})}
                                                placeholder='Artist Name'
                                            />
                                        </div>
                                    </div>     

                                    <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                        <div className='flex flex-col'>
                                            <label className='font-semibold mb-2'> Description </label>
                                            <div className='flex flex-row'>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    cols="30"
                                                    rows="8"
                                                    placeholder="Message"
                                                    className="w-full p-2 px-4 outline-none leading-6 border border-solid border-[#c0c0c0]"
                                                    value={form.description}
                                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={submit} className="text-sm float-right bg-blue-600 outline-none hover:bg-blue-700 text-gray-100 py-2 px-4 rounded-sm transition-colors duration-300 ease-in-out">
                                        {
                                            !submitted ?
                                            (
                                                <>
                                                    Submit
                                                </>
                                            )
                                            :
                                            (
                                                <div className='flex flex-row justify-center items-center px-4'>
                                                    <div role="status">
                                                        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                    Sending
                                                </div>
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default GroupModalForm