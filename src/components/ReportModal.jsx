import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const GameViewModal = ({ openModal, setOpenModal, data }) => {

    const closeModal = () => {
        setOpenModal(false)
    }

    const [form, setForm] = useState({
        id: '',
        name: '',
        email: '',
        reason: '',
        details: ''
    })

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
                        <div className="sm:w-auto w-full rounded-sm shadow-lg relative flex flex-col bg-[#131C31] border border-solid border-[#222F43] font-poppins outline-none focus:outline-none">
                            {/*content*/}
                            <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 py-3 border-b border-solid border-gray-700 rounded-t">
                                    <h3 className="text-xl font-semibold text-[#0DBFDC] text-center">
                                        Report Video
                                    </h3>
                                    <button
                                        className="bg-transparent border-0 text-gray-100 float-right text-xl leading-none outline-none focus:outline-none"
                                        onClick={() => closeModal()}
                                    >
                                        <span className="bg-transparent text-gray-100 hover:text-[#0DBFDC] transition-all h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="p-5 pb-8 text-sm">
                                    <p className='text-[#94a9c9] mb-6'>Please provide some details why this video is being reported</p>

                                    <label className='text-[#B9E0F2]'>Name:</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                        className="w-full mb-2 px-4 p-2 text-sm rounded-md mt-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700"
                                    />

                                    <label className='text-[#B9E0F2]'>Email:</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        className="w-full mb-2 px-4 p-2 text-sm rounded-md mt-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700"
                                    />

                                    <label className='text-[#B9E0F2]'>Reason:</label>
                                    <select 
                                        value={form.reason}
                                        onChange={(e) => setForm({...form, reason: e.target.value})}
                                        className="w-full mb-3 p-2 text-sm rounded-md mt-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700">
                                        <option value="Non consensual">Non consensual</option>
                                        <option value="Spammer">Spammer</option>
                                        <option value="Child Pornography">Child Pornography</option>
                                        <option value="Underage">Underage</option>
                                        <option value="Nevermind">Nevermind</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <label className='text-[#B9E0F2] pt-8'>Provide Details:</label>
                                    <textarea
                                        value={form.details}
                                        onChange={(e) => setForm({...form, details: e.target.value})}
                                        name="message"
                                        id="message"
                                        cols="30"
                                        rows="4"
                                        placeholder="Details"
                                        className="w-full p-4 text-sm rounded-lg my-2 outline-0 transition-all focus:border-gray-600 bg-[#131C31] border border-solid border-[#222F43] text-gray-100 focus:ring-gray-700"
                                    ></textarea>

                                    <button className="text-sm float-right bg-[#0DBFDC] hover:bg-transparent hover:bg-[#131C31] text-gray-100 py-2 px-4 border border-[#222F43] rounded transition-colors duration-300 ease-in-out">
                                        Submit
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

export default GameViewModal