import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Header } from './index'
import { uploadHero, getPortfolio, publishPortfolio, unpublishPortfolio } from "../../actions/portfolio";

import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

import styles from '../../style'

const AccountPortfolio = ({ user }) => {

    const navigate  = useNavigate()

    const portfolio = useSelector((state) => state.portfolio.data)
    const hero = useSelector((state) => state.portfolio.data?.hero)
    const skills = useSelector((state) => state.portfolio.data?.skills)
    const services = useSelector((state) => state.portfolio.data?.services)
    const experience = useSelector((state) => state.portfolio.data?.experience)
    const projects = useSelector((state) => state.portfolio.data?.projects)
    const contact = useSelector((state) => state.portfolio.data?.contact)

    const [index, setIndex] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if(!user) navigate(`/`)
    }, [])

    useEffect(() => {
        setSubmitted(false)
    }, [portfolio])

    return (
        <>
            <Header 
                heading='Portfolio'
                description="Select a website to manage, or create a new one from scratch."
                button_text={portfolio && portfolio.published ? "Unpublish" : "Publish Now"}
                button_secondary_text={portfolio && portfolio.published ? "Unpublishing" : "Publishing"}
                api_call={portfolio && portfolio.published ? unpublishPortfolio({id: user.result?._id}) : publishPortfolio({id: user.result?._id})}
                setSubmitted={setSubmitted}
                submitted={submitted}
                counter_text="User visited"
                counter={portfolio && portfolio.visited ? portfolio.visited.length : 0}
            />
            <div className="relative bg-[#F0F4F7]">   
                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        {
                            user &&
                            <>
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
                                {
                                    index === 2 &&
                                        <Services
                                            user={user}
                                            portfolio={services}
                                            index={index}
                                            setIndex={setIndex}
                                        />
                                }
                                {
                                    index === 3 &&
                                        <Experience
                                            user={user}
                                            portfolio={experience}
                                            index={index}
                                            setIndex={setIndex}
                                        />
                                }
                                {
                                    index === 4 &&
                                        <Projects
                                            user={user}
                                            portfolio={projects}
                                            index={index}
                                            setIndex={setIndex}
                                        />
                                }
                                {
                                    index === 5 &&
                                        <Contact
                                            user={user}
                                            portfolio={contact}
                                            index={index}
                                            setIndex={setIndex}
                                        />
                                }
                            </>
                        } 
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountPortfolio