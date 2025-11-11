import React, { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const BaseModal = ({ 
    children, 
    isOpen, 
    onClose, 
    showPrev,
    showNext, 
    onPrev, 
    onNext 
}) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null;

    return (
        <div 
            className='fixed w-full h-screen inset-0 z-50 flex items-center justify-center bg-black/90'
            onClick={onClose}
        >
            <div 
                className='relative bg-transparent z-50 rounded-xl w-[95%] max-w-5xl h-[90vh] flex items-center justify-center'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Previous Button */}
                {showPrev && (
                    <button 
                        onClick={onPrev}
                        className='absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white p-2 md:p-3 bg-black/60
                        rounded-full hover:bg-black transition-colors z-10'
                    >
                        <ChevronLeft size={28} />
                    </button>
                )}

                {/* Next Button */}
                {showNext && (
                    <button 
                        onClick={onNext}
                        className='absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white p-2 md:p-3 bg-black/60
                        rounded-full hover:bg-black transition-colors z-10'
                    >
                        <ChevronRight size={28} />
                    </button>
                )}

                {/* Content */}
                <div className='flex flex-col items-center justify-center h-full w-full'>
                    {children}
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className='absolute top-2 md:top-4 right-2 md:right-4 text-white p-2 bg-black/60 rounded-full hover:bg-black transition-colors'
                >
                    <X size={28} />
                </button>
            </div>
        </div>
    )
}

export default BaseModal