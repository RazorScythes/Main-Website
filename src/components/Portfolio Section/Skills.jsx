import React, { useState } from "react";
import heroImage from '../../assets/hero-image.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import CountUp from 'react-countup';
import { photshop_svg } from "../../assets";
import randomColor from "randomcolor";
import styles from "../../style";
const generateColor = () =>{
    return(Math.random().toString(16).substr(-6));
};

const SkillBox = ({ color = "from-[#FFFF00]"}) => {
    return (
        <div className={`h-32 w-full mr-4  mb-4 rounded-lg bg-gradient-to-b ${color} via-gray-800 to-gray-900 p-1`}>
            <div className="flex h-full w-full rounded-lg flex-col items-center justify-center bg-gray-800 back">
                <h2 className="text-4xl font-semibold text-white mb-1"><CountUp end={100} duation={5}/>%</h2>
                <p className="text-cyan-500 text-base tracking-tighter font-semibold">React JS</p>
            </div>
        </div>
    )
}

const test = [
    {
        percent: "69%",
        skills: "ReactJS",
        hex: `from-[#00FFFF]`
    },
    {
        percent: "69%",
        skills: "ReactJS",
        hex: "from-[#FFFF00]"
    },
    {
        percent: "69%",
        skills: "ReactJS",
        hex: "from-[#00FFFF]"
    },
    {
        percent: "69%",
        skills: "ReactJS",
        hex: "from-[#00FFFF]"
    },
    {
        percent: "69%",
        skills: "ReactJS",
        hex: "from-[#00FFFF]"
    },
    {
        percent: "69%",
        skills: "ReactJS",
        hex: "from-[#00FFFF]"
    }
]
const Skills = () => {

    return (
        <div
            className="relative bg-cover bg-center py-14 mt-20"
        //   style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="absolute inset-0 "></div>
                    <div className="mx-auto file:lg:px-8 relative px-0">
                        <div className="lg:flex md:flex items-center justify-center">
                            <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                <div className="text-center mx-auto lg:w-[31.25rem] p-8 bg-[#111221] rounded-lg relative md:mb-0 mb-12">
                                    <img 
                                        src={heroImage} 
                                        alt="Hero Image" 
                                        className="mx-auto rounded-lg shadow-lg lg:w-[31.25rem] lg:h-[31.25rem] w-full sm:h-[46.875rem] h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 ss:p-4 p-2 bg-white rounded-lg">
                                        <img
                                            className="md:w-16 md:h-16 w-10 h-10 bg-white"
                                            src={photshop_svg}
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 ss:p-4 p-2 bg-white rounded-lg">
                                        <img
                                            className="md:w-16 md:h-16 w-10 h-10 bg-white"
                                            src={photshop_svg}
                                        />
                                    </div>
                                    <div className="absolute bottom-4 right-4 ss:p-4 p-2 bg-white rounded-lg">
                                        <img
                                            className="md:w-16 md:h-16 w-10 h-10 bg-white"
                                            src={photshop_svg}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 bg-white rounded-full font-poppins ss:py-3 py-1 ss:px-8 px-4">
                                        <div className="flex flex-col relative text-left">
                                            <div className="w-20 mb-4 absolute ss:top-[5%] top-[10%] left-[-0.1em]"><FontAwesomeIcon icon={faCircleCheck} className="text-lg ss:w-12 ss:h-12 w-8 h-8 text-[#59C378]"/></div>
                                            <div className="ss:ml-14 ml-10">
                                                <h3 className="lg:text-2xl ss:text-lg text-base font-semibold text-[#202020] uppercase">1500+</h3>
                                                <p className="lg:text-sm ss:text-sm text-xs font-semibold leading-relaxed text-[#CD3242] capitalize">Complete Project</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 md:w-1/2 w-full sm:px-4">
                                <h2 className="text-4xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 tracking-tighter">
                                    My Advantage
                                </h2>
                                <p className="text-white text-lg md:text-lg leading-relaxed mb-12">
                                Explore the latest games, consoles, and technologies, along with personal stories, insights, and experiences on this website. From reviews and walkthroughs to blog posts and videos, I offer a diverse range of content that is sure to keep you entertained and engaged.
                                </p>
                                <div className="grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-5 place-content-start">
                                    {
                                        test.map((item, i) => {
                                            return (
                                                <SkillBox key={i} color={`${item.hex}`}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    );
}

export default Skills