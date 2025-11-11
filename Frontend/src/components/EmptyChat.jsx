import React from 'react'
import { MessageCircle } from 'lucide-react'

const EmptyChat = () => {
  return (
    <div className='flex-1 flex-col flex w-full h-screen items-center 
    justify-center text-center px-6'>
        <div className='bg-gray-100/50 p-6 rounded-2xl flex flex-col items-center gap-4'>

            {/* Animated Icon */}
            <MessageCircle 
              size={48} 
              className='text-gray-600 animate-bounce transition-colors duration-300'
            />

            {/* Title */}
            <h2 className='text-xl font-semibold text-gray-900 animate-fadeIn'>No 
            messages yet</h2>

            {/* Description */}
            <p className='text-gray-700 animate-fadeIn delay-150'>Start a conversation 
            by selecting a user from the left sidebar.</p>

        </div>
    </div>
  )
}

export default EmptyChat