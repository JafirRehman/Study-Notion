import React from 'react'
import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App:React.FC=()=> {
  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </div>
  )
}

export default App