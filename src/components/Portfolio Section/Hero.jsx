import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from "../../style";

const Hero = ({ hero, resultRef }) => {
    
    const [heroData, setHeroData] = useState({
        image: '',
        full_name: '',
        description: '',
        profession: [],
        animation: false
    })

    useEffect(() => {
        if(hero){
            setHeroData({
                ...heroData,
                image: hero && hero.image && hero.image !== '' ? hero.image : 'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=2000',
                full_name: hero && hero.full_name && hero.full_name !== '' ? hero.full_name : 'Insert full name',
                description: hero && hero.description && hero.description !== '' ? hero.description : 'Insert description',
                profession: hero && hero.profession.length === 1 ? [...hero.profession, ...hero.profession] : hero.profession.length > 0 ? hero.profession : ['Insert profession', 'Insert profession'],
                animation: hero && hero.animation ? hero.animation : true,
            })
        }
    }, [hero])

    const [index, setIndex] = useState(0)

    function TypingText({ texts, index, setIndex }) {
        const [currentText, setCurrentText] = useState("");
        const [isDeleting, setIsDeleting] = useState(false);
        const [typingSpeed, setTypingSpeed] = useState(200); // adjust typing speed here
        const [deletingSpeed, setDeletingSpeed] = useState(50); // adjust deleting speed here
        const [delay, setDelay] = useState(3000); // adjust delay between typing and deleting here
      
        useEffect(() => {
          let timer = null;
          let currentIndex = 0;
        function typeNextLetter() {
            //if(texts.length > 0)
                if (currentIndex >= texts[index].length) {
                // When the typing is done, start deleting
                setIsDeleting(true);
                setTimeout(() => {
                    setIsDeleting(false);
                }, delay);
                return;
                }

            if(currentIndex === 1)
                setCurrentText((prevText) => prevText + (texts[index].charAt(1)+texts[index].charAt(2)));
            else 
                setCurrentText((prevText) => prevText + texts[index].charAt(currentIndex));

            currentIndex++;
            timer = setTimeout(typeNextLetter, typingSpeed);
        }

          function deleteNextLetter() {
            setCurrentText((prevText) => prevText.slice(0, -1));
            timer = setTimeout(deleteNextLetter, deletingSpeed);    
          }
      
          if (isDeleting) {
            timer = setTimeout(deleteNextLetter, deletingSpeed);
          } else {
            timer = setTimeout(typeNextLetter, typingSpeed);
          }
      
          return () => {
            clearTimeout(timer);
          };
        }, [texts, index, isDeleting, typingSpeed, deletingSpeed, delay]);
        
        useEffect(() => {
            if (isDeleting && currentText === "") {
                // When the deleting is done, move on to the next text
                setIndex(index === texts.length - 1 ? 0 : index + 1);
                setIsDeleting(false)

                return
            }
        }, [currentText])

        return (
          <h2 className="flex text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 tracking-tighter">
             {currentText} <p className="opacity-0">.</p>
          </h2>
        );
    }

    return (
        <div
            className="relative bg-cover bg-center py-14"
            style={{ backgroundColor: "#111221" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="absolute inset-0 "></div>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="lg:flex md:flex items-center justify-evenly">
                            <div className="lg:w-3/5 md:w-3/5 w-full sm:px-4">
                                <h1 style={{lineHeight: "1.2em"}} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4 capitalize">
                                    <span style={{color: "#CD3242"}}>Hello I'm</span>, <br/><span className="text-5xl md:text-6xl">{ heroData.full_name }</span>
                                </h1>
                                <TypingText texts={ heroData.profession } index={index} setIndex={setIndex} />
                                <p className="text-white text-lg sm:text-xl md:text-lg leading-relaxed mb-4">
                                    { heroData.description }
                                </p>
                                <button onClick={() => resultRef.current.scrollIntoView({ behavior: 'smooth' })} className="bg-gray-100 hover:bg-transparent hover:text-gray-100 text-gray-800 font-semibold my-8 py-2 px-8 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                                    Hire Me!
                                </button>
                            </div>
                            <div className="lg:w-1/3 md:w-1/3 md:block hidden ml-0">
                                <div className="rounded-lg shadow-lg lg:w-[400px]">
                                    <LazyLoadImage
                                        className="rounded-md"
                                        effect="blur"
                                        alt="Hero Image"    
                                        placeholderSrc={heroData.image}                  
                                        src={heroData.image}
                                    />
                                </div>
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
