import React, { useState } from "react";
import herobg from '../../assets/hero-bg.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCalendar, faSitemap, faArrowRight, faGamepad, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../style";
import Carousel from "react-multi-carousel";
import Avatar from '../../assets/avatar.png'
import { portfolio1 } from "../../assets";

const CustomRight = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClick}
        className="absolute bottom-0 left-24 right-0 mx-auto w-4 border border-solid border-white p-4 rounded-full hover:text-white hover:border-[#CD3242] hover:bg-[#CD3242] transition-all cursor-pointer text-primary-400 text-lg"
      />
    )
};
  
const CustomLeft = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClick}
        className="absolute bottom-0 left-0 right-24 mx-auto w-4 border border-solid border-white p-4 rounded-full hover:text-white hover:border-[#CD3242] hover:bg-[#CD3242] transition-all cursor-pointer text-primary-400 text-lg"
      />
    )
};

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1224, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const Projects = () => {
    
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
                        <div className="w-full sm:flex flex-row justify-start sm:text-left text-center text-white">
                            <div className="sm:w-1/2 w-full">
                                <h2 className='md:text-5xl text-4xl font-bold mb-8'>Recent Work</h2>
                                <p className='text-lg text-[#E1DEF7] md:pb-4 pb-8'>Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system</p>
                            </div>
                            <div className="sm:w-1/2 w-full flex items-center sm:justify-end justify-center">
                                <div className="p-2 border border-dashed border-gray-700 rounded-full">
                                    <div className="p-6 bg-gray-800 rounded-full">
                                        <FontAwesomeIcon icon={faGamepad} className="w-16 h-16 text-[#00FFFF]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-white font-poppins">
                        <Carousel 
                                responsive={responsive} className="mt-24 relative pb-16"
                                customLeftArrow={<CustomLeft />}
                                customRightArrow={<CustomRight />}
                                slidesToSlide={1}
                                swipeable
                                autoPlay={true}
                                infinite={true}
                            >
                                <div className='w-11/12 mx-4 flex flex-col justify-center mb-12 rounded-md'>
                                    <div className="overflow-hidden">
                                        <img
                                            src={portfolio1}
                                            alt="User"
                                            className='w-full h-[400px] object-cover mb-8 transition duration-500 ease-in-out transform hover:scale-105'
                                        />
                                    </div>
                                    <h2 className='pb-2 text-2xl font-semibold hover:text-[#CD3242] hover:cursor-pointer transition-all'>RazorScythe</h2>
                                    <p className='pb-6 text-[#d8d8d8] text-sm'>Web Design</p>
                                </div>
                                <div className='w-11/12 mx-4 flex flex-col justify-center mb-12 rounded-md'>
                                    <div className="overflow-hidden">
                                        <img
                                            src={portfolio1}
                                            alt="User"
                                            className='w-full h-[400px] object-cover mb-8 transition duration-500 ease-in-out transform hover:scale-105'
                                        />
                                    </div>
                                    <h2 className='pb-2 text-2xl font-semibold hover:text-[#CD3242] hover:cursor-pointer transition-all'>RazorScythe</h2>
                                    <p className='pb-6 text-[#d8d8d8] text-sm'>Web Design</p>
                                </div>
                                <div className='w-11/12 mx-4 flex flex-col justify-center mb-12 rounded-md'>
                                    <div className="overflow-hidden">
                                        <img
                                            src={portfolio1}
                                            alt="User"
                                            className='w-full h-[400px] object-cover mb-8 transition duration-500 ease-in-out transform hover:scale-105'
                                        />
                                    </div>
                                    <h2 className='pb-2 text-2xl font-semibold hover:text-[#CD3242] hover:cursor-pointer transition-all'>RazorScythe</h2>
                                    <p className='pb-6 text-[#d8d8d8] text-sm'>Web Design</p>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects