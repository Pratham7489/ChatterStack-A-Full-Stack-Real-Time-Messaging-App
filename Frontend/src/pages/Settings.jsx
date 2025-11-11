import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Settings = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <Link 
            to="/" 
            className='p-2 hover:bg-gray-800 rounded-full transition-colors'
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className='text-2xl md:text-3xl font-bold'>Settings</h1>
        </div>

        {/* Settings Content */}
        <div className='bg-gray-800 rounded-xl p-6 md:p-8'>
          <div className='space-y-6'>
            <div>
              <h2 className='text-xl font-semibold mb-4'>Account Settings</h2>
              <div className='space-y-4'>
                <div className='flex items-center justify-between p-4 bg-gray-700 rounded-lg'>
                  <div>
                    <p className='font-medium'>Notifications</p>
                    <p className='text-sm text-gray-400'>Manage your notification preferences</p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />
                    <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600'></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-gray-700 rounded-lg'>
                  <div>
                    <p className='font-medium'>Dark Mode</p>
                    <p className='text-sm text-gray-400'>Toggle dark mode appearance</p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' defaultChecked />
                    <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600'></div>
                  </label>
                </div>
              </div>
            </div>

            <div className='pt-6 border-t border-gray-700'>
              <h2 className='text-xl font-semibold mb-4'>Privacy & Security</h2>
              <div className='space-y-4'>
                <button className='w-full text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors'>
                  <p className='font-medium'>Change Password</p>
                  <p className='text-sm text-gray-400'>Update your account password</p>
                </button>
                
                <button className='w-full text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors'>
                  <p className='font-medium'>Blocked Users</p>
                  <p className='text-sm text-gray-400'>Manage blocked accounts</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;