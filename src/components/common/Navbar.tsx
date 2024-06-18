import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import Buttoncomponent from '../core/Homepage/Buttoncomponent'
import { HiSearch } from 'react-icons/hi'
import { NavbarLinks } from '../../data/navbar-links'
import { BsChevronDown } from 'react-icons/bs'

const Navbar: React.FC = () => {
  return (
    <div className='w-full flex h-[60px] py-3 border-b  border-[#52525B]'>
      <div className='max-w-[1250px] w-[90%] mx-auto flex justify-between items-center'>
        {/** logo */}
        <div className=''>
          <Link to={'/'}><img className='w-[115px] mobile:w-[150px]' loading="lazy" src={logo} alt="Logo" /></Link>
        </div>
        {/** navbar links */}

        <nav>
          <ul className='flex gap-10 text-ourred-50 text-[1.2rem] sm:text-[1.6rem]'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link.path ? (
                      <Link to={link.path}>{link.title}</Link>
                    ) : (
                      <div className='flex cursor-pointer items-center gap-2'>
                        <span>{link.title}</span>
                        <BsChevronDown className='text-[1rem]' />
                      </div>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/** Auth */}
        <div className='flex gap-5'>
          <Buttoncomponent active={false} linkto='/login'>Login</Buttoncomponent>
          <Buttoncomponent active={false} linkto='/signup'>Signup</Buttoncomponent>
          <button>
            <HiSearch className='text-ourred-50 rounded-full text-[30px]' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar