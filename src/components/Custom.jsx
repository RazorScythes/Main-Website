import React from 'react'
import Navbar from './Custom/Navbar'

const Custom = ({user, path}) => {
    return (
        <div className='bg-white'>
            <Navbar path={path}/>
        </div>
    )
}

export default Custom