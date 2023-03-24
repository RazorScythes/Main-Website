import React from 'react'
import styles from '../../style'
import { Header } from './index'
const Overview = () => {
    console.log(`location ${location.pathname.split('/').at(-1)}`)
    return (
        <div className="relative bg-white">   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto relative px-0 py-12">
                        <Header 
                            heading='Welcome'
                            description="Select a website to manage, or create a new one from scratch."
                            button_text="Explore Now!"
                            button_link={`#`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview