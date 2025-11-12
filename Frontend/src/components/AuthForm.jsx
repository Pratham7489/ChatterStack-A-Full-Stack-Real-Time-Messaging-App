import React, { useRef } from "react";
import useKeyboardAvoidance from "../hooks/useKeyboardAvoidance";
import { Mail, Lock, User, ArrowLeft } from "lucide-react"

const AuthForm = ({ view, formData, errors, handleChange, handleSubmit, switchView }) =>
{    
    const emailRef = useRef(null);
    const passRef = useRef(null);
    useKeyboardAvoidance(emailRef);
    useKeyboardAvoidance(passRef);

    const renderLoginForm = () => 
        <>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
            <p className="text-gray-300 text-center mb-8">Sign in to your account</p>
            {/*Email*/}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Mail size={20} />
                    </span>
                    <input 
                        ref={emailRef}
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={`
                            w-full pl-10
                            pr-4 py-3 bg-gray-800 text-white border rounded-xl focus:outline-none
                            focus:ring-2 focus:ring-blue-500 transition duration-300 
                            ${errors.email ? 'border-red-500' : 'border-gray-700'}`
                        }
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.email || ''}
                </p>
            </div>
            {/*Password*/}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Lock size={20} />
                    </span>
                    <input 
                        ref={passRef}
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={
                            `w-full pl-10
                            pr-4 py-3 bg-gray-800 text-white border rounded-xl focus:outline-none
                            focus:ring-2 focus:ring-blue-500 transition duration-300 
                            ${errors.password ? 'border-red-500' : 'border-gray-700'}`
                        }
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.password || ''}</p>
            </div>

            <div className="flex justify-end mb-6">
                <button type="button" className="text-sm font-semibold text-blue-500
                hover:text-blue-400 transition-colors duration-300 focus:outline-none">
                    Forgot Password?
                </button>
            </div>

            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600
                    transition duration-300 text-white font-semibold py-3 rounded-xl transform hover:scale-105 disabled:opacity-50
                    disabled:cursor-not-allowed"
            >
                login
            </button>

            <p className="mt-8 text-center text-gray-400 text-sm">
                Don't have an account?{" "}
                <button type="button" onClick={() => switchView("register")} className="text-blue-600
                hover:text-blue-700 font-semibold transition duration-300 focus:outline-none">
                    Register now
                </button>
            </p>
        </>

    const renderRegisterForm = () =>
        <>
            <button type="button" onClick={()=> switchView("login")} className="text-gray-400 hover:text-white
            transition-colors duration-300 absolute top-2 left-0">
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Create an Account</h2>
            <p className="text-gray-300 text-center mb-8">Join our community and connect with people.</p>
            {/*Username*/}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <User size={20} />
                    </span>
                    <input type="text" name="username" placeholder="Username" 
                    value={formData.username} onChange={handleChange} className={`w-full pl-10
                    pr-4 py-3 bg-gray-800 text-white border rounded-xl focus:outline-none
                    focus:ring-2 focus:ring-blue-500 transition duration-300 ${errors.username ? 'border-red-500' : 'border-gray-700'}`}
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.username || ''}
                </p>
            </div>
            {/*Email*/}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Mail size={20} />
                    </span>
                    <input 
                        ref={emailRef}
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={
                            `w-full pl-10 pr-4 py-3 bg-gray-800 text-white border rounded-xl focus:outline-none
                            focus:ring-2 focus:ring-blue-500 transition duration-300 
                            ${errors.email ? 'border-red-500' : 'border-gray-700'}`
                        }
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.email || ''}
                </p>
            </div>
            {/*Password*/}
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Lock size={20} />
                    </span>
                    <input 
                        ref={passRef}
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={
                            `w-full pl-10
                            pr-4 py-3 bg-gray-800 text-white border rounded-xl focus:outline-none
                            focus:ring-2 focus:ring-blue-500 transition duration-300 
                            ${errors.password ? 'border-red-500' : 'border-gray-700'}`
                        }
                    />
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.password || ''}</p>
            </div>

            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600
                    transition duration-300 text-white font-semibold py-3 rounded-xl transform hover:scale-105 disabled:opacity-50
                    disabled:cursor-not-allowed"
                >
                Register
            </button>

            <p className="mt-8 text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <button type="button" onClick={() => switchView("login")} className="text-blue-600
                hover:text-blue-700 font-semibold transition duration-300 focus:outline-none">
                    Login
                </button>
            </p>
        </>    
    
    const renderForm = () => {
        switch(view) {
            case "login": return renderLoginForm();
            case "register": return renderRegisterForm();
            default: return renderLoginForm();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full relative">
            {renderForm()}
        </form>
    );
}

export default AuthForm;