import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Hero, Skills, Services, Experience, Projects, Contact } from '../Portfolio Section/index'
import { useDispatch, useSelector } from 'react-redux'
import { getPortfolio } from "../../actions/portfolio";
import Loading from './Loading'
const Portfolio = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    let { username } = useParams();

    const dispatch = useDispatch()

    const portfolio = useSelector((state) => state.portfolio.data)
    const hero = useSelector((state) => state.portfolio.data.hero)

    useEffect(() => {
        dispatch(getPortfolio({id: user.result?._id}))
    }, [])

    return (
        <div>
            {
                Object.keys(portfolio).length !== 0 ? 
                    <>
                        <Hero hero={hero}/>
                        <Skills />
                        <Services />
                        <Experience />
                        <Projects />
                        <Contact />
                    </>
                :
                    <Loading text="Loading portfolio" />

            }
        </div>
    )
}

export default Portfolio