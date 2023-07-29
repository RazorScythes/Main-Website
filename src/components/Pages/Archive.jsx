import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import styles from "../../style";
import { Error_forbiden } from '../../assets';


const ListPicker = ({active, index, directory, type}) => {
    const navigate  = useNavigate()
    const selector = () => { navigate(`/archive?type=${type}&directory=${directory}`)}
    return (
        <li onClick={() => selector(index)} key={index} style={{backgroundColor: active ? '#0D131F' : '#1F2937'}} className='p-1 transition-all cursor-pointer'>{directory}</li>
    )
}

const Directory = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramType = searchParams.get('type') ? searchParams.get('type') : '';
    const paramDirectory = searchParams.get('directory') ? searchParams.get('directory') : '';

    return (
        <div className="bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] p-8 text-white mb-4">
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-semibold text-gray-300'>Videos</h1>
                <FontAwesomeIcon title="Add directory" icon={faPlus} className='text-xl cursor-pointer'/>  
            </div>
            <ul>
                <ListPicker 
                    active={(paramType == 'Videos' && paramDirectory == 'Default')}
                    index={0}
                    directory={'Default'}
                    type={'Videos'}
                />
                <ListPicker 
                    active={(paramType == 'Videos' && paramDirectory == 'Favorite')}
                    index={1}
                    directory={'Favorite'}
                    type={'Videos'}
                />
                <ListPicker 
                    active={(paramType == 'Videos' && paramDirectory == 'Easy')}
                    index={2}
                    directory={'Easy'}
                    type={'Videos'}
                />
            </ul>
        </div>
    )
}
const Archive = () => {
    return (
        <div
            className="relative bg-cover bg-center py-20"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                            <div>
                                <Directory/>
                            </div>
                            <div className="md:col-span-2 bg-gray-800 shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)] sm:p-16 p-8 text-white">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Archive