import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { Header } from './index'
import { uploadHero, getPortfolio } from "../../actions/portfolio";
import Hero from './sections/Hero';
import styles from '../../style'

const AccountPortfolio = () => {
    const portfolio = useSelector((state) => state.portfolio.data.hero)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

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
                        <Hero 
                            user={user}
                            portfolio={portfolio}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountPortfolio