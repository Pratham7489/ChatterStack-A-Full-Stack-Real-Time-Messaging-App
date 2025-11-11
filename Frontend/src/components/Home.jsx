import React from 'react'
import Sidebar from '../components/Sidebar'
import Messages from '../components/Messages'
import EmptyChat from '../components/EmptyChat'
import useChatStore from '../store/useChatStore'

const Home = () => {
    const { selectedUser } = useChatStore()

    return (
        <div className='flex h-screen bg-gray-900 overflow-hidden'>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Chat Area */}
            <div className='flex-1 overflow-hidden'>
                {selectedUser ? <Messages /> : <EmptyChat />}
            </div>
        </div>
    )
}

export default Home