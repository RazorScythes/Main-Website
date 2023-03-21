import React from "react";
import heroImage from '../../assets/hero-image.jpg';

import styles from "../../style";

const Hero = () => {
    return (
        <div
            className="relative bg-cover bg-center py-14"
        //   style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            style={{ backgroundColor: "#111221" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <div className="absolute inset-0 "></div>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="lg:flex md:flex items-center justify-evenly">
                            <div className="lg:w-3/5 md:w-3/5 w-full sm:px-4">
                                <h1 style={{lineHeight: "1.2em"}} className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter text-white mb-4 capitalize">
                                    <span style={{color: "#CD3242"}}>Hello I'm,</span> <br/>James Arvie Maderas
                                </h1>
                                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 tracking-tighter">
                                    Web Developer
                                </h2>
                                <p className="text-white text-lg sm:text-xl md:text-lg leading-relaxed mb-4">
                                    Explore the latest games, consoles, and technologies, along with personal stories, insights, and experiences on this website. From reviews and walkthroughs to blog posts and videos, I offer a diverse range of content that is sure to keep you entertained and engaged.
                                </p>
                                <button className="bg-gray-100 hover:bg-transparent hover:text-gray-100 text-gray-800 font-semibold my-8 py-2 px-8 border border-gray-100 rounded transition-colors duration-300 ease-in-out" onClick={() => loginWithRedirect()}>
                                    Hire Me!
                                </button>
                            </div>
                            <div className="lg:w-1/3 md:w-1/3 md:block hidden ml-0">
                                <img src={heroImage} alt="Hero Image" className="rounded-lg shadow-lg lg:w-[400px]"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-[-1.9em] h-24 w-full border-t-8 border-r-8 border-transparent bg-[#111827]" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}></div>
        </div>
    );
};

export default Hero;
