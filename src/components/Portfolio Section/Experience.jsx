import React, { useState } from "react";
import heroImage from '../../assets/hero-image.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCalendar, faSitemap, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../style";
import { photshop_svg } from "../../assets";

const data = [
    {
        years: "2022 - 2023",
        logo: photshop_svg,
        position: "Junior WordPress Developer",
        company: "Stack Overflow, USA",
        website_link: "#"
    },
    {
        years: "2022 - 2023",
        logo: photshop_svg,
        position: "Junior WordPress Developer",
        company: "Stack Overflow, USA",
        website_link: "#"
    },
    {
        years: "2022 - 2023",
        logo: photshop_svg,
        position: "Junior WordPress Developer",
        company: "Stack Overflow, USA",
        website_link: "#"
    },
    {
        years: "2022 - 2023",
        logo: photshop_svg,
        position: "Junior WordPress Developer",
        company: "Stack Overflow, USA",
        website_link: "#"
    },
]
const Experience = () => {
    return (
        <div
            className="relative bg-cover bg-center py-14 mt-20"
        //   style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="absolute inset-0 "></div>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="w-full md:flex flex-col items-center justify-center text-white">
                            <div className="md:w-1/2 w-full text-center md:m-8">
                                <h2 className='md:text-5xl text-4xl font-bold mb-8'>My Work Experience</h2>
                                <p className='md:text-lg text-xl text-[#E1DEF7] md:pb-4 pb-8'>Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system</p>
                            </div>
                            <div className="w-full flex flex-col justify-center mb-12">
                                {
                                    data.map((item, i) => {
                                        return (
                                            <div className="w-full sm:h-24 bg-[#1F2937] hover:border-gray-600 border border-solid border-transparent transition-all ease-in-out delay-50 rounded-md lg:p-16 md:p-16 sm:p-8 ss:p-8 p-4 my-2 flex sm:flex-row flex-col items-center sm:justify-evenly justify-center">
                                                <h2 className="sm:w-1/2 lg:text-3xl sm:text-xl text-2xl font-bold">{item.years}</h2>
                                                <div className="sm:w-1/3 text-center">
                                                    <img
                                                        src={item.logo}
                                                        className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-16 h-16 sm:my-4 my-4 rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div className="sm:w-2/3 sm:text-left text-center sm:mb-0 mb-8">
                                                    <h2 class="lg:text-2xl sm:text-lg text-2xl font-bold">{item.position}</h2>
                                                    <p className="text-[#CD3242] font-semibold">{item.company}</p>
                                                </div>
                                                <a 
                                                    href={`${item.website_link}`} 
                                                    className="sm:w-1/2 sm:text-right md:text-base lg:text-xl sm:text-base text-base font-poppins font-semibold transition-all ease-in-out delay-50 hover:text-[#00FFFF] self-center"
                                                >
                                                        <FontAwesomeIcon icon={faArrowRight} className="mr-4"/>
                                                        Goto Website
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    );
}

export default Experience