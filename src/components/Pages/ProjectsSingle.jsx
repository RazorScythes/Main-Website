import React from 'react'
import styles from "../../style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome, faHomeAlt, faHomeLg } from '@fortawesome/free-solid-svg-icons';

const ProjectsSingle = () => {
    return (
        <div
            className="relative bg-cover bg-center"
            style={{ backgroundColor: "#0F172A" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className="container mx-auto py-12 xs:px-6 text-[#94a9c9]">
                            <div className='flex flex-row items-center text-sm'>
                                <div className='mr-2'><FontAwesomeIcon icon={faHomeLg} className='mr-1'/> <a href='' className='hover:underline transition-all hover:text-[#0CBCDC]'> Home </a></div>
                                <div className='mr-2'><FontAwesomeIcon icon={faChevronRight} className='mr-1'/> <a href='' className='hover:underline transition-all hover:text-[#0CBCDC]'> Projects </a></div>
                                <div className='mr-2'><FontAwesomeIcon icon={faChevronRight} className='mr-1'/> Project Name Here </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSingle