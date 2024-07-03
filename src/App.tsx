import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/common/Navbar';
import Catalog from './pages/Catalog'

const App:React.FC=()=> {
  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </div>
  )
}

export default App