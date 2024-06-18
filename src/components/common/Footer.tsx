import React from 'react'
import LogoFullLight from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
    return (
        <footer className='border-t border-[#52525B] pt-12 mt-28 mobile:mt-72 flex flex-col gap-20 justify-center items-center'>
            <div className='flex flex-col justify-center gap-4 items-center'>
                <img className='w-36 sm:w-48' alt='company logo' src={LogoFullLight} />
                <Link className='text-richblack-300 text-[1.4rem]' to={'/about'}>About</Link>
                <Link className='text-richblack-300 text-[1.4rem]' to={'/contact'}>Help</Link>
                <Link className='text-richblack-300 text-[1.4rem]' to={''}>Explore</Link>
            </div>
            <div className='mb-10'>
                <h1 className='text-ourred-100 text-[1.1rem]'>Made by ❤️ Jafir</h1>
            </div>
        </footer>
    )
}

export default Footer