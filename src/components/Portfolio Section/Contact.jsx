import React from 'react'
import styles from "../../style";
const Contact = () => {
    return (
        <div
            className="relative bg-cover bg-center py-14 mt-8"
        //   style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="absolute inset-0 "></div>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="w-full md:flex flex-col items-center justify-center text-white">
                            <div className="md:w-1/2 w-full mx-auto text-center md:m-8">
                                <h2 className='md:text-5xl text-4xl font-bold mb-8'>Send Me A Message</h2>
                                <p className='text-lg text-[#E1DEF7] md:pb-4 pb-8'>Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system</p>
                            </div>
                            <div className='md:w-[800px] w-full rounded-sm p-8 py-16 border border-solid border-gray-700 bg-gray-800'>
                                <h2 className='text-3xl font-semibold text-center mb-12'>Get in Touch</h2>
                                <div className="w-full md:flex flex-row items-center justify-center text-white">
                                    <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                        <label >Full Name:</label>
                                        <input placeholder='name' type="text" className='w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-[#FFFF00] bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700'/>
                                    </div>
                                    <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                        <label >Email Address:</label>
                                        <input placeholder='email' type="email" className='w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-[#FFFF00] bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700'/>
                                    </div>
                                </div>
                                <div className="w-full sm:px-4 mt-4">
                                    <label >Phone:</label>
                                    <input placeholder='phone' type="phone" className='w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-[#FFFF00] bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700'/>
                                </div>
                                <div className="w-full sm:px-4 mt-4">
                                    <label >Subject:</label>
                                    <select placeholder='email' type="email" className='w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-[#FFFF00] bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700'>
                                        <option selected disabled hidden>Select a Subject</option>
                                        <option value="saab" className='text-gray-900'>Saab</option>
                                        <option value="opel" className='text-gray-900'>Opel</option>
                                        <option value="audi" className='text-gray-900'>Audi</option>
                                    </select>
                                </div>
                                <div className="w-full sm:px-4 mt-4">
                                    <label >Message:</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        cols="30"
                                        rows="4"
                                        placeholder="Message"
                                        className="w-full py-2 pl-2 mt-2 outline-0 transition-all focus:border-[#FFFF00] bg-transparent border-2 border-solid border-gray-400 text-gray-100 rounded-sm focus:ring-gray-700"
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    );
}

export default Contact