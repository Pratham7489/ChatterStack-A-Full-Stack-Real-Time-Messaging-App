import React, { useEffect, useRef, useState } from 'react'
import { CloudUpload, Send, X } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react';
import useChatStore from "../store/useChatStore";

const ChatInput = () => {
    const { sendMessage } = useChatStore();

    const [message, setMessage] = useState("")
    const [file, setFile] = useState(null)
    const [showEmoji, setShowEmoji] = useState(false) 
    const pickerRef = useRef() 

    const onEmojiClick = (emojiData) => {
        setMessage(prev => prev + emojiData.emoji)
        // DON'T close emoji picker - allow multiple selections
        // setShowEmoji(false) - REMOVED
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    const handleSendMessage = async () => {
        if (!message.trim() && !file) return;

        const formData = new FormData();
        if (message.trim()) formData.append("text", message);
        if (file) formData.append("media", file);

        await sendMessage(formData);

        setMessage('');
        setFile(null);
        setShowEmoji(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowEmoji(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (    
        <div className='sticky bottom-0 left-0 right-0 bg-gray-800 p-2 sm:p-4 border-t border-gray-700'>
            {/* File Preview */}
            {file && (
                <div className='relative w-32 h-32 mb-2 inline-block'>
                    {file?.type.startsWith("image") ? (
                        <img 
                            src={URL.createObjectURL(file)}
                            alt='preview' 
                            className='w-full h-full object-cover rounded-lg border-2 border-indigo-500' 
                        />
                    ) : (
                        <video     
                            src={URL.createObjectURL(file)}
                            className='w-full h-full rounded-lg border-2 border-indigo-500'
                        />
                    )}
                    <button 
                        onClick={() => setFile(null)} 
                        className='absolute -top-2 -right-2 text-white rounded-full p-1 bg-red-600 hover:bg-red-700 transition-colors'
                    >
                        <X size={16} />
                    </button>
                    <div className='text-xs text-gray-400 mt-1 truncate'>
                        {file.name}
                    </div>
                </div>
            )}

            {/* Input Row */}
            <div className='flex items-center gap-2 w-full relative'>
                {/* Emoji + File */}
                <div className='flex items-center gap-2'>
                    {/* Emoji Picker */}
                    <div className='relative' ref={pickerRef}>
                        <button 
                            type='button'
                            onClick={() => setShowEmoji(!showEmoji)}
                            className='text-2xl hover:scale-110 transition-transform'
                        >
                            😄
                        </button>
                        {showEmoji && (
                            <div className='absolute bottom-12 left-0 z-50'>
                                <EmojiPicker 
                                    onEmojiClick={onEmojiClick}
                                    theme='dark'
                                    emojiStyle='native'
                                    width={300}
                                    height={400}
                                />
                            </div>
                        )}
                    </div>

                    {/* File Upload */}
                    <label className='cursor-pointer hover:scale-110 transition-transform'>
                        <CloudUpload className='h-6 w-6 text-gray-400 hover:text-indigo-400'/>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            className='hidden'
                            accept='image/*,video/*'
                        />
                    </label>
                </div>

                {/* Text Input */}
                <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Type a message...'
                    className='flex-1 bg-gray-700 text-white rounded-full px-4 py-2
                    outline-none placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 transition-all'    
                />

                {/* Send Button */}
                <button 
                    onClick={handleSendMessage} 
                    disabled={!message.trim() && !file}
                    className='bg-gradient-to-r from-indigo-500 to-pink-500 px-3 sm:px-5 py-2 
                    rounded-full shadow hover:scale-105 active:scale-95 transition-transform text-white 
                    flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    <Send size={20} />
                    <span className='hidden sm:inline'>Send</span>
                </button>
            </div>
        </div>
    )
}    

export default ChatInput;