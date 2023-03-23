import React from 'react'
import { useParams } from 'react-router-dom'
import { Hero, Skills, Services, Experience, Projects, Contact } from '../Portfolio Section/index'
const Portfolio = () => {
    let { username } = useParams();

    return (
        <div>
            <Hero />
            <Skills />
            <Services />
            <Experience />
            <Projects />
            <Contact />
        </div>
    )
}

export default Portfolio