import React from 'react'
import { useParams } from 'react-router-dom'
import { Hero, Skills } from '../Portfolio Section/index'
const Portfolio = () => {
    let { username } = useParams();

    return (
        <div>
            <Hero />
            <Skills />
        </div>
    )
}

export default Portfolio