import React from 'react'
import { useParams } from 'react-router-dom'
import { Hero, Skills, Services, Experience } from '../Portfolio Section/index'
const Portfolio = () => {
    let { username } = useParams();

    return (
        <div>
            <Hero />
            <Skills />
            <Services />
            <Experience />
        </div>
    )
}

export default Portfolio