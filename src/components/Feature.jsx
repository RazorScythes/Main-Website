import React from "react";
import Logo from '../assets/logo.png'
import City from '../assets/city.png'

import styles from "../style";
const Content = ({ image, title, description }) => {
    return (
        <div className={`w-full md:w-[30%] px-4 py-4 lg:mb-8 sm:mb-6 mb-2 relative font-poppins bg-gray-800 mx-2 border-b-4 border-[#CD3242] border-solid rounded-md`}>
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
        <section className={`container ${styles.flexCenter} flex-row items-center mx-auto flex-wrap sm:mb-10 mb-6 py-12`}>
            <Content
                image={Logo}
                title="Feature 1"
                description="Lorem ipsum "
            />
            <Content
                image={Logo}
                title="Feature 1"
                description="Lorem ipsum "
            />
            <Content
                image={City}
                title="Feature 1"
                description="Lorem ipsum "
            />
        </section>
  );
}

export default Feature