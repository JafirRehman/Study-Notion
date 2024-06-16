import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import Buttoncomponent from '../core/Homepage/Buttoncomponent'
import { HiSearch } from 'react-icons/hi'

const Navbar: React.FC = () => {
  return (
    <div className='w-full flex h-[60px] py-3 border-b  border-ourred-900'>
      <div className='max-w-[1250px] w-[90%] mx-auto flex justify-between items-center'>
        <div className=''>
          <Link to={'/'}><img className='w-[115px] mobile:w-[150px]' loading="lazy" src={logo} alt="Logo"/></Link>
        </div>
        <div className='flex gap-5'>
          <Buttoncomponent active={false} linkto='/login'>Login</Buttoncomponent>
          <Buttoncomponent active={false} linkto='/signup'>Signup</Buttoncomponent>
          <button className=''>
            <HiSearch className='text-ourred-600 text-[27px]'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar