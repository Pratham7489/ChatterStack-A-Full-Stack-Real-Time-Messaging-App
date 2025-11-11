import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { Camera } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const { authUser: user, loading, updateProfileImage, updateProfileData } = useAuthStore()
    const [profileData, setProfileData] = useState({
        name: "",
        username: "",
        website: "",
        bio: "",
        email: "",
        phone: "",
    })

    const [ profileImage, setProfileImage ] = useState(null)
    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username || "",
                name: user.name || "",
                website: user.website || "",
                bio: user.bio || "",
                email: user.email || "",
                phone: user.phone || "",
            })

        setProfileImage(user?.profileImage || null)
    }    
    }, [user]);

    const handleChange = (e) => {
        const {name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await updateProfileData(profileData)
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if(!file) return

        setProfileImage(URL.createObjectURL(file))
        const formData = new FormData()
        formData.append('profileImage', file)
        await updateProfileImage(formData)   
    };

    if (loading) return (<div>Loading...</div>)

    return (
       <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 text-white">
         <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className='backdrop-blur-xl rounded-lg w-full px-4
            sm:px-6 md:px-8 py-4 bg-gray-400 text-black border border-gray-300'>
                <header className='flex items-center justify-between mb-6'>
                    <h1 className='font-bold text-lg'>Edit Profile</h1>
                    <button 
                        onClick={async () => { 
                            await handleSave();
                            navigate("/");
                        }} 
                        className='font-semibold text-lg text-blue-600'
                    >
                        Done
                    </button>
                </header>

                {/*  Profile Picture */}
                <section className='flex flex-col items-center mb-4'>
                    <div className='relative'>
                        <img 
                            src={profileImage || `https://placehold.co/150x150/
                            FFFFFF/000000?text=${user?.username?.charAt(0).toUpperCase()}`}
                            alt="profile" 
                            className='w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300'
                        />
                        <label className='w-8 h-8 p-2 flex items-center justify-center absolute bottom-4
                        right-0 rounded-full cursor-pointer bg-gray-300/50'>
                            <Camera size={24} />
                            <input 
                                type="file" 
                                className='hidden' 
                                accept='image/*' 
                                onChange={handleImageChange} 
                            />
                        </label>
                    </div>
                        <label className='font-semibold text-sm cursor-pointer text-blue-600'>
                            Change profile photo
                            <input 
                                type="file" 
                                className='hidden' 
                                accept='image/*' 
                                onChange={handleImageChange} 
                            />
                        </label>
                </section>

                {/* Edit Form */}
                <div className='space-y'>
                    {['name','username','website','bio','email','phone'].map((field) => (
                        <div key={field}>
                            <label 
                                htmlFor={field} 
                                className='block text-sm font-medium mb-1 text-gray-800 capitalize'
                            >
                                {field}
                            </label>
                            {field === 'bio' ? (
                                <textarea 
                                    name={field} 
                                    id={field} 
                                    value={profileData[field]}
                                    onChange={handleChange}
                                    className='w-full h-15 outline-none p-2 text-sm resize-none
                                    placeholder-gray-400 border-b border-gray-300 bg-transparent
                                    text-black focus:border-blue-600'
                                ></textarea>
                            )  :  (
                                <input 
                                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text" }
                                    id={field}
                                    name={field}
                                    value={profileData[field]}
                                    onChange={handleChange}
                                    className='w-full outline-none p-2 text-sm placeholder-gray-400 border-b
                                    border-gray-300 bg-transparent text-black focus:border-blue-600'
                                    placeholder={`Enter your ${field}`}
                                />
                            )}    
                        </div>
                    ))}
                </div>
            </div>

         </div>
       </div>
    )
}

export default Profile