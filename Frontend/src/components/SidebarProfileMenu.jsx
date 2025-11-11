import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useChatStore from '../store/useChatStore'

const SidebarProfileMenu = ({
    toggleProfileBox, 
    setToggleProfileBox, 
    logoutAuth, 
    collapsed 
}) => {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const menuRef = useRef()
    const { setSelectedUser } = useChatStore() 
    
    useEffect(() => {
        if (toggleProfileBox) setVisible(true)
        else {
            const timer = setTimeout(() => setVisible(false), 200)
            return () => clearTimeout(timer)
        }    
    }, [toggleProfileBox])

    // Close on outside Click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setToggleProfileBox(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [setToggleProfileBox])

    useEffect(() => {
        if (collapsed) setToggleProfileBox(false)
    }, [collapsed, setToggleProfileBox])

    const handleLogout = async () => {
        await logoutAuth()
        setToggleProfileBox(false)
        navigate('/login')
    }

    if (!visible) return null  

    return (
       <ul 
            ref={menuRef} 
            className={`absolute flex flex-col gap-5 bottom-14 left-0
            dropdown-content menu p-2 shadow rounded-xl w-56 bg-white text-gray-800
            transition-all duration-200 transform origin-bottom-left
            ${toggleProfileBox ? 'opacity-100 translate-y-0 scale-100' : "opacity-0 translate-y-2 scale-105 pointer-events-none"}`}
        >
            <li>
                <Link 
                    to="/settings" 
                    className='hover:bg-gray-200 rounded px-2 py-1'
                    onClick={() => setToggleProfileBox(false)} >Settings
                </Link>
            </li>
            <li>
                <button 
                    className='hover:bg-gray-200 rounded px-2 py-1'
                    onClick={() => {
                        setToggleProfileBox(false);
                        navigate("/profile");
                    }} 
                >
                    Profile
                </button>
            </li>
            <li>
                <button 
                    className='hover:bg-gray-200 rounded px-2 py-1 text-red-400'
                    onClick={() => {
                        handleLogout()
                        setToggleProfileBox(false)
                    }} 
                >
                    Logout
                </button>
            </li>

       </ul>
    )
}

export default SidebarProfileMenu;