import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCalendar, faSitemap, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../style";

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
                                <p className='text-lg text-[#E1DEF7] md:pb-4 pb-8'>Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system</p>
                            </div>
                            <div className="flex flex-row flex-wrap justify-center mb-12">
                                {
                                    data.map((item, i) => {
                                        return (
                                            <button 
                                                key={i} 
                                                style={{backgroundColor: active === i ? "transparent" : "#1F2937"}}
                                                className="py-2 px-12 mb-2 rounded-full text-lg mx-4 transition-all ease-in-out delay-50 border-2 border-solid border-[#1F2937]" 
                                                onClick={() => setActive(i)}>
                                                    {item.title}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            {/* <div className="w-full flex lg:flex-nowrap sm:flex-row flex-wrap flex-col justify-center text-center"> */}
                            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start text-center">
                                {
                                    data[active].data.map((item, i) => {
                                        return (
                                            <div key={i} className="w-full sm:mx-2 py-8 rounded-md bg-gray-800 border-2 border-solid border-[#1F2937] shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] p-8 mb-8">
                                                <FontAwesomeIcon icon={item.icon} className="mr-1 w-10 h-10 p-6 bg-gray-900 text-[#00FFFF] rounded-full mb-4" />
                                                <h3 className="md:text-xl text-2xl font-semibold mb-6">{item.title}</h3>
                                                <p className="mb-6 md:text-base text-lg">{item.description}</p>
                                                <a href={`${item.link}`} className="uppercase md:text-base text-lg font-poppins font-semibold transition-all hover:text-[#00FFFF]"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Learn More</a>
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