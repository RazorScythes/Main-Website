import React, { useState } from "react";
import heroImage from '../../assets/hero-image.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCalendar, faSitemap, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../style";
import { photshop_svg } from "../../assets";

const Services = () => {
    const [active, setActive] = useState(0)

    const data = [
        {
            id: 1,
            title: "Development",
            data: [
                {
                    icon: faCalendar,
                    title: "Web Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
                {
                    icon: faCircleCheck,
                    title: "App Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
                {
                    icon: faCalendar,
                    title: "Software Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
            ]
        },
        {
            id: 1,
            title: "Digital Marketing",
            data: [
                {
                    icon: faSitemap,
                    title: "Web Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
                {
                    icon: faArrowRight,
                    title: "App Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
                {
                    icon: faCircleCheck,
                    title: "Software Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
            ]
        },
        {
            id: 1,
            title: "Email Marketing",
            data: [
                {
                    icon: faCalendar,
                    title: "Web Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                },
                {
                    icon: faCircleCheck,
                    title: "App Development",
                    description: "Explain to you how all this mistaken idea of denouncing pleasure born and give you complete account the system.",
                    link: "#"
                }
            ]
        }
    ]
    
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
                                <h2 className='md:text-5xl text-4xl font-bold mb-8'>Popular Services</h2>
                                <p className='md:text-lg text-xl text-[#E1DEF7] md:pb-4 pb-8'>Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system</p>
                            </div>
                            <div className="flex flex-row flex-wrap justify-center mb-12">
                                {
                                    data.map((item, i) => {
                                        return (
                                            <button 
                                                key={i} 
                                                style={{backgroundColor: active === i ? "transparent" : "#1F2937"}}
                                                className="py-4 px-12 mb-2 rounded-full text-xl mx-4 transition-all ease-in-out delay-50 border-2 border-solid border-[#1F2937]" 
                                                onClick={() => setActive(i)}>
                                                    {item.title}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className="w-full flex md:flex-row flex-col justify-center text-center">
                                {
                                    data[active].data.map((item, i) => {
                                        return (
                                            <div key={i} className="md:w-1/3 md:h-1/3 w-full md:mx-2 rounded-md bg-gray-800 border-2 border-solid border-[#1F2937] shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] p-8 mb-8">
                                                <FontAwesomeIcon icon={item.icon} className="mr-1 w-10 h-10 p-6 bg-gray-900 text-[#00FFFF] rounded-full mb-4" />
                                                <h3 className="md:text-2xl text-3xl font-semibold mb-6">{item.title}</h3>
                                                <p className="mb-6 md:text-base text-xl">{item.description}</p>
                                                <a href={`${item.link}`} className="uppercase md:text-base text-xl font-poppins font-semibold transition-all ease-in-out delay-50 hover:text-[#00FFFF]"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Learn More</a>
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

export default Services