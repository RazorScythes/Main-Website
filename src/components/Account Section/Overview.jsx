import React from 'react'
import styles from '../../style'
import { Header } from './index'
const Overview = () => {

    return (
        <div className="relative bg-white">   
            <Header 
                heading='Welcome'
                description="Select a website to manage, or create a new one from scratch."
                button_text="Explore Now!"
                button_link={`#`}
            />
        </div>
    )
}

export default Overview