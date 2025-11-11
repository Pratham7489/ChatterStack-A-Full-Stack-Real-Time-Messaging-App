import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter , Route, Routes, Navigate  } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Profile from "./components/Profile.jsx"; 
import useAuthStore from './store/useAuthStore.js';


function App() {

  const { profileAuth, authUser, onlineUsers } = useAuthStore();

  console.log("onlineUsers :" , onlineUsers);
  
  useEffect(() => {
    profileAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/" 
          element={ authUser ? <Home /> : <Navigate to="/login" /> } 
        />
        <Route 
          path="/login" 
          element={ !authUser ? <Login /> : <Navigate to="/" /> } 
        />
        <Route 
          path="/profile" 
          element={authUser ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={authUser ? <Settings /> : <Navigate to="/login" />} 
        />
        <Route 
          path="*" 
          element={ authUser ? <Home /> : <Navigate to="/login" /> } 
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
