import React from 'react'
import { Header } from './index'
const Uploads = () => {
    return (
        <div className="relative bg-white">   
            <Header 
                heading='Uploads'
                description="Select a website to manage, or create a new one from scratch."
                button_text="Explore Now!"
                button_link={`#`}
            />
        </div>
    )
}

export default Uploads