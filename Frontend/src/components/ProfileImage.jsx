import React, {useMemo} from 'react'

const ProfileImage = ({ user, className, username, online, collapsed, authUser, onlineUsers }) => {

    const isOnline = onlineUsers?.includes(user?._id);

    const userProfileName = useMemo(() => {
        const letter = user?.username?.charAt(0).toUpperCase() || "U"
        return `https://placehold.co/150x150/FFFFFF/000000?text=${letter}`
    },[user?.username])
    return (
        <div className='flex items-center gap-3 relative'>
            <div className={`relative rounded-full p-[2px] cursor-pointer
            hover:scale-105 transition-transform duration-300 ${className || 'w-10 h-10'}
            bg-gradient-to-r from-purple-500 to-pink-500`}>
                <img src={user?.profileImage || userProfileName } alt="profile" className='w-full h-full
                object-cover rounded-full bg-gray-200'/>

                {isOnline && user?._id !== authUser?._id && 
                   <span className='absolute bottom-0 right-0 block w-3 h-3
                   rounded-full border-2 border-white bg-green-500'>
                    </span>
                }
            </div>

            {username && 
                <div className={`text-sm text-white font-semibold transition-all
                duration-200 ${collapsed ? 'hidden' : 'block'}`}>
                    {user?.username}
                </div> 
            }
            {online && 
                <div className={`text-sm font-semibold transition-all duration-200
                ${collapsed ? 'hidden' : 'block'} ${isOnline ? 'text-green-600' : 
                'text-gray-400'}`}>
                    { isOnline ? "online" : ""}
                </div> 
            }
        </div>
    )
}


export default ProfileImage