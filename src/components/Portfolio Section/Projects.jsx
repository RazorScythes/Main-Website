import React, { useState } from "react";
import herobg from '../../assets/hero-bg.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCalendar, faSitemap, faArrowRight, faGamepad, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../style";
import Carousel from "react-multi-carousel";
import Avatar from '../../assets/avatar.png'
import { photshop_svg } from "../../assets";

const CustomRight = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClick}
        className="absolute bottom-0 left-12 right-0 mx-auto max-w-4 cursor-pointer text-primary-400 text-lg"
      />
    )
};
  
const CustomLeft = ({ onClick }) => {
    return (
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClick}
        className="absolute bottom-0 left-0 right-12 mx-auto max-w-4 cursor-pointer text-primary-400 text-lg"
      />
    )
};

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 890, min: 464 },
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
                        <div className="w-full sm:flex flex-row justify-start text-white">
                            <div className="sm:w-1/2 w-full">
                                <h2 className='md:text-5xl text-4xl font-bold mb-8'>Recent Work</h2>
                                <p className='text-lg text-[#E1DEF7] md:pb-4 pb-8'>Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system</p>
                            </div>
                            <div className="sm:w-1/2 w-full flex items-center justify-end">
                                <div className="p-2 border border-dashed border-gray-700 rounded-full">
                                    <div className="p-6 bg-gray-800 rounded-full">
                                        <FontAwesomeIcon icon={faGamepad} className="w-16 h-16 text-[#00FFFF]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-white">
                        <Carousel 
                                responsive={responsive} className="mt-24 relative"
                                customLeftArrow={<CustomLeft />}
                                customRightArrow={<CustomRight />}
                                slidesToSlide={1}
                                swipeable
                                autoPlay={true}
                                infinite={true}
                            >
                                <div className='w-11/12 mx-4 mx-auto border-2 border-solid border-gray-700 flex flex-col justify-center p-8 mb-12 bg-[#1F2937] rounded-md'>
                                  <img
                                      src={Avatar}
                                      alt="User"
                                      className='rounded-full border-2 border-solid border-white p-1 w-24 mx-auto mb-8 transition duration-500 ease-in-out transform hover:scale-105'
                                  />
                                  <p className='pb-1'>RazorScythe</p>
                                  <p className='font-semibold text-[#CD3242] pb-6'>Gamer</p>
                                  <button className="bg-[#0275d8] hover:bg-transparent hover:text-white text-white font-normal ml-2 text-sm py-2 px-4 border hover:border-white border-[#0275d8] rounded transition-colors duration-300 ease-in-out">
                                      View Profile
                                  </button>
                                </div>
                                <div className='w-11/12 mx-4 border-2 border-solid border-gray-700 flex flex-col justify-center p-8 mb-12 bg-[#1F2937] rounded-md'>
                                  <img
                                      src={Avatar}
                                      alt="User"
                                      className='rounded-full border-2 border-solid border-white p-1 w-24 mx-auto mb-8 transition duration-500 ease-in-out transform hover:scale-105'
                                  />
                                  <p className='pb-1'>RazorScythe</p>
                                  <p className='font-semibold text-[#CD3242] pb-6'>Gamer</p>
                                  <button className="bg-[#0275d8] hover:bg-transparent hover:text-white text-white font-normal ml-2 text-sm py-2 px-4 border hover:border-white border-[#0275d8] rounded transition-colors duration-300 ease-in-out">
                                      View Profile
                                  </button>
                                </div>
                                <div className='w-11/12 mx-4 mx-auto border-2 border-solid border-gray-700 flex flex-col justify-center p-8 mb-12 bg-[#1F2937] rounded-md'>
                                  <img
                                      src={Avatar}
                                      alt="User"
                                      className='rounded-full border-2 border-solid border-white p-1 w-24 mx-auto mb-8 transition duration-500 ease-in-out transform hover:scale-105'
                                  />
                                  <p className='pb-1'>RazorScythe</p>
                                  <p className='font-semibold text-[#CD3242] pb-6'>Gamer</p>
                                  <button className="bg-[#0275d8] hover:bg-transparent hover:text-white text-white font-normal ml-2 text-sm py-2 px-4 border hover:border-white border-[#0275d8] rounded transition-colors duration-300 ease-in-out">
                                      View Profile
                                  </button>
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