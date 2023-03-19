import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextWithLines } from './index'
import { faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toram_online, genshin_impact, minecraft, tower_of_fantasy } from '../assets';

const news = [
    {
        category:"Test",
        image:toram_online,
        title:"Lorem ipsum dolor sit amet",
        description:"Toram Online Toram Online Toram Online Toram Online Toram Online  ",
        date:"03/13/2023",
        link:"#"
    },
    {
        category:"fashion",
        image:genshin_impact,
        title:"Lorem ipsum dolor sit amet",
        description:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
        date:"03/13/2023",
        link:"#"
    },
    {
        category:"milktea",
        image:tower_of_fantasy,
        title:"Lorem ipsum dolor sit amet",
        description:"Lorem ipsum ",
        date:"03/13/2023",
        link:"#"
    },
    {
        category:"zentai",
        image:minecraft,
        title:"Lorem ipsum dolor sit amet",
        description:"Lorem ipsum ",
        date:"03/13/2023",
        link:"#"
    },
]

const TextWithEllipsis = ({ text, limit = 55 }) => {
    if (text.length > limit) {
      return <span>{text.slice(0, limit)}...</span>;
    }
    return <span>{text}</span>;
}

const Content = ({ active, image, title, description, date, setActive, setIsLoaded, id }) => {
    return (
        <div style={{backgroundColor:active ? '#CD3242': '#1F2937'}} className={`w-full md:h-24 h:auto px-4 py-4 relative font-poppins bg-gray-800 border-solid border-[#696969] border-b font-poppins cursor-pointer`} 
            onClick={() => {
                setActive(id)
                setIsLoaded(false)
            }}
        >
            <div className="flex flex-col items-start">
                <div className="mb-4 absolute top-1/2 -translate-y-1/2"><img src={image} alt="post image" className="w-[100px] h-[80px] rounded-md object-cover"/></div>
                <div className="ml-28">
                    <h3 className="text-base font-semibold text-white uppercase">{title}</h3>
                    <p style={{color:active ? '#FFFFFF' : '#A0A7AB'}} className="text-xs font-normal leading-relaxed mb-1">{<TextWithEllipsis text={description} />}</p>
                    <p style={{color:active ? '#FFFFFF' : '#A0A7AB'}} className="text-xs font-normal leading-relaxed text-[#A0A7AB]"><FontAwesomeIcon icon={faCalendar} className="mr-1" /> {date}</p>
                </div>
            </div>
        </div>
    );
}

const News = () => {

    const [active, setActive] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {{
        const timeout = setTimeout(() => {
            setIsLoaded(true)
        }, 250)
      
        return () => clearTimeout(timeout)

    }}, [isLoaded])

    return (
        <div className='mb-8'>
            <div className='container mx-auto flex-wrap md:px-10 px-2'>
                <TextWithLines text="Latest News"/>
            </div>
            <section className={`container mx-auto py-8 md:px-9`}>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        {
                            news.map((item, index) => {
                                return (
                                    <Content
                                        id={index}
                                        key={index}
                                        image={item.image}
                                        title={item.title}
                                        description={item.description}
                                        date={item.date}
                                        active={active === index}
                                        setActive={setActive}
                                        setIsLoaded={setIsLoaded}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className={`w-full md:h-96 h-50 md:w-1/2 border-solid border-1 border-[#696969] relative`}>
                        {
                            news.length > 0 &&
                                <>
                                    <img 
                                        src={news[active].image} 
                                        alt="featured image" 
                                        className={`object-cover w-full h-full border-solid border border-[#696969] transition-opacity duration-500 ease-in-out
                                        ${isLoaded ? 'visible opacity-100' : 'opacity-0 invisible'}`} 
                                    />
                                    <div className={`absolute w-auto h-auto bg-[#CD3242] top-8 right-0 font-poppins p-2 rounded-bl-md rounded-tl-md
                                        ${isLoaded ? 'visible opacity-100' : 'opacity-0 invisible'}
                                    `}>
                                        <p className={`text-white text-sm font-semibold capitalize`}>{news[active].category}</p>
                                    </div>
                                    <div className='md:absolute sm:absolute relative w-full h-1/3 bottom-0 font-poppins p-4'>
                                        <div className='absolute w-full h-full bg-[#1F2937] opacity-80 bottom-0 left-0 font-poppins p-4'></div>
                                        <div className='relative z-10'>
                                            <h3 className="text-base font-semibold text-white uppercase mb-2">{news[active].title}</h3>
                                            <p className="text-sm font-normal text-white leading-relaxed md:mb-4 mb-2">{<TextWithEllipsis text={news[active].description} />}</p>
                                            
                                            <div className="flex flex-row">
                                                <div className="w-1/2">
                                                    <p className="text-xs font-normal leading-relaxed text-[#A0A7AB]"><FontAwesomeIcon icon={faCalendar} className="mr-1" />{news[active].date}</p>
                                                </div>
                                                <div className="w-1/2 text-right mr-4">
                                                    <a href={news[active].link} className="text-sm font-semibold font-normal leading-relaxed text-white uppercase hover:text-[#FFFF00]"> Read More <FontAwesomeIcon icon={faArrowRight} className="ml-1" /> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default News