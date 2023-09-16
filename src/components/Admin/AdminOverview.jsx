import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { Header } from './index'

import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminOverview = ({ user, path }) => {

    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} path={path}/>
            <div class="flex flex-col flex-1">
                <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} path={path}/>
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="mx-auto grid">  
                        <Header 
                            heading='Welcome'
                            description="Select a website to manage, or create a new one from scratch."
                            button_text="Explore Now!"
                            button_link={`#`}
                        />
                        <div className="relative bg-[#F0F4F7]">   
                            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                <div className={`${styles.boxWidthEx}`}>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminOverview