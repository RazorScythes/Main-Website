import React from "react";
import { blogs, game, application } from "../assets/index";

const Content = ({ image, title, description }) => {
    return (
        <div className={`w-full px-4 py-5 lg:mb-8 sm:mb-6 mb-2 relative font-poppins bg-gray-800 mx-2 border-b-4 border-[#CD3242] border-solid rounded-md`}>
            <div className="flex flex-col items-start">
                <div className="w-12 mb-4 absolute inset-y-3"><img src={image} alt="feature image" className="w-[70px] h-[70px] object-contain"/></div>
                <div className="ml-16">
                    <h3 className="lg:text-lg md:text-base font-normal text-white capitalize">{title}</h3>
                    <p className="lg:text-lg md:text-base font-semibold leading-relaxed text-[#CD3242] capitalize">{description}</p>
                </div>
            </div>
        </div>
    );
}
const Feature = () => {
  return (
        <section className={`container grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mx-auto md:px-9 sm:mb-10 mb-6 py-12 pb-8`}>
            <Content
                image={game}
                title="Games"
                description="Strategic & Immersive"
            />
            <Content
                image={blogs}
                title="Blogs"
                description="Personalized & Stories."
            />
            <Content
                image={application}
                title="Videos"
                description="User-friendly"
            />
        </section>
  );
}

export default Feature