import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { Header } from './index'
import { uploadHero, getPortfolio } from "../../actions/portfolio";

import Hero from './sections/Hero';
import Skills from './sections/Skills';
import styles from '../../style'

const AccountPortfolio = () => {
    const hero = useSelector((state) => state.portfolio.data.hero)
    const skills = useSelector((state) => state.portfolio.data.skills)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [index, setIndex] = useState(0)
    return (
        <>
            <Header 
                heading='Portfolio'
                description="Select a website to manage, or create a new one from scratch."
                button_text="Publish Now"
                button_link={`#`}
            />
            <div className="relative bg-[#F0F4F7]">   
                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        {
                            index === 0 &&
                                <Hero 
                                    user={user}
                                    portfolio={hero}
                                    index={index}
                                    setIndex={setIndex}
                                />
                        }
                        {
                            index === 1 &&
                                <Skills 
                                    user={user}
                                    portfolio={skills}
                                    index={index}
                                    setIndex={setIndex}
                                />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountPortfolio