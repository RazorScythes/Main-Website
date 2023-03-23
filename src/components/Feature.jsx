import React from "react";
import Logo from '../assets/logo.png'
import City from '../assets/city.png'

import styles from "../style";
const Content = ({ image, title, description }) => {
    return (
        <div className={`w-full px-4 py-4 lg:mb-8 sm:mb-6 mb-2 relative font-poppins bg-gray-800 mx-2 border-b-4 border-[#CD3242] border-solid rounded-md`}>
            <div className="flex flex-col items-start">
                <div className="w-20 mb-4 absolute inset-y-2"><img src={image} alt="feature image" className="w-[70px] h-[70px]"/></div>
                <div className="ml-24">
                    <h3 className="lg:text-lg md:text-base font-normal text-white uppercase">{title}</h3>
                    <p className="lg:text-lg md:text-base font-semibold leading-relaxed text-[#CD3242] uppercase">{description}</p>
                </div>
            </div>
        </div>
    );
}
const Feature = () => {
  return (
        <section className={`container grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mx-auto md:px-9 sm:mb-10 mb-6 py-12`}>
            <Content
                image={Logo}
                title="Gaming Reviews"
                description="Honest & In-Depth."
            />
            <Content
                image={Logo}
                title="Personal Blog"
                description="Insights & Stories."
            />
            <Content
                image={City}
                title="Video Content"
                description="Fun & Engaging."
            />
        </section>
  );
}

export default Feature